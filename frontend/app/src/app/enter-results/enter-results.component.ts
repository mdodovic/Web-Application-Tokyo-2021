import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionService } from '../competition.service';
import { Competition } from '../models/competition';
import { FinalCollection } from '../models/finalCollection';
import { GroupCollection } from '../models/groupCollection';
import { Result } from '../models/result';
import { Timetable } from '../models/timetable';
import { TreeCollection } from '../models/treeCollection';
import { User } from '../models/user';
import { PlayerService } from '../player.service';
import { ResultService } from '../result.service';
import { StateService } from '../state.service';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-enter-results',
  templateUrl: './enter-results.component.html',
  styleUrls: ['./enter-results.component.css']
})
export class EnterResultsComponent implements OnInit {

  constructor(private router: Router,
    private competitionService: CompetitionService,
    private timetableService: TimetableService,
    private resultService: ResultService,
    private playerService: PlayerService,
    private stateService: StateService
  ) { }

  ngOnInit(): void {
    this.delegate = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(this.delegate.username);
    this.competitionService.fetchByDelegateService(this.delegate.username).subscribe((competitions: Competition[]) => {
      this.competitions = competitions;
      console.log(this.competitions)
    })
  }

  genders: { [id: string]: string; } = {
    "man": "Muškarci", "woman": "Žene"
  }

  delegate: User;
  competitions: Competition[];

  choosenCompetition: Competition;
  errorNoCompetition: string;

  resultScratch: Result;
  representativesFinal: FinalCollection[];
  representativesTree: TreeCollection[];
  representativesGroup: GroupCollection[];
  timetables: Timetable[];

  // Final only
  competitionLocationIndividual: string;
  competitionDateIndividual: string;
  competitionTimeIndividual: string;
  confirmedResultsFinal: boolean;
  errorNoResults: boolean;
  repeatFinalRound: Array<{ 'position': number, "competitors": FinalCollection[] }>;
  needForRepetition: boolean;

  // Final with repetition

  // Tree, const values
  indexesTree: number[] = [1, 5, 3, 7, 2, 6, 4, 8, 1, 3, 2, 4, 1, 2];
  eighthFinalTreeArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  quarterFinalTreeArray: number[] = [8, 9, 10, 11];
  semiFinalTreeArray: number[] = [12, 13];
  thirdPlaceTreeArray: number[] = [14];
  firstPlaceTreeArray: number[] = [15];

  // Tree

  showEighthFinalTree: boolean = false;
  showQuarterFinalTree: boolean = false;
  showSemiFinalTree: boolean = false;
  startIndex: number;

  competitionLocationTree: Array<string> = new Array<string>(16);
  competitionDateTree: Array<string> = new Array<string>(16);
  competitionTimeTree: Array<string> = new Array<string>(16);

  competitors: Array<{ "player1": string, "nationality1": string, "player2": string, "nationality2": string, "score": string }> =
    new Array<{ "player1": string, "nationality1": string, "player2": string, "nationality2": string, "score": string }>(16);

  // group


  // Common
  competitionResultsMedalsFinished: boolean = false;

  finishResultsEntering() {
    this.router.navigate(['delegate']);
  }

