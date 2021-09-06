import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from '../competition.service';
import { GroupService } from '../group.service';
import { Competition } from '../models/competition';
import { FinalCollection } from '../models/finalCollection';
import { GroupCollection } from '../models/groupCollection';
import { GroupPhase } from '../models/groupPhase';
import { Result } from '../models/result';
import { Round } from '../models/round';
import { TeamResultInGroup } from '../models/teamResultInGroup';
import { Timetable } from '../models/timetable';
import { TreeCollection } from '../models/treeCollection';
import { User } from '../models/user';
import { PlayerService } from '../player.service';
import { ResultService } from '../result.service';
import { RoundService } from '../round.service';
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
    private stateService: StateService,
    private groupService: GroupService,
    private roundService: RoundService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(d => {
      d.breadcrumbs.forEach((b, i) => {
        if (i == 0) {
          this.breadcrumbs = b;
        } else {
          this.breadcrumbs += " > " + b;
        }
      });
    })
    this.delegate = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log(this.delegate.username);
    this.competitionService.fetchByDelegateService(this.delegate.username).subscribe((competitions: Competition[]) => {
      this.competitions = competitions;
      console.log(this.competitions)
    })
  }


  breadcrumbs: string;

  genders: { [id: string]: string; } = {
    "man": "Muškarci", "woman": "Žene"
  }

  delegate: User;
  competitions: Competition[];

  choosenCompetition: Competition;
  errorNoCompetition: string;

  invertSortToDescendingOrder: number = 1;

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
  multipleRoundResultsPlayers: Array<{
    'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
    'rounds': Array<{
      "roundNumber": number,
      "roundScore": string,
      "show": boolean,
      "freeze": boolean
    }>
  }>;
  roundsCounter: Array<{
    "roundNumber": number,
    "show": boolean
  }>
  repeatMultipleRoundResultsPlayers: Array<{
    'position': number, "competitors": Array<{
      'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
      'rounds': Array<{
        "roundNumber": number,
        "roundScore": string,
        "show": boolean,
        "freeze": boolean
      }>
    }>
  }>;
  repeatRoundsCounter: Array<{
    "roundNumber": number,
    "show": boolean
  }>
  confirmedResultsRoundsFinal: boolean;
  currentRound: number;
  repeatedCurrentRound: number;

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
  showThirdPlaceTree: boolean = false;
  showFirstPlaceTree: boolean = false;

  confirmedResultsTree: boolean = false;

  competitionLocationTree: Array<string> = new Array<string>(16);
  competitionDateTree: Array<string> = new Array<string>(16);
  competitionTimeTree: Array<string> = new Array<string>(16);

  competitors: Array<{ "player1": string, "nationality1": string, "player2": string, "nationality2": string, "score": string }> =
    new Array<{ "player1": string, "nationality1": string, "player2": string, "nationality2": string, "score": string }>(16);

  // group
  groupLocations: Array<{
    "groupNumber": number,
    "groupContent": Array<{
      "roundNumber": number,
      "roundContent":
      Array<{
        "index": number,
        "location": string
      }>
    }>
  }>;
  groupDate: Array<{
    "groupNumber": number,
    "groupContent": Array<{
      "roundNumber": number,
      "roundContent":
      Array<{
        "index": number,
        "date": string
      }>
    }>
  }>;
  groupTime: Array<{
    "groupNumber": number,
    "groupContent": Array<{
      "roundNumber": number,
      "roundContent":
      Array<{
        "index": number,
        "time": string
      }>
    }>
  }>;
  errorNoGroupResults: Array<{
    "groupNumber": number,
    "groupContent": Array<{
      "roundNumber": number,
      "roundContent":
      Array<{
        "index": number,
        "error": string
      }>
    }>
  }>;
  groups: Array<{
    "groupNumber": number,
    "groupContent": Array<{
      "roundNumber": number,
      "roundContent":
      Array<{
        "index": number,
        nationality1: string,
        representation1: string,
        nationality2: string,
        representation2: string,
        score: string,
        archived: boolean
      }>
    }>
  }>;
  teamsPerGroup: number;
  numberOfRounds: number;
  matchesPerGroup: number;
  groupMatchesPlayed: number;
  confirmedResultsGroupsport: boolean = false;
  timetabledEndCompetition: boolean = false;
  groupPhaseFinished: boolean = false;
  /*  groupBeginning: boolean = true;
    needTreeTimetable: boolean = false;
    finishedWithEnteringGroupPhase: boolean = false;
  */


  // Common
  competitionResultsMedalsFinished: boolean = false;

  finishResultsEntering() {
    this.router.navigate(['delegate']);
  }

  addMedals(finalist: Array<{ "position": number, "player": string, "nationality": string }>) {
    console.log(finalist);

    let sportAndDiscipline: string = this.choosenCompetition.sportName + " " + this.choosenCompetition.disciplineName
    console.log(finalist[0].player)
    this.playerService.addMedalService(
      finalist[0].player.substr(0, finalist[0].player.indexOf(' ')),
      finalist[0].player.substr(finalist[0].player.indexOf(' ') + 1),
      sportAndDiscipline, "goldMedals").subscribe(
        res => {
          console.log(res)

          console.log(finalist[1].player)
          this.playerService.addMedalService(
            finalist[1].player.substr(0, finalist[1].player.indexOf(' ')),
            finalist[1].player.substr(finalist[1].player.indexOf(' ') + 1),
            sportAndDiscipline, "silverMedals").subscribe(
              res => {
                console.log(res)

                console.log(finalist[2])
                this.playerService.addMedalService(
                  finalist[2].player.substr(0, finalist[2].player.indexOf(' ')),
                  finalist[2].player.substr(finalist[2].player.indexOf(' ') + 1),
                  sportAndDiscipline, "bronseMedals").subscribe(
                    res => {
                      console.log(res)

                      this.stateService.addMedalService(
                        finalist[0].nationality,
                        "goldMedals").subscribe(
                          res => {
                            console.log(res);
                            this.stateService.addMedalService(
                              finalist[1].nationality,
                              "silverMedals").subscribe(
                                res => {
                                  console.log(res);
                                  this.stateService.addMedalService(
                                    finalist[2].nationality,
                                    "bronseMedals").subscribe(
                                      res => {
                                        console.log(res);

                                        this.competitionService.finishCompetitionService(
                                          this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender).subscribe(
                                            res => {
                                              console.log(res)
                                            })


                                        this.choosenCompetition = null;
                                        this.competitionResultsMedalsFinished = true;

                                      })

                                })

                          })
                    })
              })

        });

  }

  closeCompetitionRoundsFinal() {
    console.log("FINISH!");

    this.multipleRoundResultsPlayers

    let finalist: Array<{ "position": number, "player": string, "nationality": string }> = [];
    finalist.push({ "position": 0, "nationality": "", "player": "" });
    finalist.push({ "position": 1, "nationality": "", "player": "" });
    finalist.push({ "position": 2, "nationality": "", "player": "" });

    let allRanked: boolean = false;

    this.repeatMultipleRoundResultsPlayers.forEach(rmrrp => {
      if (rmrrp.position == 0) {

        rmrrp.competitors.sort(
          (a: {
            'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
            'rounds': Array<{
              "roundNumber": number,
              "roundScore": string,
              "show": boolean,
              "freeze": boolean
            }>
          }, b: {
            'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
            'rounds': Array<{
              "roundNumber": number,
              "roundScore": string,
              "show": boolean,
              "freeze": boolean
            }>
          }) => {

            if (this.choosenCompetition.resultType == "points") {
              if (Number(a.finalScore) > Number(b.finalScore)) {
                return 1 * this.invertSortToDescendingOrder;
              }
              if (Number(a.finalScore) < Number(b.finalScore)) {
                return -1 * this.invertSortToDescendingOrder;
              }
              return 0;
            } else {
              if (a.finalScore > b.finalScore) {
                return 1 * this.invertSortToDescendingOrder;
              }
              if (a.finalScore < b.finalScore) {
                return -1 * this.invertSortToDescendingOrder;
              }
              return 0;

            }

          })

        if (rmrrp.competitors.length == 2) {


          finalist[0].nationality = rmrrp.competitors[0].nationality;
          finalist[0].player = rmrrp.competitors[0].player;

          finalist[1].nationality = rmrrp.competitors[1].nationality;
          finalist[1].player = rmrrp.competitors[1].player;

        }

        if (rmrrp.competitors.length > 2) {


          finalist[0].nationality = rmrrp.competitors[0].nationality;
          finalist[0].player = rmrrp.competitors[0].player;

          finalist[1].nationality = rmrrp.competitors[1].nationality;
          finalist[1].player = rmrrp.competitors[1].player;

          finalist[2].nationality = rmrrp.competitors[2].nationality;
          finalist[2].player = rmrrp.competitors[2].player;

          allRanked = true;
          return;
        }

      }
    });

    if (allRanked) {
      this.addMedals(finalist);
      return;
    }

    finalist[0].nationality = this.multipleRoundResultsPlayers[0].nationality;
    finalist[0].player = this.multipleRoundResultsPlayers[0].player;

    this.repeatMultipleRoundResultsPlayers.forEach(rmrrp => {
      if (rmrrp.position == 1) {

        rmrrp.competitors.sort(
          (a: {
            'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
            'rounds': Array<{
              "roundNumber": number,
              "roundScore": string,
              "show": boolean,
              "freeze": boolean
            }>
          }, b: {
            'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
            'rounds': Array<{
              "roundNumber": number,
              "roundScore": string,
              "show": boolean,
              "freeze": boolean
            }>
          }) => {

            if (this.choosenCompetition.resultType == "points") {
              if (Number(a.finalScore) > Number(b.finalScore)) {
                return 1 * this.invertSortToDescendingOrder;
              }
              if (Number(a.finalScore) < Number(b.finalScore)) {
                return -1 * this.invertSortToDescendingOrder;
              }
              return 0;
            } else {
              if (a.finalScore > b.finalScore) {
                return 1 * this.invertSortToDescendingOrder;
              }
              if (a.finalScore < b.finalScore) {
                return -1 * this.invertSortToDescendingOrder;
              }
              return 0;

            }

          })

        if (rmrrp.competitors.length >= 2) {


          finalist[1].nationality = rmrrp.competitors[0].nationality;
          finalist[1].player = rmrrp.competitors[0].player;

          finalist[2].nationality = rmrrp.competitors[1].nationality;
          finalist[2].player = rmrrp.competitors[1].player;

          allRanked = true;
          return;
        }

      }
    });

    if (allRanked) {
      this.addMedals(finalist);
      return;
    }

    finalist[1].nationality = this.multipleRoundResultsPlayers[1].nationality;
    finalist[1].player = this.multipleRoundResultsPlayers[1].player;

    this.repeatMultipleRoundResultsPlayers.forEach(rmrrp => {
      if (rmrrp.position == 2) {

        rmrrp.competitors.sort(
          (a: {
            'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
            'rounds': Array<{
              "roundNumber": number,
              "roundScore": string,
              "show": boolean,
              "freeze": boolean
            }>
          }, b: {
            'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
            'rounds': Array<{
              "roundNumber": number,
              "roundScore": string,
              "show": boolean,
              "freeze": boolean
            }>
          }) => {

            if (this.choosenCompetition.resultType == "points") {
              if (Number(a.finalScore) > Number(b.finalScore)) {
                return 1 * this.invertSortToDescendingOrder;
              }
              if (Number(a.finalScore) < Number(b.finalScore)) {
                return -1 * this.invertSortToDescendingOrder;
              }
              return 0;
            } else {
              if (a.finalScore > b.finalScore) {
                return 1 * this.invertSortToDescendingOrder;
              }
              if (a.finalScore < b.finalScore) {
                return -1 * this.invertSortToDescendingOrder;
              }
              return 0;

            }

          })

        finalist[2].nationality = rmrrp.competitors[0].nationality;
        finalist[2].player = rmrrp.competitors[0].player;

        allRanked = true;
        return;

      }
    });

    if (allRanked) {
      this.addMedals(finalist);
      return;
    }

    finalist[2].nationality = this.multipleRoundResultsPlayers[2].nationality;
    finalist[2].player = this.multipleRoundResultsPlayers[2].player;

    this.addMedals(finalist);
    return;

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
          return 1 * this.invertSortToDescendingOrder;
        }
        if (a.score < b.score) {
          return -1 * this.invertSortToDescendingOrder;
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

                                                this.competitionService.finishCompetitionService(
                                                  this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender).subscribe(
                                                    res => {
                                                      console.log(res)
                                                    })

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


            this.competitionService.finishCompetitionService(
              this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender).subscribe(
                res => {
                  console.log(res)
                })

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
          return 1 * this.invertSortToDescendingOrder;
        }
        if (a.score < b.score) {
          return -1 * this.invertSortToDescendingOrder;
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

  confirmRepeatedCurrentRoundResults() {
    console.log(this.repeatedCurrentRound);
    console.log(this.repeatMultipleRoundResultsPlayers);
    this.errorNoResults = false;

    /** Check if it is filled */

    this.repeatMultipleRoundResultsPlayers.forEach(rmrrp => {
      rmrrp.competitors.forEach(c => {
        c.rounds.forEach(rounds => {
          if (rounds.roundNumber == this.repeatedCurrentRound) {

            if (!rounds.roundScore) {
              this.errorNoResults = true;
              return;
            }
          }

        });
      });

    });
    if (this.errorNoResults) {
      return;
    }


    /** */



    console.log("All results here!")

    if (this.repeatedCurrentRound == 0) {

      this.repeatMultipleRoundResultsPlayers.forEach(rmrrp => {
        rmrrp.competitors.forEach(c => {
          c.rounds.forEach(rounds => {
            if (rounds.roundNumber == this.repeatedCurrentRound) {

              c.finalScore = c.rounds[this.repeatedCurrentRound].roundScore
              // c.rounds[this.repeatedCurrentRound].freeze = true;
              rounds.freeze = true;
            }
          });
        });
      });

    }

    else {

      this.repeatMultipleRoundResultsPlayers.forEach(rmrrp => {
        rmrrp.competitors.forEach(c => {
          c.rounds.forEach(rounds => {
            if (rounds.roundNumber == this.repeatedCurrentRound) {



              if (this.choosenCompetition.resultType == "points") {
                if (Number(c.finalScore) < Number(c.rounds[this.repeatedCurrentRound].roundScore)) {
                  c.finalScore = c.rounds[this.repeatedCurrentRound].roundScore;
                }
              } else {
                if (c.finalScore < c.rounds[this.repeatedCurrentRound].roundScore) {
                  c.finalScore = c.rounds[this.repeatedCurrentRound].roundScore;
                }
              }
              // rounds.freeze = true;
              c.rounds[this.repeatedCurrentRound].freeze = true;

            }
          });
        });
      });

    }

    console.log(this.repeatMultipleRoundResultsPlayers);
    let copyRepeatedCurrentRound = this.repeatedCurrentRound;
    this.repeatMultipleRoundResultsPlayers.forEach(rmrrp => {
      let roundResult: Array<{ player: string, nationality: string, score: string }> = [];

      rmrrp.competitors.forEach(c => {
        c.rounds.forEach(rounds => {
          if (rounds.roundNumber == this.repeatedCurrentRound) {

            roundResult.push({
              "nationality": c.nationality,
              "player": c.player,
              "score": rounds.roundScore
            })


          }
        });
      });

      this.roundService.addRoundService(
        this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
        copyRepeatedCurrentRound,
        roundResult, "repeated", rmrrp.position
      ).subscribe(
        res => {
          console.log(res);
        });

    });

    this.repeatedCurrentRound += 1;
    if (this.repeatedCurrentRound == this.choosenCompetition.roundsNumber) {
      console.log("End")
      this.confirmedResultsRoundsFinal = true;

    } else {

      this.repeatMultipleRoundResultsPlayers.forEach(rmrrp => {
        rmrrp.competitors.forEach(c => {
          c.rounds.forEach(rounds => {
            if (rounds.roundNumber == this.repeatedCurrentRound) {

              rounds.show = true;
              this.repeatRoundsCounter[this.repeatedCurrentRound].show = true;
            }
          });
        });
      });

    }

  }

  confirmCurrentRoundResults() {
    console.log(this.currentRound)
    this.errorNoResults = false;
    this.repeatMultipleRoundResultsPlayers = [];
    this.needForRepetition = false;

    this.multipleRoundResultsPlayers.forEach(mrrp => {
      if (!mrrp.rounds[this.currentRound].roundScore) {
        this.errorNoResults = true;
        return;
      }
    });
    if (this.errorNoResults) {
      return;
    }
    console.log("All results here!")
    if (this.currentRound == 0) {
      for (let i = 0; i < this.choosenCompetition.competitorsNumber; i++) {
        this.multipleRoundResultsPlayers[i].finalScore = this.multipleRoundResultsPlayers[i].rounds[this.currentRound].roundScore
        this.multipleRoundResultsPlayers[i].rounds[this.currentRound].freeze = true;
      }

    } else {

      for (let i = 0; i < this.choosenCompetition.competitorsNumber; i++) {

        if (this.choosenCompetition.resultType == "points") {
          if (Number(this.multipleRoundResultsPlayers[i].finalScore) < Number(this.multipleRoundResultsPlayers[i].rounds[this.currentRound].roundScore)) {
            this.multipleRoundResultsPlayers[i].finalScore = this.multipleRoundResultsPlayers[i].rounds[this.currentRound].roundScore;
          }
        } else {
          if (this.multipleRoundResultsPlayers[i].finalScore < this.multipleRoundResultsPlayers[i].rounds[this.currentRound].roundScore) {
            this.multipleRoundResultsPlayers[i].finalScore = this.multipleRoundResultsPlayers[i].rounds[this.currentRound].roundScore;
          }
        }

        this.multipleRoundResultsPlayers[i].rounds[this.currentRound].freeze = true;
      }
    }

    console.log(this.multipleRoundResultsPlayers);

    let roundResult: Array<{ player: string, nationality: string, score: string }> = [];

    for (let i = 0; i < this.choosenCompetition.competitorsNumber; i++) {

      let playerRoundResult: string = "";
      this.multipleRoundResultsPlayers[i].rounds.forEach(roundPerPlayer => {
        if (roundPerPlayer.roundNumber == this.currentRound) {
          playerRoundResult = roundPerPlayer.roundScore;
        }
      });
      roundResult.push({
        "nationality": this.multipleRoundResultsPlayers[i].nationality,
        "player": this.multipleRoundResultsPlayers[i].player,
        "score": playerRoundResult
      })

    }

    this.roundService.addRoundService(
      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
      this.currentRound,
      roundResult, "regular", 1
    ).subscribe(
      res => {
        console.log(res);

        // prepare next round

        this.currentRound += 1;
        if (this.currentRound == this.choosenCompetition.roundsNumber) {
          console.log("End")
          /** */

          this.multipleRoundResultsPlayers.sort(
            (a: {
              'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
              'rounds': Array<{
                "roundNumber": number,
                "roundScore": string,
                "show": boolean,
                "freeze": boolean
              }>
            }, b: {
              'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
              'rounds': Array<{
                "roundNumber": number,
                "roundScore": string,
                "show": boolean,
                "freeze": boolean
              }>
            }) => {

              if (this.choosenCompetition.resultType == "points") {
                if (Number(a.finalScore) > Number(b.finalScore)) {
                  return 1 * this.invertSortToDescendingOrder;
                }
                if (Number(a.finalScore) < Number(b.finalScore)) {
                  return -1 * this.invertSortToDescendingOrder;
                }
                return 0;
              } else {
                if (a.finalScore > b.finalScore) {
                  return 1 * this.invertSortToDescendingOrder;
                }
                if (a.finalScore < b.finalScore) {
                  return -1 * this.invertSortToDescendingOrder;
                }
                return 0;

              }

            })
          console.log(this.multipleRoundResultsPlayers)

          var repeatingElements: {
            [score: string]: {
              "position": number, "competitors":
              Array<{
                'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
                'rounds': Array<{
                  "roundNumber": number,
                  "roundScore": string,
                  "show": boolean,
                  "freeze": boolean
                }>
              }>
            }
          } = {};

          for (var i = 0; i < this.multipleRoundResultsPlayers.length - 1; i++) {
            if (this.multipleRoundResultsPlayers[i + 1].finalScore === this.multipleRoundResultsPlayers[i].finalScore) {
              this.needForRepetition = true;
              if (repeatingElements[this.multipleRoundResultsPlayers[i].finalScore] === undefined) {
                repeatingElements[this.multipleRoundResultsPlayers[i].finalScore] = { "position": i, "competitors": [] };
              }
            }
          }
          console.log(repeatingElements)

          let positionHelper: number = -1;
          for (let i = 0; i < this.multipleRoundResultsPlayers.length; i++) {
            console.log(i + ": " + positionHelper + " # ")

            if (repeatingElements[this.multipleRoundResultsPlayers[i].finalScore] !== undefined) {

              let rounds: Array<{
                "roundNumber": number,
                "roundScore": string,
                "show": boolean,
                "freeze": boolean
              }> = new Array<{
                "roundNumber": number,
                "roundScore": string,
                "show": boolean,
                "freeze": boolean
              }>(this.choosenCompetition.roundsNumber);

              for (let j = 0; j < this.choosenCompetition.roundsNumber; j++) {
                let showRound: boolean = false;
                if (j == 0) {
                  showRound = true;
                }
                rounds[j] = {
                  "roundNumber": j,
                  "roundScore": "",
                  "show": showRound,
                  "freeze": false
                }
              }

              repeatingElements[this.multipleRoundResultsPlayers[i].finalScore].competitors.push(
                {
                  "nationality": this.multipleRoundResultsPlayers[i].nationality,
                  "player": this.multipleRoundResultsPlayers[i].player,
                  "finalScore": this.multipleRoundResultsPlayers[i].finalScore,
                  "playerIndex": i,
                  "rounds": rounds
                }
              );

            }
          }

          for (let key in repeatingElements) {
            this.repeatMultipleRoundResultsPlayers.push({ "position": repeatingElements[key].position, "competitors": repeatingElements[key].competitors })
          }
          this.repeatRoundsCounter = new Array<{
            "roundNumber": number,
            "show": boolean
          }>(this.choosenCompetition.roundsNumber)
          for (let i = 0; i < this.choosenCompetition.roundsNumber; i++) {
            let showRound: boolean = false;
            if (i == 0) {
              showRound = true;
            }
            this.repeatRoundsCounter[i] = { "roundNumber": i, "show": showRound }
          }


          /*
          this.repeatFinalRound.forEach(rp => {
            rp.competitors.forEach(c => {
              c.score = "";
            });
          });
          */
          console.log(this.repeatMultipleRoundResultsPlayers)
          if (this.needForRepetition == true) {
            return;
          }

          /** */
          this.confirmedResultsRoundsFinal = true;






        } else {
          for (let i = 0; i < this.choosenCompetition.competitorsNumber; i++) {
            this.multipleRoundResultsPlayers[i].rounds[this.currentRound].show = true;
            this.roundsCounter[this.currentRound].show = true;
          }
        }

      })

  }

  competitionIsChoosen() {

    this.errorNoCompetition = "";
    this.errorNoResults = false;

    this.representativesFinal = null;
    this.representativesTree = null;
    this.representativesGroup = null;

    this.multipleRoundResultsPlayers = null;
    /*new Array<{
      'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
      'rounds': Array<{
        "roundNumber": number,
        "roundScore": string,
        "show": boolean,
        "freeze": boolean
      }>
    }>(this.choosenCompetition.competitorsNumber);
    */
    this.roundsCounter = null;
    /*new Array<{ "roundNumber": number, "show": boolean }>(this.choosenCompetition.roundsNumber)*/
    this.repeatMultipleRoundResultsPlayers = null;
    this.repeatRoundsCounter = null;
    this.confirmedResultsRoundsFinal = false;
    this.currentRound = null;
    this.repeatedCurrentRound = null;

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

    this.showEighthFinalTree = false;
    this.showQuarterFinalTree = false;
    this.showSemiFinalTree = false;
    this.showThirdPlaceTree = false;
    this.showFirstPlaceTree = false;
    this.confirmedResultsTree = false;

    this.competitionLocationTree = new Array<string>(16);
    this.competitionDateTree = new Array<string>(16);
    this.competitionTimeTree = new Array<string>(16);

    this.competitors = new Array<{ "player1": string, "nationality1": string, "player2": string, "nationality2": string, "score": string }>(16);

    // group
    this.teamsPerGroup = null;
    this.numberOfRounds = null;
    this.matchesPerGroup = null;
    this.groupMatchesPlayed = null;
    this.confirmedResultsGroupsport = false;
    this.timetabledEndCompetition = false;
    this.groupPhaseFinished = false;

    this.groupLocations = null;
    this.groupDate = null;
    this.groupTime = null;
    this.groups = null;
    this.errorNoGroupResults = null;


    this.competitionResultsMedalsFinished = false;

    this.invertSortToDescendingOrder = 1;
    if (this.choosenCompetition.resultType != "time") {
      this.invertSortToDescendingOrder = -1;
    }

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

            if (this.choosenCompetition.roundsNumber > 1) {
              this.roundService.fetchRepeatedRoundsBySportDisciplineAndGenderService(
                this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender).subscribe(
                  (repeatedRounds: Round[]) => {
                    console.log(repeatedRounds)
                    this.roundService.fetchRegularRoundsBySportDisciplineAndGenderService(
                      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender).subscribe(
                        (rounds: Round[]) => {
                          console.log("MULTIPLE ROUNDS")
                          console.log(rounds);
                          this.multipleRoundResultsPlayers = new Array<{
                            'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
                            'rounds': Array<{
                              "roundNumber": number,
                              "roundScore": string,
                              "show": boolean,
                              "freeze": boolean
                            }>
                          }>(this.choosenCompetition.competitorsNumber);

                          this.roundsCounter = new Array<{ "roundNumber": number, "show": boolean }>(this.choosenCompetition.roundsNumber);

                          this.currentRound = 0;
                          this.repeatedCurrentRound = 0;
                          for (let i = 0; i < this.choosenCompetition.competitorsNumber; i++) {
                            this.multipleRoundResultsPlayers[i] = {
                              "playerIndex": i,
                              "player": this.representativesFinal[i].player,
                              "nationality": this.representativesFinal[i].nationality,
                              "finalScore": "0",
                              "rounds": new Array<{
                                "roundNumber": number,
                                "roundScore": string,
                                "show": boolean,
                                "freeze": boolean
                              }>(this.choosenCompetition.roundsNumber)
                            }

                            for (let j = 0; j < this.choosenCompetition.roundsNumber; j++) {
                              let showRound: boolean = false;
                              if (j == 0) {
                                showRound = true;
                              }
                              this.multipleRoundResultsPlayers[i].rounds[j] = {
                                "roundNumber": j,
                                "roundScore": "",
                                "show": showRound,
                                "freeze": false
                              }
                            }

                          }

                          for (let i = 0; i < this.choosenCompetition.roundsNumber; i++) {
                            let showRound: boolean = false;
                            if (i == 0) {
                              showRound = true;
                            }
                            this.roundsCounter[i] = { "roundNumber": i, "show": showRound }
                          }

                          console.log(this.multipleRoundResultsPlayers)

                          if (rounds.length != 0) {
                            console.log("Rounds from database")
                            rounds.forEach(r => {

                              if (this.currentRound < r.roundNumber) {
                                this.currentRound = r.roundNumber;
                              }

                              for (let i = 0; i < this.choosenCompetition.competitorsNumber; i++) {

                                r.roundResults.forEach(roundResult => {
                                  if (roundResult.nationality == this.multipleRoundResultsPlayers[i].nationality
                                    &&
                                    roundResult.player == this.multipleRoundResultsPlayers[i].player
                                  ) {

                                    this.multipleRoundResultsPlayers[i].rounds[r.roundNumber].show = true;
                                    this.multipleRoundResultsPlayers[i].rounds[r.roundNumber].freeze = false;
                                    this.multipleRoundResultsPlayers[i].rounds[r.roundNumber].roundScore = roundResult.score;

                                    if (this.choosenCompetition.resultType == "points") {
                                      if (Number(this.multipleRoundResultsPlayers[i].finalScore) < Number(roundResult.score)) {
                                        this.multipleRoundResultsPlayers[i].finalScore = roundResult.score;
                                      }
                                    } else {
                                      if (this.multipleRoundResultsPlayers[i].finalScore < roundResult.score) {
                                        this.multipleRoundResultsPlayers[i].finalScore = roundResult.score;
                                      }
                                    }

                                  }
                                });
                              }


                              this.roundsCounter[r.roundNumber].show = true;

                            });

                            this.currentRound += 1;
                            if (this.currentRound == this.choosenCompetition.roundsNumber) {
                              console.log("End")

                              this.repeatMultipleRoundResultsPlayers = []

                              /** */
                              // baseee fetch
                              this.multipleRoundResultsPlayers.sort(
                                (a: {
                                  'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
                                  'rounds': Array<{
                                    "roundNumber": number,
                                    "roundScore": string,
                                    "show": boolean,
                                    "freeze": boolean
                                  }>
                                }, b: {
                                  'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
                                  'rounds': Array<{
                                    "roundNumber": number,
                                    "roundScore": string,
                                    "show": boolean,
                                    "freeze": boolean
                                  }>
                                }) => {

                                  if (this.choosenCompetition.resultType == "points") {
                                    if (Number(a.finalScore) > Number(b.finalScore)) {
                                      return 1 * this.invertSortToDescendingOrder;
                                    }
                                    if (Number(a.finalScore) < Number(b.finalScore)) {
                                      return -1 * this.invertSortToDescendingOrder;
                                    }
                                    return 0;
                                  } else {
                                    if (a.finalScore > b.finalScore) {
                                      return 1 * this.invertSortToDescendingOrder;
                                    }
                                    if (a.finalScore < b.finalScore) {
                                      return -1 * this.invertSortToDescendingOrder;
                                    }
                                    return 0;

                                  }

                                })
                              console.log(this.multipleRoundResultsPlayers)

                              var repeatingElements: {
                                [score: string]: {
                                  "position": number, "competitors":
                                  Array<{
                                    'playerIndex': number, 'nationality': string, 'player': string, 'finalScore': string,
                                    'rounds': Array<{
                                      "roundNumber": number,
                                      "roundScore": string,
                                      "show": boolean,
                                      "freeze": boolean
                                    }>
                                  }>
                                }
                              } = {};

                              for (var i = 0; i < this.multipleRoundResultsPlayers.length - 1; i++) {
                                if (this.multipleRoundResultsPlayers[i + 1].finalScore === this.multipleRoundResultsPlayers[i].finalScore) {
                                  this.needForRepetition = true;
                                  if (repeatingElements[this.multipleRoundResultsPlayers[i].finalScore] === undefined) {
                                    repeatingElements[this.multipleRoundResultsPlayers[i].finalScore] = { "position": i, "competitors": [] };
                                  }
                                }
                              }
                              console.log(repeatingElements)

                              let positionHelper: number = -1;
                              for (let i = 0; i < this.multipleRoundResultsPlayers.length; i++) {
                                console.log(i + ": " + positionHelper + " # ")

                                if (repeatingElements[this.multipleRoundResultsPlayers[i].finalScore] !== undefined) {

                                  let rounds: Array<{
                                    "roundNumber": number,
                                    "roundScore": string,
                                    "show": boolean,
                                    "freeze": boolean
                                  }> = new Array<{
                                    "roundNumber": number,
                                    "roundScore": string,
                                    "show": boolean,
                                    "freeze": boolean
                                  }>(this.choosenCompetition.roundsNumber);

                                  for (let j = 0; j < this.choosenCompetition.roundsNumber; j++) {
                                    let showRound: boolean = false;
                                    if (j == 0) {
                                      showRound = true;
                                    }
                                    rounds[j] = {
                                      "roundNumber": j,
                                      "roundScore": "",
                                      "show": showRound,
                                      "freeze": false
                                    }
                                  }

                                  repeatingElements[this.multipleRoundResultsPlayers[i].finalScore].competitors.push(
                                    {
                                      "nationality": this.multipleRoundResultsPlayers[i].nationality,
                                      "player": this.multipleRoundResultsPlayers[i].player,
                                      "finalScore": this.multipleRoundResultsPlayers[i].finalScore,
                                      "playerIndex": i,
                                      "rounds": rounds
                                    }
                                  );

                                }
                              }

                              for (let key in repeatingElements) {
                                this.repeatMultipleRoundResultsPlayers.push({ "position": repeatingElements[key].position, "competitors": repeatingElements[key].competitors })
                              }
                              this.repeatRoundsCounter = new Array<{
                                "roundNumber": number,
                                "show": boolean
                              }>(this.choosenCompetition.roundsNumber)
                              for (let i = 0; i < this.choosenCompetition.roundsNumber; i++) {
                                let showRound: boolean = false;
                                if (i == 0) {
                                  showRound = true;
                                }
                                this.repeatRoundsCounter[i] = { "roundNumber": i, "show": showRound }
                              }

                              console.log(this.repeatMultipleRoundResultsPlayers)


                              /** */

                              /*repeatedRounds.forEach(rr => {
                                rr.
                              });*/

                              /** */

                            } else {
                              for (let i = 0; i < this.choosenCompetition.competitorsNumber; i++) {
                                this.multipleRoundResultsPlayers[i].rounds[this.currentRound].show = true;
                                this.roundsCounter[this.currentRound].show = true;
                              }
                            }
                          }


                        })

                  })
            }

          } else {
            console.log("TREE")
            console.log(this.choosenCompetition.competitorsNumber);

            if (this.choosenCompetition.competitorsNumber == 16) {
              this.showEighthFinalTree = true;
              this.showQuarterFinalTree = false;
              this.showSemiFinalTree = false;
              this.showThirdPlaceTree = false;
              this.showFirstPlaceTree = false;

            } else if (this.choosenCompetition.competitorsNumber == 8) {
              // Nije jos provereno
              this.showEighthFinalTree = false;
              this.showQuarterFinalTree = true;
              this.showSemiFinalTree = false;
              this.showThirdPlaceTree = false;
              this.showFirstPlaceTree = false;

            } else {
              // Nije jos provereno
              // 4 competitors
              this.showEighthFinalTree = false;
              this.showQuarterFinalTree = false;
              this.showSemiFinalTree = true;
              this.showThirdPlaceTree = false;
              this.showFirstPlaceTree = false;

            }


            console.log(this.timetables)
            console.log(this.representativesTree)
            console.log(this.choosenCompetition.participants.length);
            console.log(this.choosenCompetition.participants)

            timetables.forEach(tt => {
              if (tt.type.split(" ")[0] == "tree") {
                let index: number = parseInt(tt.type.split(" ")[2]);
                //console.log(index);
                this.competitionLocationTree[index] = tt.location;
                this.competitionDateTree[index] = tt.datetime.split("T")[0];
                this.competitionTimeTree[index] = tt.datetime.split("T")[1];
              }
            });

            this.representativesTree.forEach(rt => {
              this.competitors[rt.index] =
              {
                "player1": rt.player1, "nationality1": rt.nationality1,
                "player2": rt.player2, "nationality2": rt.nationality2,
                "score": ""
              }
            });

            console.log(this.competitionLocationTree);
            console.log(this.competitionDateTree);
            console.log(this.competitionTimeTree);
            console.log(this.competitors);

          }
        } else {
          console.log("TEAM -> group")

          this.groupService.fetchBySportAndGenderService(this.choosenCompetition.sportName, this.choosenCompetition.gender).subscribe(
            (groupsAndRounds: GroupPhase[]) => {
              console.log(groupsAndRounds);

              console.log(this.choosenCompetition.groupNumber)
              console.log(this.timetables)

              console.log(this.choosenCompetition)
              this.teamsPerGroup = this.choosenCompetition.competitorsNumber / this.choosenCompetition.groupNumber;
              this.numberOfRounds = this.teamsPerGroup - 1;
              this.matchesPerGroup = this.teamsPerGroup / 2;
              this.groupMatchesPlayed = this.choosenCompetition.groupNumber * this.numberOfRounds * this.matchesPerGroup
              console.log(this.numberOfRounds)
              console.log(this.teamsPerGroup)
              console.log(this.matchesPerGroup);
              console.log(this.groupMatchesPlayed);

              // tree part of group competition!
              this.showEighthFinalTree = false;
              this.showQuarterFinalTree = true;
              this.showSemiFinalTree = false;
              this.showThirdPlaceTree = false;
              this.showFirstPlaceTree = false;

              this.groupLocations = new Array<{ "groupNumber": number, "groupContent": Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "location": string }> }> }>(this.choosenCompetition.groupNumber)
              this.groupDate = new Array<{ "groupNumber": number, "groupContent": Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "date": string }> }> }>(this.choosenCompetition.groupNumber)
              this.groupTime = new Array<{ "groupNumber": number, "groupContent": Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "time": string }> }> }>(this.choosenCompetition.groupNumber)
              this.errorNoGroupResults = new Array<{ "groupNumber": number, "groupContent": Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "error": string }> }> }>(this.choosenCompetition.groupNumber)


              for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
                //console.log(i)
                this.groupLocations[i] = { "groupNumber": i, "groupContent": new Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "location": string }> }>(this.numberOfRounds) }
                this.groupDate[i] = { "groupNumber": i, "groupContent": new Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "date": string }> }>(this.numberOfRounds) }
                this.groupTime[i] = { "groupNumber": i, "groupContent": new Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "time": string }> }>(this.numberOfRounds) }
                this.errorNoGroupResults[i] = { "groupNumber": i, "groupContent": new Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "error": string }> }>(this.numberOfRounds) }

                for (let j = 0; j < this.numberOfRounds; j++) {
                  //console.log(j)
                  this.groupLocations[i].groupContent[j] = { "roundNumber": j, "roundContent": new Array<{ "index": number, "location": string }>(this.matchesPerGroup) }
                  this.groupDate[i].groupContent[j] = { "roundNumber": j, "roundContent": new Array<{ "index": number, "date": string }>(this.matchesPerGroup) }
                  this.groupTime[i].groupContent[j] = { "roundNumber": j, "roundContent": new Array<{ "index": number, "time": string }>(this.matchesPerGroup) }
                  this.errorNoGroupResults[i].groupContent[j] = { "roundNumber": j, "roundContent": new Array<{ "index": number, "error": string }>(this.matchesPerGroup) }

                  for (let k = 0; k < this.matchesPerGroup; k++) {
                    this.errorNoGroupResults[i].groupContent[j].roundContent[k] = { "index": k, "error": "" };

                    this.timetables.forEach(tt => {
                      let tokens: string[] = tt.type.split(" ");
                      if (tokens[0] == "group") {
                        let group: number = Number(tokens[1]);
                        let round: number = Number(tokens[2]);
                        let match: number = Number(tokens[3]);
                        if (group == i && round == j && match == k) {
                          this.groupLocations[i].groupContent[j].roundContent[k] = { "index": k, "location": tt.location };
                          this.groupDate[i].groupContent[j].roundContent[k] = { "index": k, "date": tt.datetime.split("T")[0] };
                          this.groupTime[i].groupContent[j].roundContent[k] = { "index": k, "time": tt.datetime.split("T")[1] };

                        }
                      }

                    });


                  }

                }

              }

              this.groups = new Array<{ "groupNumber": number, "groupContent": Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, nationality1: string, representation1: string, nationality2: string, representation2: string, score: string, archived: boolean }> }> }>(this.choosenCompetition.groupNumber);

              for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
                this.groups[i] = { "groupNumber": i, "groupContent": new Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, nationality1: string, representation1: string, nationality2: string, representation2: string, score: string, archived: boolean }> }>(this.numberOfRounds) }

                for (let j = 0; j < this.numberOfRounds; j++) {
                  this.groups[i].groupContent[j] = { "roundNumber": j, "roundContent": new Array<{ "index": number, nationality1: string, representation1: string, nationality2: string, representation2: string, score: string, archived: boolean }>(this.matchesPerGroup) }


                  groupsAndRounds.forEach(gr => {

                    if (i == gr.groupNumber && j == gr.roundNumber) {

                      gr.groupMatches.forEach(match => {
                        this.groups[i].groupContent[j].roundContent[match.index] =
                        {
                          "index": match.index,
                          "nationality1": match.nationality1, "representation1": match.player1,
                          "nationality2": match.nationality2, "representation2": match.player2,
                          "score": match.score,
                          "archived": false
                        };
                      });

                    }
                  });

                }
              }

              if (this.resultScratch.timetabledEndCompetition == true && this.resultScratch.groupPhaseFinished == true) {
                // Again we entered to fill final phase of group sport
                for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
                  for (let j = 0; j < this.numberOfRounds; j++) {
                    for (let k = 0; k < this.matchesPerGroup; k++) {
                      this.groups[i].groupContent[j].roundContent[k].archived = true;
                    }
                  }
                }

                this.timetabledEndCompetition = true;
                this.groupPhaseFinished = true;

                this.timetables.forEach(tt => {
                  if (tt.type.split(" ")[0] == "tree") {
                    let index: number = parseInt(tt.type.split(" ")[2]);
                    //console.log(index);
                    this.competitionLocationTree[index] = tt.location;
                    this.competitionDateTree[index] = tt.datetime.split("T")[0];
                    this.competitionTimeTree[index] = tt.datetime.split("T")[1];
                  }
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

              console.log(this.groups);
              console.log(this.groupLocations);
              console.log(this.groupDate);
              console.log(this.groupTime);

            })

        }

      })
    })


  }

  confirmGroupResult(groupNumber, roundNumber, index) {
    console.log(groupNumber, roundNumber, index);
    this.errorNoGroupResults[groupNumber].groupContent[roundNumber].roundContent[index].error = "";

    if (!this.groups[groupNumber].groupContent[roundNumber].roundContent[index].score) {
      this.errorNoGroupResults[groupNumber].groupContent[roundNumber].roundContent[index].error = "Unesite rezultat!";
      return;
    }

    let points: string[] = this.groups[groupNumber].groupContent[roundNumber].roundContent[index].score.split(":");
    console.log(this.choosenCompetition.sportName);
    console.log(this.choosenCompetition.disciplineName);
    console.log(this.choosenCompetition.gender);

    if (points[0] == points[1]) {
      this.errorNoGroupResults[groupNumber].groupContent[roundNumber].roundContent[index].error = "Nerešen rezultat nije dozvoljen!";
      return;
    }

    let achievedPoints1: number;
    let achievedPoints2: number;
    let playedPoints1: number = Number(points[0]);
    let playedPoints2: number = Number(points[1])

    if (playedPoints1 > playedPoints2) {
      achievedPoints1 = 2;
      achievedPoints2 = 1;
    } else if (playedPoints1 < playedPoints2) {
      achievedPoints1 = 1;
      achievedPoints2 = 2;
    }

    this.resultService.addPointsAndScoreToRepresentationService(
      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
      groupNumber, this.groups[groupNumber].groupContent[roundNumber].roundContent[index].nationality1,
      achievedPoints1, playedPoints1
    ).subscribe(
      res => {
        console.log(res);
      })
    this.resultService.addPointsAndScoreToRepresentationService(
      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
      groupNumber, this.groups[groupNumber].groupContent[roundNumber].roundContent[index].nationality2,
      achievedPoints2, playedPoints2
    ).subscribe(
      res => {
        console.log(res);
      })

    this.groupService.addPointsToGroupMatchService(
      this.choosenCompetition.sportName, this.choosenCompetition.gender,
      groupNumber, roundNumber, index,
      this.groups[groupNumber].groupContent[roundNumber].roundContent[index].score
    ).subscribe(
      res => {
        console.log(res);
      })


    console.log(this.groups[groupNumber].groupContent[roundNumber].roundContent[index].score)

    this.groups[groupNumber].groupContent[roundNumber].roundContent[index].archived = true;
    this.groupMatchesPlayed--;
    console.log(this.groupMatchesPlayed)
    if (this.groupMatchesPlayed == 0) {
      console.log("Group phase finished!")
      this.resultService.finishGroupPhaseService(
        this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender).subscribe(
          res => {
            console.log(res)
            this.resultScratch.groupPhaseFinished = true;
            this.groupPhaseFinished = true;
            this.resultService.fetchBySportDisciplineAndGenderService(
              this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender).subscribe(
                (result: Result) => {
                  console.log(result);
                  this.resultScratch = result;

                  if (this.resultScratch.timetabledEndCompetition == true) {
                    this.timetabledEndCompetition = true;
                    console.log("Goes utill end")
                    for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {

                      this.resultScratch.group[i].resultInGroups.sort((a: TeamResultInGroup, b: TeamResultInGroup) => {
                        if (a.points > b.points)
                          return 1 * this.invertSortToDescendingOrder;
                        if (a.points < b.points)
                          return -1 * this.invertSortToDescendingOrder;

                        for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
                          for (let j = 0; j < this.numberOfRounds; j++) {
                            for (let k = 0; k < this.matchesPerGroup; k++) {
                              let playedPoints1: string = this.groups[i].groupContent[j].roundContent[k].score.split(":")[0];
                              let playedPoints2: string = this.groups[i].groupContent[j].roundContent[k].score.split(":")[1];

                              if (a.nationality == this.groups[i].groupContent[j].roundContent[k].nationality1
                                && b.nationality == this.groups[i].groupContent[j].roundContent[k].nationality2) {
                                // found metch
                                // a is T1 and b is T2
                                console.log("sort: ", a.nationality, b.nationality, playedPoints1, playedPoints2)
                                if (playedPoints1 > playedPoints2) {
                                  return 1 * this.invertSortToDescendingOrder;
                                } else {
                                  return -1 * this.invertSortToDescendingOrder;
                                }
                              }

                              if (a.nationality == this.groups[i].groupContent[j].roundContent[k].nationality2
                                && b.nationality == this.groups[i].groupContent[j].roundContent[k].nationality1) {
                                // found metch
                                // a is T2 and b is T1
                                console.log("sort: ", a.nationality, b.nationality, playedPoints2, playedPoints1)
                                if (playedPoints2 > playedPoints1) {
                                  return 1 * this.invertSortToDescendingOrder;
                                } else {
                                  return -1 * this.invertSortToDescendingOrder;
                                }
                              }

                            }
                          }
                        }
                        return 0;
                      })
                    }

                    // sorted
                    // A1 + B4
                    this.competitors[8] = {
                      "player1": this.resultScratch.group[0].resultInGroups[0].team,
                      "nationality1": this.resultScratch.group[0].resultInGroups[0].nationality,
                      "player2": this.resultScratch.group[1].resultInGroups[3].team,
                      "nationality2": this.resultScratch.group[1].resultInGroups[3].nationality,
                      "score": ""
                    }

                    // B2 + A3
                    this.competitors[9] = {
                      "player1": this.resultScratch.group[1].resultInGroups[1].team,
                      "nationality1": this.resultScratch.group[1].resultInGroups[1].nationality,
                      "player2": this.resultScratch.group[0].resultInGroups[2].team,
                      "nationality2": this.resultScratch.group[0].resultInGroups[2].nationality,
                      "score": ""
                    }

                    // B1 + A4
                    this.competitors[10] = {
                      "player1": this.resultScratch.group[1].resultInGroups[0].team,
                      "nationality1": this.resultScratch.group[1].resultInGroups[0].nationality,
                      "player2": this.resultScratch.group[0].resultInGroups[3].team,
                      "nationality2": this.resultScratch.group[0].resultInGroups[3].nationality,
                      "score": ""
                    }

                    // A2 + B3
                    this.competitors[11] = {
                      "player1": this.resultScratch.group[0].resultInGroups[1].team,
                      "nationality1": this.resultScratch.group[0].resultInGroups[1].nationality,
                      "player2": this.resultScratch.group[1].resultInGroups[2].team,
                      "nationality2": this.resultScratch.group[1].resultInGroups[2].nationality,
                      "score": ""
                    }
                    for (let i = 8; i < 12; i++) {
                      this.resultService.addRepresentationsToTreeService(
                        this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
                        i, this.competitors[i].nationality1, this.competitors[i].nationality2, this.competitors[i].player1, this.competitors[i].player2
                      ).subscribe(
                        res => {
                          console.log(res)
                        })

                    }

                    // locations
                    this.timetables.forEach(tt => {
                      if (tt.type.split(" ")[0] == "tree") {
                        let index: number = parseInt(tt.type.split(" ")[2]);
                        //console.log(index);
                        this.competitionLocationTree[index] = tt.location;
                        this.competitionDateTree[index] = tt.datetime.split("T")[0];
                        this.competitionTimeTree[index] = tt.datetime.split("T")[1];
                      }
                    });

                  } else {
                    console.log("Need to enter competition end timetable")

                    for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {

                      this.resultScratch.group[i].resultInGroups.sort((a: TeamResultInGroup, b: TeamResultInGroup) => {
                        if (a.points > b.points)
                          return 1 * this.invertSortToDescendingOrder;
                        if (a.points < b.points)
                          return -1 * this.invertSortToDescendingOrder;

                        for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
                          for (let j = 0; j < this.numberOfRounds; j++) {
                            for (let k = 0; k < this.matchesPerGroup; k++) {
                              let playedPoints1: string = this.groups[i].groupContent[j].roundContent[k].score.split(":")[0];
                              let playedPoints2: string = this.groups[i].groupContent[j].roundContent[k].score.split(":")[1];

                              if (a.nationality == this.groups[i].groupContent[j].roundContent[k].nationality1
                                && b.nationality == this.groups[i].groupContent[j].roundContent[k].nationality2) {
                                // found metch
                                // a is T1 and b is T2
                                console.log("sort: ", a.nationality, b.nationality, playedPoints1, playedPoints2)
                                if (playedPoints1 > playedPoints2) {
                                  return 1 * this.invertSortToDescendingOrder;
                                } else {
                                  return -1 * this.invertSortToDescendingOrder;
                                }
                              }

                              if (a.nationality == this.groups[i].groupContent[j].roundContent[k].nationality2
                                && b.nationality == this.groups[i].groupContent[j].roundContent[k].nationality1) {
                                // found metch
                                // a is T2 and b is T1
                                console.log("sort: ", a.nationality, b.nationality, playedPoints2, playedPoints1)
                                if (playedPoints2 > playedPoints1) {
                                  return 1 * this.invertSortToDescendingOrder;
                                } else {
                                  return -1 * this.invertSortToDescendingOrder;
                                }
                              }

                            }
                          }
                        }
                        return 0;
                      })
                    }

                    // sorted
                    // A1 + B4
                    this.competitors[8] = {
                      "player1": this.resultScratch.group[0].resultInGroups[0].team,
                      "nationality1": this.resultScratch.group[0].resultInGroups[0].nationality,
                      "player2": this.resultScratch.group[1].resultInGroups[3].team,
                      "nationality2": this.resultScratch.group[1].resultInGroups[3].nationality,
                      "score": ""
                    }

                    // B2 + A3
                    this.competitors[9] = {
                      "player1": this.resultScratch.group[1].resultInGroups[1].team,
                      "nationality1": this.resultScratch.group[1].resultInGroups[1].nationality,
                      "player2": this.resultScratch.group[0].resultInGroups[2].team,
                      "nationality2": this.resultScratch.group[0].resultInGroups[2].nationality,
                      "score": ""
                    }

                    // B1 + A4
                    this.competitors[10] = {
                      "player1": this.resultScratch.group[1].resultInGroups[0].team,
                      "nationality1": this.resultScratch.group[1].resultInGroups[0].nationality,
                      "player2": this.resultScratch.group[0].resultInGroups[3].team,
                      "nationality2": this.resultScratch.group[0].resultInGroups[3].nationality,
                      "score": ""
                    }

                    // A2 + B3
                    this.competitors[11] = {
                      "player1": this.resultScratch.group[0].resultInGroups[1].team,
                      "nationality1": this.resultScratch.group[0].resultInGroups[1].nationality,
                      "player2": this.resultScratch.group[1].resultInGroups[2].team,
                      "nationality2": this.resultScratch.group[1].resultInGroups[2].nationality,
                      "score": ""
                    }


                    let treeArray: Array<{ "index": number, "player1": string, "nationality1": string, "player2": string, "nationality2": string, "score": string }> = []

                    for (let i = 8; i < 12; i++) {
                      treeArray.push({
                        "index": i,
                        "player1": this.competitors[i].player1,
                        "nationality1": this.competitors[i].nationality1,
                        "player2": this.competitors[i].player2,
                        "nationality2": this.competitors[i].nationality2,
                        "score": this.competitors[i].score
                      });
                    }

                    this.resultService.addTreeToGroupResultCompetitionService(
                      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
                      treeArray).subscribe(
                        res => {
                          console.log(res);

                        })


                  }

                })

          })
    }


  }

  enterTimetableForEndPhase() {
    localStorage.setItem('competitionForTimetabling', JSON.stringify(this.choosenCompetition));
    this.router.navigate(['timetable-group-sport-final']);
  }


  closeCompetitionTree() {
    console.log(this.competitors[15])
    console.log(this.competitors[14])

    let sportAndDiscipline: string = this.choosenCompetition.sportName;
    if (this.choosenCompetition.disciplineName != null) {
      sportAndDiscipline += " " + this.choosenCompetition.disciplineName;
    }


    let firstPlacePlayer: string;
    let firstPlaceNationality: string;
    let secondPlacePlayer: string;
    let secondPlaceNationality: string;
    let thirdPlacePlayer: string;
    let thirdPlaceNationality: string;

    let points1Final: number = Number(this.competitors[15].score.split(":")[0])
    let points2Final: number = Number(this.competitors[15].score.split(":")[1])

    if (points1Final > points2Final) {
      firstPlacePlayer = this.competitors[15].player1; // first place
      firstPlaceNationality = this.competitors[15].nationality1;
      secondPlacePlayer = this.competitors[15].player2; // second place
      secondPlaceNationality = this.competitors[15].nationality2;
    } else {
      firstPlacePlayer = this.competitors[15].player2; // second place
      firstPlaceNationality = this.competitors[15].nationality2;
      secondPlacePlayer = this.competitors[15].player1; // first place
      secondPlaceNationality = this.competitors[15].nationality1;
    }

    let points1ThirdPlace: number = Number(this.competitors[14].score.split(":")[0])
    let points2ThirdPlace: number = Number(this.competitors[14].score.split(":")[1])

    if (points1ThirdPlace > points2ThirdPlace) {
      thirdPlacePlayer = this.competitors[14].player1; // third place
      thirdPlaceNationality = this.competitors[14].nationality1;
    } else {
      thirdPlacePlayer = this.competitors[14].player2; // third place
      thirdPlaceNationality = this.competitors[14].nationality2;
    }


    // Add medals
    if (this.choosenCompetition.initiallySingle) {
      console.log(firstPlacePlayer);
      this.playerService.addMedalService(
        firstPlacePlayer.substr(0, firstPlacePlayer.indexOf(' ')),
        firstPlacePlayer.substr(firstPlacePlayer.indexOf(' ') + 1),
        sportAndDiscipline, "goldMedals").subscribe(
          res => {
            console.log(res)

            console.log(secondPlacePlayer);
            this.playerService.addMedalService(
              secondPlacePlayer.substr(0, secondPlacePlayer.indexOf(' ')),
              secondPlacePlayer.substr(secondPlacePlayer.indexOf(' ') + 1),
              sportAndDiscipline, "silverMedals").subscribe(
                res => {
                  console.log(res)

                  console.log(thirdPlacePlayer);
                  this.playerService.addMedalService(
                    thirdPlacePlayer.substr(0, thirdPlacePlayer.indexOf(' ')),
                    thirdPlacePlayer.substr(thirdPlacePlayer.indexOf(' ') + 1),
                    sportAndDiscipline, "bronseMedals").subscribe(
                      res => {
                        console.log(res)

                        this.stateService.addMedalService(
                          firstPlaceNationality,
                          "goldMedals").subscribe(
                            res => {
                              console.log(res);
                              this.stateService.addMedalService(
                                secondPlaceNationality,
                                "silverMedals").subscribe(
                                  res => {
                                    console.log(res);
                                    this.stateService.addMedalService(
                                      thirdPlaceNationality,
                                      "bronseMedals").subscribe(
                                        res => {
                                          console.log(res);

                                          this.competitionService.finishCompetitionService(
                                            this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender).subscribe(
                                              res => {
                                                console.log(res)
                                              })

                                          this.choosenCompetition = null;
                                          this.competitionResultsMedalsFinished = true;



                                        })

                                  })

                            })
                      })
                })

          });
    } else {
      /*
          let firstPlacePlayer: string;
    let firstPlaceNationality: string;
    let secondPlacePlayer: string;
    let secondPlaceNationality: string;
    let thirdPlacePlayer: string;
    let thirdPlaceNationality: string;
      */
      this.stateService.addMedalService(
        firstPlaceNationality,
        "goldMedals").subscribe(
          res => {
            console.log(res);
            this.stateService.addMedalService(
              secondPlaceNationality,
              "silverMedals").subscribe(
                res => {
                  console.log(res);
                  this.stateService.addMedalService(
                    thirdPlaceNationality,
                    "bronseMedals").subscribe(
                      res => {
                        console.log(res);
                      })
                })
          })
      firstPlacePlayer = firstPlacePlayer.substring(firstPlacePlayer.indexOf("[") + 1, firstPlacePlayer.lastIndexOf("]"));
      secondPlacePlayer = secondPlacePlayer.substring(secondPlacePlayer.indexOf("[") + 1, secondPlacePlayer.lastIndexOf("]"));
      thirdPlacePlayer = thirdPlacePlayer.substring(thirdPlacePlayer.indexOf("[") + 1, thirdPlacePlayer.lastIndexOf("]"));

      let goldPlayers: string[] = firstPlacePlayer.split("; ");
      let silverPlayers: string[] = secondPlacePlayer.split("; ");
      let bronsePlayers: string[] = thirdPlacePlayer.split("; ");

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

      this.competitionService.finishCompetitionService(
        this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender).subscribe(
          res => {
            console.log(res)
          })

      this.choosenCompetition = null;
      this.competitionResultsMedalsFinished = true;


    }

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

    for (let i = 0; i < 8; i++) {
      this.resultService.addTreeScoreByIndexService(
        this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
        i, this.competitors[i].score).subscribe(
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
      let treeScratch: TreeCollection = {
        "index": i,
        "player1": this.competitors[i].player1, "nationality1": this.competitors[i].nationality1,
        "player2": this.competitors[i].player2, "nationality2": this.competitors[i].nationality2,
        "score": this.competitors[i].score
      };

      this.resultService.addTreeScratchService(
        this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
        treeScratch
      ).subscribe(
        res => {
          console.log(res);
        });

    }
    this.showQuarterFinalTree = true;
  }


  confirmQuarterFinal() {
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

    for (let i = 8; i < 12; i++) {
      this.resultService.addTreeScoreByIndexService(
        this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
        i, this.competitors[i].score).subscribe(
          res => {
            console.log(res);
          });
    }
    console.log("All filled")

    for (let i = 12, j = 8; i < 14; i++) {
      console.log(i, j, j + 1);
      this.competitors[i] = {
        "player1": "", "nationality1": "",
        "player2": "", "nationality2": "",
        "score": ""
      }

      let points1Left: number = Number(this.competitors[j].score.split(":")[0])
      let points2Left: number = Number(this.competitors[j].score.split(":")[1])

      let points1Right: number = Number(this.competitors[j + 1].score.split(":")[0])
      let points2Right: number = Number(this.competitors[j + 1].score.split(":")[1])

      if (points1Left > points2Left) {
        this.competitors[i].player1 = this.competitors[j].player1;
        this.competitors[i].nationality1 = this.competitors[j].nationality1;
      } else {
        this.competitors[i].player1 = this.competitors[j].player2;
        this.competitors[i].nationality1 = this.competitors[j].nationality2;
      }
      if (points1Right > points2Right) {
        this.competitors[i].player2 = this.competitors[j + 1].player1;
        this.competitors[i].nationality2 = this.competitors[j + 1].nationality1;
      } else {
        this.competitors[i].player2 = this.competitors[j + 1].player2;
        this.competitors[i].nationality2 = this.competitors[j + 1].nationality2;
      }
      j += 2
      let treeScratch: TreeCollection = {
        "index": i,
        "player1": this.competitors[i].player1, "nationality1": this.competitors[i].nationality1,
        "player2": this.competitors[i].player2, "nationality2": this.competitors[i].nationality2,
        "score": this.competitors[i].score
      };

      this.resultService.addTreeScratchService(
        this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
        treeScratch
      ).subscribe(
        res => {
          console.log(res);
        });

    }
    this.showSemiFinalTree = true;
  }

  confirmSemiFinal() {
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

    for (let i = 12; i < 14; i++) {
      this.resultService.addTreeScoreByIndexService(
        this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
        i, this.competitors[i].score).subscribe(
          res => {
            console.log(res);
          });
    }
    console.log("All filled")

    this.competitors[14] = {
      "player1": "", "nationality1": "",
      "player2": "", "nationality2": "",
      "score": ""
    } // third place match
    this.competitors[15] = {
      "player1": "", "nationality1": "",
      "player2": "", "nationality2": "",
      "score": ""
    } // final match

    let points1Left: number = Number(this.competitors[12].score.split(":")[0])
    let points2Left: number = Number(this.competitors[12].score.split(":")[1])

    let points1Right: number = Number(this.competitors[13].score.split(":")[0])
    let points2Right: number = Number(this.competitors[13].score.split(":")[1])

    if (points1Left > points2Left) {
      this.competitors[14].player1 = this.competitors[12].player2; // third place
      this.competitors[14].nationality1 = this.competitors[12].nationality2; // third place
      this.competitors[15].player1 = this.competitors[12].player1; // final
      this.competitors[15].nationality1 = this.competitors[12].nationality1; // final
    } else {
      this.competitors[14].player1 = this.competitors[12].player1; // third place
      this.competitors[14].nationality1 = this.competitors[12].nationality1; // third place
      this.competitors[15].player1 = this.competitors[12].player2; // final
      this.competitors[15].nationality1 = this.competitors[12].nationality2; // final
    }
    if (points1Right > points2Right) {
      this.competitors[14].player2 = this.competitors[13].player2; // third place
      this.competitors[14].nationality2 = this.competitors[13].nationality2; // third place
      this.competitors[15].player2 = this.competitors[13].player1; // final
      this.competitors[15].nationality2 = this.competitors[13].nationality1; // final
    } else {
      this.competitors[14].player2 = this.competitors[13].player1; // third place
      this.competitors[14].nationality2 = this.competitors[13].nationality1; // third place
      this.competitors[15].player2 = this.competitors[13].player2; // final
      this.competitors[15].nationality2 = this.competitors[13].nationality2; // final
    }

    let treeScratchThirdPlaceMatch: TreeCollection = {
      "index": 14,
      "player1": this.competitors[14].player1, "nationality1": this.competitors[14].nationality1,
      "player2": this.competitors[14].player2, "nationality2": this.competitors[14].nationality2,
      "score": this.competitors[14].score
    };

    this.resultService.addTreeScratchService(
      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
      treeScratchThirdPlaceMatch
    ).subscribe(
      res => {
        console.log(res);
      });
    let treeScratchFinalMatch: TreeCollection = {
      "index": 15,
      "player1": this.competitors[15].player1, "nationality1": this.competitors[15].nationality1,
      "player2": this.competitors[15].player2, "nationality2": this.competitors[15].nationality2,
      "score": this.competitors[15].score
    };

    this.resultService.addTreeScratchService(
      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
      treeScratchFinalMatch
    ).subscribe(
      res => {
        console.log(res);
      });


    this.showThirdPlaceTree = true;
  }


  confirmThirdPlaceResult() {
    this.errorNoResults = false;
    console.log(this.competitors);
    if (!this.competitors[14].score) {
      this.errorNoResults = true;
      return;
    }
    console.log("All filled");

    this.resultService.addTreeScoreByIndexService(
      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
      14, this.competitors[14].score).subscribe(
        res => {
          console.log(res);
        });
    this.showFirstPlaceTree = true;
  }

  confirmFirstPlaceResult() {
    this.errorNoResults = false;
    console.log(this.competitors);
    if (!this.competitors[15].score) {
      this.errorNoResults = true;
      return;
    }

    console.log("All filled");
    this.resultService.addTreeScoreByIndexService(
      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
      15, this.competitors[15].score).subscribe(
        res => {
          console.log(res);
        });
    if (this.choosenCompetition.actAsSingle == false) {
      this.confirmedResultsGroupsport = true;
    } else {
      this.confirmedResultsTree = true;
    }
  }

  closeCompetitionGroupsport() {
    this.closeCompetitionTree();
  }

}