  closeCompetitionFinal() {
    console.log("END!");
    this.representativesFinal.forEach(r => {
      this.repeatFinalRound.forEach(rfr => {
        rfr.competitors.forEach(c => {
          if (c.nationality == r.nationality && c.player == r.player)
            r.score += "#" + c.score;
        });
      });
      console.log(r.player + ": " + r.score);
    });
    //
    this.representativesFinal.sort(
      (a: FinalCollection, b: FinalCollection) => {
        if (a.score > b.score) {
          return 1;
        }
        if (a.score < b.score) {
          return -1;
        }
        return 0;
      })
    console.log(this.representativesFinal);
    this.resultService.replaceFinalResultListService(
      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName,
      this.choosenCompetition.gender, this.representativesFinal).subscribe(
        res => {
          console.log(res);


          let sportAndDiscipline: string = this.choosenCompetition.sportName;
          if (this.choosenCompetition.disciplineName != null) {
            sportAndDiscipline += " " + this.choosenCompetition.disciplineName;
          }
          // Add medals
          if (this.choosenCompetition.initiallySingle) {
            console.log(this.representativesFinal[0])
            this.playerService.addMedalService(
              this.representativesFinal[0].player.substr(0, this.representativesFinal[0].player.indexOf(' ')),
              this.representativesFinal[0].player.substr(this.representativesFinal[0].player.indexOf(' ') + 1),
              sportAndDiscipline, "goldMedals").subscribe(
                res => {
                  console.log(res)

                  console.log(this.representativesFinal[1])
                  this.playerService.addMedalService(
                    this.representativesFinal[1].player.substr(0, this.representativesFinal[1].player.indexOf(' ')),
                    this.representativesFinal[1].player.substr(this.representativesFinal[1].player.indexOf(' ') + 1),
                    sportAndDiscipline, "silverMedals").subscribe(
                      res => {
                        console.log(res)

                        console.log(this.representativesFinal[2])
                        this.playerService.addMedalService(
                          this.representativesFinal[2].player.substr(0, this.representativesFinal[2].player.indexOf(' ')),
                          this.representativesFinal[2].player.substr(this.representativesFinal[2].player.indexOf(' ') + 1),
                          sportAndDiscipline, "bronseMedals").subscribe(
                            res => {
                              console.log(res)

                              this.stateService.addMedalService(
                                this.representativesFinal[0].nationality,
                                "goldMedals").subscribe(
                                  res => {
                                    console.log(res);
                                    this.stateService.addMedalService(
                                      this.representativesFinal[1].nationality,
                                      "silverMedals").subscribe(
                                        res => {
                                          console.log(res);
                                          this.stateService.addMedalService(
                                            this.representativesFinal[2].nationality,
                                            "bronseMedals").subscribe(
                                              res => {
                                                console.log(res);

                                                this.choosenCompetition = null;
                                                this.competitionResultsMedalsFinished = true;

                                              })

                                        })

                                  })
                            })
                      })

                });
          } else {
            console.log("All players needs to have medal!");
            let statesWithMedals: string[] = [];
            statesWithMedals.push(this.representativesFinal[0].nationality);
            statesWithMedals.push(this.representativesFinal[1].nationality);
            statesWithMedals.push(this.representativesFinal[2].nationality);

            this.stateService.addMedalService(
              statesWithMedals[0],
              "goldMedals").subscribe(
                res => {
                  console.log(res);
                  this.stateService.addMedalService(
                    statesWithMedals[1],
                    "silverMedals").subscribe(
                      res => {
                        console.log(res);
                        this.stateService.addMedalService(
                          statesWithMedals[2],
                          "bronseMedals").subscribe(
                            res => {
                              console.log(res);


                            })

                      })

                })



            let goldPlayersString: string = this.representativesFinal[0].player.substring(
              this.representativesFinal[0].player.indexOf("[") + 1,
              this.representativesFinal[0].player.lastIndexOf("]")
            );
            let silverPlayersString: string = this.representativesFinal[1].player.substring(
              this.representativesFinal[1].player.indexOf("[") + 1,
              this.representativesFinal[1].player.lastIndexOf("]")
            );
            let bronsePlayersString: string = this.representativesFinal[2].player.substring(
              this.representativesFinal[2].player.indexOf("[") + 1,
              this.representativesFinal[2].player.lastIndexOf("]")
            );

            let goldPlayers: string[] = goldPlayersString.split("; ");
            let silverPlayers: string[] = silverPlayersString.split("; ");
            let bronsePlayers: string[] = bronsePlayersString.split("; ");

            console.log(goldPlayers);
            console.log(silverPlayers);
            console.log(bronsePlayers);

            for (let i = 0; i < goldPlayers.length; i++) {
              this.playerService.addMedalService(
                goldPlayers[i].substr(0, goldPlayers[i].indexOf(' ')),
                goldPlayers[i].substr(goldPlayers[i].indexOf(' ') + 1),
                sportAndDiscipline, "goldMedals").subscribe(
                  res => {
                    console.log(res)
                    console.log(" #gold" + goldPlayers[i]);
                  })
            }

            for (let i = 0; i < silverPlayers.length; i++) {
              this.playerService.addMedalService(
                silverPlayers[i].substr(0, silverPlayers[i].indexOf(' ')),
                silverPlayers[i].substr(silverPlayers[i].indexOf(' ') + 1),
                sportAndDiscipline, "silverMedals").subscribe(
                  res => {
                    console.log(res)
                    console.log(" #silver" + silverPlayers[i]);
                  })
            }

            for (let i = 0; i < bronsePlayers.length; i++) {
              this.playerService.addMedalService(
                bronsePlayers[i].substr(0, bronsePlayers[i].indexOf(' ')),
                bronsePlayers[i].substr(bronsePlayers[i].indexOf(' ') + 1),
                sportAndDiscipline, "bronseMedals").subscribe(
                  res => {
                    console.log(res)
                    console.log(" #bronse" + bronsePlayers[i]);
                  })
            }
            this.choosenCompetition = null;
            this.competitionResultsMedalsFinished = true;

          }
        })
  }


  confirmRepeatedResultsFinal() {
    this.repeatFinalRound.forEach(rp => {
      console.log(rp.position);
      console.log(rp.competitors)
      console.log("########")
    });
    this.confirmedResultsFinal = true;
  }

  confirmResultsFinal() {
    this.errorNoResults = false;

    this.repeatFinalRound = [];
    this.needForRepetition = false;
    // Errors
    this.resultScratch.final.forEach(p => {
      if (!p.score) {
        this.errorNoResults = true;
        return;
      }
    });
    // Check for same result in array
    // All has their results
    console.log(this.resultScratch)
    this.resultScratch.final.sort(
      (a: FinalCollection, b: FinalCollection) => {
        if (a.score > b.score) {
          return 1;
        }
        if (a.score < b.score) {
          return -1;
        }
        return 0;
      })
    console.log(this.resultScratch)

    var repeatingElements: { [score: string]: { "position": number, "competitors": FinalCollection[] } } = {};

    for (var i = 0; i < this.resultScratch.final.length - 1; i++) {
      if (this.resultScratch.final[i + 1].score === this.resultScratch.final[i].score) {
        this.needForRepetition = true;
        if (repeatingElements[this.resultScratch.final[i].score] === undefined) {
          repeatingElements[this.resultScratch.final[i].score] = { "position": i, "competitors": [] };
        }
      }
    }
    console.log(repeatingElements)
    let repeatHelper: FinalCollection[] = [];
    let positionHelper: number = -1;
    for (let i = 0; i < this.resultScratch.final.length; i++) {
      console.log(i + ": " + positionHelper + " # " + repeatHelper.length)
      if (repeatingElements[this.resultScratch.final[i].score] !== undefined) {

        repeatingElements[this.resultScratch.final[i].score].competitors.push(
          { "nationality": this.resultScratch.final[i].nationality, "player": this.resultScratch.final[i].player, "score": this.resultScratch.final[i].score }
        );

      }
    }

    for (let key in repeatingElements) {
      this.repeatFinalRound.push({ "position": repeatingElements[key].position, "competitors": repeatingElements[key].competitors })
    }


    this.repeatFinalRound.forEach(rp => {
      rp.competitors.forEach(c => {
        c.score = "";
      });
    });

    console.log(this.repeatFinalRound)
    if (this.needForRepetition == true) {
      return;
    }
    this.confirmedResultsFinal = true;
  }

  competitionIsChoosen() {
    this.errorNoCompetition = "";
    this.errorNoResults = false;

    this.confirmedResultsFinal = false;
    this.repeatFinalRound = [];
    this.needForRepetition = false;

    this.resultScratch = null;
    this.representativesFinal = null;
    this.timetables = null;
    this.competitionLocationIndividual = null;
    this.competitionDateIndividual = null;
    this.competitionTimeIndividual = null;
    this.repeatFinalRound = null;
    this.needForRepetition = null;

    this.competitionResultsMedalsFinished = false;


    this.resultService.fetchBySportDisciplineAndGenderService(
      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender
    ).subscribe((resultScratch: Result) => {

      this.resultScratch = resultScratch
      this.representativesFinal = resultScratch.final;
      this.representativesTree = resultScratch.tree;
      this.representativesGroup = resultScratch.group;

      console.log(this.resultScratch)

      this.timetableService.fetchBySportDisciplineAndGenderService(
        this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender
      ).subscribe((timetables: Timetable[]) => {
        this.timetables = timetables;
        console.log(this.timetables)

        if (this.choosenCompetition.actAsSingle) {
          console.log("INDIVIDUAL")
          if (this.choosenCompetition.rankPlayers == false) {
            console.log("JUST FINAL")
            this.competitionLocationIndividual = this.timetables[0].location;
            this.competitionDateIndividual = this.timetables[0].datetime.split("T")[0];
            this.competitionTimeIndividual = this.timetables[0].datetime.split("T")[1];

          } else {

            //this.competitors = this.choosenCompetition.participants;

            if (this.choosenCompetition.competitorsNumber == 16) {
              this.showEighthFinalTree = true;
              this.showQuarterFinalTree = false;
              this.showSemiFinalTree = false;
              this.startIndex = 0;

              /*  for (let i = 1; i <= 16; i++) {
                  this.competitors[i - 1] = this.choosenCompetition.participants.find(x => x.rank == i);
                }
      */
            } else if (this.choosenCompetition.competitorsNumber == 8) {
              // Nije jos provereno
              this.showEighthFinalTree = false;
              this.showQuarterFinalTree = true;
              this.showSemiFinalTree = false;
              this.startIndex = 8;


              /*              for (let i = 1; i <= 8; i++) {
                              this.competitors[i - 1] = this.choosenCompetition.participants.find(x => x.rank == i);
                            }
               */
            } else {
              // Nije jos provereno
              // 4 competitors
              this.showEighthFinalTree = false;
              this.showQuarterFinalTree = false;
              this.showSemiFinalTree = true;
              this.startIndex = 12;

              /*           for (let i = 1; i <= 4; i++) {
                           this.competitors[i - 1] = this.choosenCompetition.participants.find(x => x.rank == i);
                         }
               */
            }

            console.log("TREE")
            console.log(this.timetables)
            console.log(this.representativesTree)
            console.log(this.choosenCompetition.participants.length);
            console.log(this.choosenCompetition.participants)

            timetables.forEach(tt => {
              let index: number = parseInt(tt.type.split(" ")[2]);
              //console.log(index);
              this.competitionLocationTree[index] = tt.location;
              this.competitionDateTree[index] = tt.datetime.split("T")[0];
              this.competitionTimeTree[index] = tt.datetime.split("T")[1];

            });

            this.representativesTree.forEach(rt => {
              this.competitors[rt.index] =
              {
                "player1": rt.player1, "nationality1": rt.nationality1,
                "player2": rt.player2, "nationality2": rt.nationality2,
                "score": ""
              }
            });



          }
        } else {
          console.log("TEAM -> group")

        }

      })
    })


  }

  confirmEighthFinal() {
    this.errorNoResults = false;
    console.log(this.competitors);
    this.competitors.forEach(c => {
      if (!c.score) {
        this.errorNoResults = true;
        return; // leave lambda function
      }
    });
    if (this.errorNoResults) {
      return;
    }

    for (let i = 0; i < 7; i++) {
      this.resultService.addTreeScoreByIndexService(i, this.competitors[i].score).subscribe(
        res => {
          console.log(res);
        });
    }

    console.log("All filled")
    for (let i = 8, j = 0; i < 12; i++) {
      console.log(i, j, j + 1);
      this.competitors[i] = {
        "player1": "", "nationality1": "",
        "player2": "", "nationality2": "",
        "score": ""
      }

      if (this.competitors[j].score == "2:0" || this.competitors[j].score == "2:1") {
        this.competitors[i].player1 = this.competitors[j].player1;
        this.competitors[i].nationality1 = this.competitors[j].nationality1;
      } else {
        this.competitors[i].player1 = this.competitors[j].player2;
        this.competitors[i].nationality1 = this.competitors[j].nationality2;
      }
      if (this.competitors[j + 1].score == "2:0" || this.competitors[j + 1].score == "2:1") {
        this.competitors[i].player2 = this.competitors[j + 1].player1;
        this.competitors[i].nationality2 = this.competitors[j + 1].nationality1;
      } else {
        this.competitors[i].player2 = this.competitors[j + 1].player2;
        this.competitors[i].nationality2 = this.competitors[j + 1].nationality2;
      }
      j += 2

      this.resultService.addTreeScratchService(
        i, this.competitors[i].player1, this.competitors[i].nationality1,
        this.competitors[i].player2, this.competitors[i].nationality2,
        this.competitors[i].score).subscribe(
          res => {
            console.log(res);
          });

    }
    this.showQuarterFinalTree = true;
  }

}


