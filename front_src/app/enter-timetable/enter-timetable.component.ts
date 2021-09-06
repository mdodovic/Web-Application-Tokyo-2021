import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from '../competition.service';
import { GroupService } from '../group.service';
import { Competition } from '../models/competition';
import { FinalCollection } from '../models/finalCollection';
import { GroupCollection } from '../models/groupCollection';
import { GroupPhase } from '../models/groupPhase';
import { TeamResultInGroup } from '../models/teamResultInGroup';
import { Timetable } from '../models/timetable';
import { TreeCollection } from '../models/treeCollection';
import { User } from '../models/user';
import { ResultService } from '../result.service';
import { TimetableService } from '../timetable.service';

declare var require: any

@Component({
  selector: 'app-enter-timetable',
  templateUrl: './enter-timetable.component.html',
  styleUrls: ['./enter-timetable.component.css']
})
export class EnterTimetableComponent implements OnInit {

  constructor(
    private competitionService: CompetitionService,
    private router: Router,
    private timetableService: TimetableService,
    private resultService: ResultService,
    private groupService: GroupService,
    private activatedRoute: ActivatedRoute) { }

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
    for (let i = 0; i < 16; i++) {
      this.choosenLocationTree[i] = "";
      this.errorNoChoosenLocationTree[i] = "";
      this.choosenDatetimeTree[i] = "";
      this.errorNoChoosenDatetimeCompetitionTree[i] = "";
      this.errorClashingCompetitionsTree[i] = "";
    }

  }

  breadcrumbs: string;
  delegate: User;
  competitions: Competition[];

  alreadyTimetabledCompetitions: Timetable[];

  genders: { [id: string]: string; } = {
    "man": "Muškarci", "woman": "Žene"
  }

  locations: string[];

  choosenCompetition: Competition;
  errorNoCompetition: string;

  // Only for individuals!
  minDatetimeValueIndividual: string; // used for dates in general, for all 3 cathegories
  maxDatetimeValueIndividual: string; // used for dates in general, for all 3 cathegories

  choosenLocationIndividual: string;
  errorNoChoosenLocationIndividual: string;

  choosenDatetimeIndividual: string;
  errorNoChoosenDatetimeCompetitionIndividual: string;

  errorClashingCompetitionsIndividual: string;

  // Only for tree!
  indexesTree: number[] = [1, 5, 3, 7, 2, 6, 4, 8, 1, 3, 2, 4, 1, 2];
  eighthFinalTreeArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  quarterFinalTreeArray: number[] = [8, 9, 10, 11];
  semiFinalTreeArray: number[] = [12, 13];
  thirdPlaceTreeArray: number[] = [14];
  firstPlaceTreeArray: number[] = [15];

  startIndex: number;

  showEighthFinalTree: boolean = false;
  showQuarterFinalTree: boolean = false;
  showSemiFinalTree: boolean = false;

  competitors: Array<{ nationality: string, representation: string, rank: number }> = new Array<{ nationality: string, representation: string, rank: number }>(16);

  choosenLocationTree: Array<string> = new Array<string>(16);
  errorNoChoosenLocationTree: Array<string> = new Array<string>(16);

  choosenDatetimeTree: Array<string> = new Array<string>(16);
  errorNoChoosenDatetimeCompetitionTree: Array<string> = new Array<string>(16);

  errorClashingCompetitionsTree: Array<string> = new Array<string>(16);

  // Groups!
  teamsPerGroup: number;
  numberOfRounds: number;
  matchesPerGroup: number;
  groupBeginning: boolean = true;
  needTreeTimetable: boolean = false;
  groupPhaseFinished: boolean = false;
  finishedWithEnteringGroupPhase: boolean = false;
  //groupPhaseMatches: Array<GroupPhase>;

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

  groupDatetime: Array<{
    "groupNumber": number,
    "groupContent": Array<{
      "roundNumber": number,
      "roundContent":
      Array<{
        "index": number,
        "datetime": string
      }>
    }>
  }>;

  errorClashingCompetitionsGroup: Array<{
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
        score
      }>
    }>
  }>;
  errorNoTimetable: boolean = false;

  groupForResult: GroupCollection;


  // Finising
  timetableCreated: boolean = false;
  alertMessage: string;



  finishTimetableEntering() {
    this.router.navigate(['delegate']);
  }

  confirmGroupTreeTimetable() {
    // Tree also has to be entered!
    console.log("tree phase")
    this.startIndex = 8; // 8-12 is 1/4 of final!

    for (let i = this.startIndex; i < 16; i++) {
      if (!this.choosenDatetimeTree[i]) {
        this.errorNoTimetable = true;
        return;
      }
      if (!this.choosenLocationTree[i]) { // Brisi ovo!
        this.errorNoTimetable = true;
        return;
      }
    }

    // check of intersect between competition that are here
    for (let i = this.startIndex; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        if (this.choosenLocationTree[i] == this.choosenLocationTree[j]) {
          if (this.choosenDatetimeTree[i] == this.choosenDatetimeTree[j]) {
            this.errorClashingCompetitionsTree[i] = "Ista lokacija i datum";
            this.errorClashingCompetitionsTree[j] = "Ista lokacija i datum";
            return;
          }
        }
      }
    }
    /*
        for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
          for (let j = 0; j < this.numberOfRounds; j++) {
            for (let k = 0; k < this.matchesPerGroup; k++) {
    
              for (let t = this.startIndex; t < 16; t++) {
                if (this.choosenDatetimeTree[t] == this.groupDatetime[i].groupContent[j].roundContent[k].datetime &&
                  this.choosenLocationTree[t] == this.groupLocations[i].groupContent[j].roundContent[k].location) {
    
                  this.errorClashingCompetitionsTree[i] = "Poklapa se sa takmičenjem u grupnoj fazi!";
                  return;
                }
              }
    
            }
          }
        }
    */
    let copySportName = this.choosenCompetition.sportName;
    let copyDisciplineName = this.choosenCompetition.disciplineName;
    let copyGender = this.choosenCompetition.gender;
    let copyStartIndex = this.startIndex;
    let copyChoosenLocationTree = this.choosenLocationTree;
    let copyChoosenDatetimeTree = this.choosenDatetimeTree;

    let errorInOverlapingCompetitions: number = 0;
    console.log(copyStartIndex)
    for (let i = copyStartIndex; i < 16; i++) {
      this.alreadyTimetabledCompetitions.forEach(c => {
        if (this.choosenLocationTree[i] == c.location && this.choosenDatetimeTree[i] == c.datetime) {
          // error
          this.errorClashingCompetitionsTree[i] =
            "Takmičenje se poklapa sa [" + this.genders[c.gender] + "]" + c.sportName + " " + c.disciplineName;
          errorInOverlapingCompetitions += 1;
        }
      });

    }
    console.log(errorInOverlapingCompetitions)
    if (errorInOverlapingCompetitions > 0) {
      return;
    }

    for (let i = copyStartIndex; i < 16; i++) {
      // Everything is clear, enter!
      console.log(copySportName);
      console.log(copyDisciplineName);
      console.log(copyGender);
      console.log(copyChoosenDatetimeTree[i]);
      console.log(copyChoosenLocationTree[i]);
      let index: string = "tree";
      if (0 <= i && i <= 7) {
        index += " eighterFinal " + i;
      } else if (8 <= i && i <= 11) {
        index += " quarterFinal " + i;
      } else if (12 <= i && i <= 13) {
        index += " semiFinal " + i;
      } else if (i == 14) {
        index += " thirdPlace " + i;
      } else {
        index += " firstPlace " + i;
      }
      console.log(index);
      this.timetableService.addCompetitionService(
        copySportName, copyDisciplineName, copyGender,
        index, copyChoosenLocationTree[i], copyChoosenDatetimeTree[i]).subscribe(
          res => {
            console.log(res);
          })
      if (i == 15) {
        // End of ends!
        // scratch of result can be added
        console.log("I == 15")

        let treeArray: Array<{ "index": number, "player1": string, "nationality1": string, "player2": string, "nationality2": string, "score": string }> = []

        let numberOfMatches = 4;

        for (let j = copyStartIndex; j < (copyStartIndex + numberOfMatches); j++) {

          // RESI COMPETITORSE, oni su "" kad je sve od jednom, a kad se vracas iz programa oni postoje za ovaj for!
          //COMPETITORSKI SE MORAJU DOHVATITII ZBOG VRACANJA, tj ovo su tacno ti koji i treba da se dohvate, tj oni koji su prosli gupu 
          //NAJBOLJE DA ga ovaj push rezultat postavi kad dobije 1/4 a da ga ja dole dohvatim i time imam sve reseno za html

          treeArray.push({
            "index": j,
            "player1": "",
            "nationality1": "",
            "player2": "",
            "nationality2": "",
            "score": ""
          });
        }
        console.log(treeArray.length)
        this.resultService.addTreeToGroupResultCompetitionService(
          copySportName, copyDisciplineName, copyGender, treeArray).subscribe(
            res => {
              console.log(res);
              this.timetableCreated = true;
              this.alertMessage = "Raspored mečeva grupne i završne faze je dodat!";

              this.choosenCompetition = null;
              this.errorNoCompetition = "";

            })

      }
    }

  }

  confirmGroupTimetable() {
    console.log("Confirm gruop");
    this.errorNoTimetable = false;
    for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
      for (let j = 0; j < this.numberOfRounds; j++) {
        for (let k = 0; k < this.matchesPerGroup; k++) {
          this.errorClashingCompetitionsGroup[i].groupContent[j].roundContent[k].error = "";
        }
      }
    }


    if (this.groupBeginning) {
      return;
      // No effect without clicking randomize!
    }

    for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
      for (let j = 0; j < this.numberOfRounds; j++) {
        for (let k = 0; k < this.matchesPerGroup; k++) {
          if (!this.groupLocations[i].groupContent[j].roundContent[k].location) {
            this.errorNoTimetable = true;
            return;
          }
          if (!this.groupDatetime[i].groupContent[j].roundContent[k].datetime) {
            this.errorNoTimetable = true;
            return;
          }

        }
      }
    }



    console.log("All group entered!")
    for (let i1 = 0; i1 < this.choosenCompetition.groupNumber; i1++) {
      for (let j1 = 0; j1 < this.numberOfRounds; j1++) {
        for (let k1 = 0; k1 < this.matchesPerGroup; k1++) {
          for (let i2 = 0; i2 < this.choosenCompetition.groupNumber; i2++) {
            for (let j2 = 0; j2 < this.numberOfRounds; j2++) {
              for (let k2 = 0; k2 < this.matchesPerGroup; k2++) {
                if (i1 == i2 && j1 == j2 && k1 == k2) {
                  continue;
                }
                if (this.groupLocations[i1].groupContent[j1].roundContent[k1].location == this.groupLocations[i2].groupContent[j2].roundContent[k2].location
                  && this.groupDatetime[i1].groupContent[j1].roundContent[k1].datetime == this.groupDatetime[i2].groupContent[j2].roundContent[k2].datetime) {
                  console.log(i1, j1, k1, "#!#", i2, j2, k2)
                  this.errorClashingCompetitionsGroup[i1].groupContent[j1].roundContent[k1].error = "Ista lokacija i datum";
                  this.errorClashingCompetitionsGroup[i2].groupContent[j2].roundContent[k2].error = "Ista lokacija i datum";
                  return;
                }

              }
            }
          }
        }
      }
    }
    console.log("All group different!")
    if (this.needTreeTimetable == true) {
      console.log("Tree forming!")

      for (let i = 8; i < 16; i++) {
        if (!this.choosenDatetimeTree[i]) {
          this.errorNoTimetable = true;
          return;
        }
        if (!this.choosenLocationTree[i]) {
          this.errorNoTimetable = true;
          return;
        }
      }
      console.log("All tree entered!")

      // check of intersect between competition that are here
      for (let i = 8; i < 16; i++) {
        for (let j = i + 1; j < 16; j++) {
          if (this.choosenLocationTree[i] == this.choosenLocationTree[j]) {
            if (this.choosenDatetimeTree[i] == this.choosenDatetimeTree[j]) {
              this.errorClashingCompetitionsTree[i] = "Ista lokacija i datum";
              this.errorClashingCompetitionsTree[j] = "Ista lokacija i datum";
              return;
            }
          }
        }
      }
      console.log("All tree different!")

      for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
        for (let j = 0; j < this.numberOfRounds; j++) {
          for (let k = 0; k < this.matchesPerGroup; k++) {

            for (let t = 8; t < 16; t++) {
              if (this.choosenDatetimeTree[t] == this.groupDatetime[i].groupContent[j].roundContent[k].datetime &&
                this.choosenLocationTree[t] == this.groupLocations[i].groupContent[j].roundContent[k].location) {
                this.errorClashingCompetitionsGroup[i].groupContent[j].roundContent[k].error = "Poklapa se sa takmičenjem u završnoj fazi!"
                this.errorClashingCompetitionsTree[t] = "Poklapa se sa takmičenjem u grupnoj fazi!";
                return;
              }
            }

          }
        }
      }

      console.log("All on page different!")

    }

    console.log("No overlapping!")
    console.log(this.alreadyTimetabledCompetitions)
    let errorInOverlapingCompetitions: number = 0;
    for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
      for (let j = 0; j < this.numberOfRounds; j++) {
        for (let k = 0; k < this.matchesPerGroup; k++) {

          this.alreadyTimetabledCompetitions.forEach(c => {

            if (this.groupLocations[i].groupContent[j].roundContent[k].location == c.location
              && this.groupDatetime[i].groupContent[j].roundContent[k].datetime == c.datetime) {
              // error
              this.errorClashingCompetitionsGroup[i].groupContent[j].roundContent[k].error =
                "Meč se poklapa sa \n[" + this.genders[c.gender] + "] " + c.sportName;
              errorInOverlapingCompetitions += 1;
            }
          });

        }
      }
    }
    if (this.needTreeTimetable == true) {
      console.log(8)
      for (let i = 8; i < 16; i++) {
        this.alreadyTimetabledCompetitions.forEach(c => {
          if (this.choosenLocationTree[i] == c.location && this.choosenDatetimeTree[i] == c.datetime) {
            // error
            this.errorClashingCompetitionsTree[i] =
              "Meč se poklapa sa \n[" + this.genders[c.gender] + "] " + c.sportName;
            errorInOverlapingCompetitions += 1;
          }
        });

      }
    }

    console.log(errorInOverlapingCompetitions)
    if (errorInOverlapingCompetitions > 0) {
      return;
    }
    console.log("No already entered with same location and date!")
    console.log(this.groups);

    // create timetables
    let copySportName = this.choosenCompetition.sportName;
    let copyDisciplineName = this.choosenCompetition.disciplineName;
    let copyGender = this.choosenCompetition.gender;
    for (let i: number = 0; i < this.choosenCompetition.groupNumber; i++) {
      for (let j: number = 0; j < this.numberOfRounds; j++) {
        for (let k: number = 0; k < this.matchesPerGroup; k++) {
          let type: string = "group " + String(i) + " " + String(j) + " " + (k);
          console.log(type);
          this.timetableService.addCompetitionService(
            copySportName, copyDisciplineName, copyGender, type,
            this.groupLocations[i].groupContent[j].roundContent[k].location,
            this.groupDatetime[i].groupContent[j].roundContent[k].datetime).subscribe(
              res => {
                console.log(res);
              })

        }
      }
    }

    // add group matches

    for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
      for (let j = 0; j < this.numberOfRounds; j++) {
        let groupMatches: Array<TreeCollection> = new Array<TreeCollection>(this.matchesPerGroup);

        this.groups[i].groupContent[j].roundContent.forEach(rc => {
          rc.index
          groupMatches[rc.index] = {
            "index": rc.index,
            "player1": rc.representation1, "nationality1": rc.nationality1,
            "player2": rc.representation2, "nationality2": rc.nationality2,
            "score": ""
          }

        });

        this.groupService.addUserService(copySportName, copyGender, i, j, groupMatches).subscribe(
          res => {
            console.log(res);
          })
      }
    }

    if (this.needTreeTimetable == false) {
      this.resultService.postponeEnteringFinalTimetableService(
        copySportName, copyDisciplineName, copyGender
      ).subscribe(
        res => {
          console.log(res);
          this.timetableCreated = true;
          this.alertMessage = "Raspored mečeva grupne faze je dodat!";

          this.choosenCompetition = null;

        }
      )
      return;
    }
    console.log("Timetable for final has to be entered!");
    this.resultService.doneWithEnteringFinalTimetableService(
      copySportName, copyDisciplineName, copyGender
    ).subscribe(
      res => {
        this.finishedWithEnteringGroupPhase = true;
        console.log(res);
      }
    )

    this.confirmGroupTreeTimetable();

  }

  confirmTimetableForCompetition() {
    this.errorNoCompetition = null;
    this.errorClashingCompetitionsIndividual = "";
    this.errorNoChoosenDatetimeCompetitionIndividual = "";
    this.errorNoChoosenLocationIndividual = "";

    for (let i = 0; i < 16; i++) {
      this.errorNoChoosenLocationTree[i] = "";
      this.errorNoChoosenDatetimeCompetitionTree[i] = "";
      this.errorClashingCompetitionsTree[i] = "";
    }

    this.timetableCreated = false;
    this.alertMessage = "";

    if (!this.choosenCompetition) {
      this.errorNoCompetition = "Morate označiti željeno tekmičenje";
      return;
    }
    let noErrors: boolean = true;

    if (this.choosenCompetition.actAsSingle) {
      if (this.choosenCompetition.rankPlayers == false) {
        // MISSING ELEMENTS for INDIVIDUAL - JUST FINALS
        if (!this.choosenDatetimeIndividual) {
          this.errorNoChoosenDatetimeCompetitionIndividual = "Morate označiti vreme";
          noErrors = false;
        }
        if (!this.choosenLocationIndividual) { // Brisi ovo!
          this.errorNoChoosenLocationIndividual = "Morate označiti lokaciju";
          noErrors = false;
        }
      } else {
        // MISSING ELEMENTS for INDIVIDUAL - TREE
        for (let i = this.startIndex; i < 16; i++) {
          if (!this.choosenDatetimeTree[i]) {
            this.errorNoChoosenDatetimeCompetitionTree[i] = "Morate označiti vreme";
            noErrors = false;
          }
          if (!this.choosenLocationTree[i]) { // Brisi ovo!
            this.errorNoChoosenLocationTree[i] = "Morate označiti lokaciju";
            noErrors = false;
          }
        }
      }
    } else {

    }

    if (noErrors == false) {
      return;
    }
    // Everything is here, check if all fits requirements
    if (this.choosenCompetition.actAsSingle) {

      if (this.choosenCompetition.rankPlayers == false) {
        // Check date and time of this final
        console.log("Individual -> finale");
        this.timetableService.fetchByLocationAndDatetimeService(this.choosenLocationIndividual, this.choosenDatetimeIndividual).subscribe(
          (clashingCompetition: Competition) => {
            console.log(clashingCompetition)
            if (clashingCompetition) {
              // error
              this.errorClashingCompetitionsIndividual = "Takmičenje se poklapa sa ["
                + this.genders[clashingCompetition.gender] + "]"
                + clashingCompetition.sportName + " " + clashingCompetition.disciplineName;
              return;
            } else {
              console.log(this.choosenCompetition.sportName);
              console.log(this.choosenCompetition.disciplineName);
              console.log(this.choosenCompetition.gender);
              console.log(this.choosenDatetimeIndividual);
              console.log(this.choosenLocationIndividual)
              console.log("final")

              this.timetableService.addCompetitionService(
                this.choosenCompetition.sportName, this.choosenCompetition.disciplineName,
                this.choosenCompetition.gender, "final",
                this.choosenLocationIndividual, this.choosenDatetimeIndividual).subscribe(
                  res => {
                    console.log(res);
                    this.timetableCreated = true;
                    this.alertMessage = "Finale je dodato!";

                    let finalArray: Array<{ "nationality": string, "player": string, "score": string }> = []

                    this.choosenCompetition.participants.forEach(participant => {
                      finalArray.push({ "nationality": participant.nationality, "player": participant.representation, "score": "" });
                    });

                    this.resultService.addCompetitionService(
                      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
                      finalArray, null, null).subscribe(
                        res => {

                          console.log(res);
                          this.choosenCompetition = null;
                          this.errorNoCompetition = "";

                          this.minDatetimeValueIndividual = "";
                          this.maxDatetimeValueIndividual = "";

                          this.choosenDatetimeIndividual = "";
                          this.errorNoChoosenDatetimeCompetitionIndividual = "";

                          this.locations = null;
                          this.choosenLocationIndividual = "";
                          this.errorNoChoosenLocationIndividual = "";

                          this.errorClashingCompetitionsIndividual = "";
                        })

                  })
            }
          })

      } else {
        console.log("tree phase")
        // check of intersect between competition that are here
        for (let i = this.startIndex; i < 16; i++) {
          for (let j = i + 1; j < 16; j++) {
            if (this.choosenLocationTree[i] == this.choosenLocationTree[j]) {
              if (this.choosenDatetimeTree[i] == this.choosenDatetimeTree[j]) {
                this.errorClashingCompetitionsTree[i] = "Ista lokacija i datum";
                this.errorClashingCompetitionsTree[j] = "Ista lokacija i datum";
                return;
              }
            }
          }
        }
        let copyStartIndex = this.startIndex;
        let copyChoosenLocationTree = this.choosenLocationTree;
        let copyChoosenDatetimeTree = this.choosenDatetimeTree;

        let copySportName = this.choosenCompetition.sportName;
        let copyDisciplineName = this.choosenCompetition.disciplineName;
        let copyGender = this.choosenCompetition.gender;
        let errorInOverlapingCompetitions: number = 0;
        console.log(copyStartIndex)
        for (let i = copyStartIndex; i < 16; i++) {
          this.alreadyTimetabledCompetitions.forEach(c => {
            if (this.choosenLocationTree[i] == c.location && this.choosenDatetimeTree[i] == c.datetime) {
              // error
              this.errorClashingCompetitionsTree[i] = "Takmičenje se poklapa sa ["
                + this.genders[c.gender] + "]" + c.sportName + " " + c.disciplineName;
              errorInOverlapingCompetitions += 1;
            }
          });

        }
        console.log(errorInOverlapingCompetitions)
        if (errorInOverlapingCompetitions > 0) {
          return;
        }
        for (let i = copyStartIndex; i < 16; i++) {
          // Everything is clear, enter!
          console.log(copySportName);
          console.log(copyDisciplineName);
          console.log(copyGender);
          console.log(copyChoosenDatetimeTree[i]);
          console.log(copyChoosenLocationTree[i]);
          let index: string = "tree";
          if (0 <= i && i <= 7) {
            index += " eighterFinal " + i;
          } else if (8 <= i && i <= 11) {
            index += " quarterFinal " + i;
          } else if (12 <= i && i <= 13) {
            index += " semiFinal " + i;
          } else if (i == 14) {
            index += " thirdPlace " + i;
          } else {
            index += " firstPlace " + i;
          }
          console.log(index);
          this.timetableService.addCompetitionService(
            copySportName, copyDisciplineName, copyGender,
            index, copyChoosenLocationTree[i], copyChoosenDatetimeTree[i]).subscribe(
              res => {
                console.log(res);
              })
          if (i == 15) {
            // End of ends!
            // scratch of result can be added
            console.log("I == 15")

            let treeArray: Array<{ "index": number, "player1": string, "nationality1": string, "player2": string, "nationality2": string, "score": string }> = []
            let numberOfMatches = 8;
            if (this.startIndex == 8) {
              numberOfMatches = 4;
            }
            if (this.startIndex == 12) {
              numberOfMatches = 2;
            }

            for (let j = copyStartIndex; j < (copyStartIndex + numberOfMatches); j++) {

              treeArray.push({
                "index": j,
                "player1": this.competitors[this.indexesTree[j] - 1].representation,
                "nationality1": this.competitors[this.indexesTree[j] - 1].nationality,
                "player2": this.competitors[this.indexesTree[j] - 1 + numberOfMatches].representation,
                "nationality2": this.competitors[this.indexesTree[j] - 1 + numberOfMatches].nationality,
                "score": ""
              });
            }
            console.log(treeArray.length)
            this.resultService.addCompetitionService(
              copySportName, copyDisciplineName, copyGender,
              null, treeArray, null).subscribe(
                res => {
                  console.log(res);
                  this.timetableCreated = true;
                  this.alertMessage = "Raspored mečeva završne faze je dodat!";

                  this.choosenCompetition = null;
                  this.errorNoCompetition = "";

                  this.minDatetimeValueIndividual = "";
                  this.maxDatetimeValueIndividual = "";

                  this.locations = null;

                  for (let j = 0; j < 16; j++) {
                    this.choosenLocationTree[j] = "";
                    this.errorNoChoosenLocationTree[j] = "";
                    this.choosenDatetimeTree[j] = "";
                    this.errorNoChoosenDatetimeCompetitionTree[j] = "";
                    this.errorClashingCompetitionsTree[j] = "";
                  }

                  this.startIndex = null;
                  this.showEighthFinalTree = false;
                  this.showQuarterFinalTree = false;
                  this.showSemiFinalTree = false;
                  this.alreadyTimetabledCompetitions = [];
                })

          }
        }
      } // else
    } else {
      console.log("group phase")
      if (this.groupPhaseFinished == true) {
        this.confirmGroupTreeTimetable();
      } else {
        this.confirmGroupTimetable();
      }
    }
  }


  competitionIsChoosen() {
    this.errorNoCompetition = "";
    this.errorClashingCompetitionsIndividual = "";
    this.errorNoChoosenDatetimeCompetitionIndividual = "";
    this.errorNoChoosenLocationIndividual = "";

    this.choosenLocationIndividual = "";
    this.choosenDatetimeIndividual = "";

    this.showEighthFinalTree = false;
    this.showQuarterFinalTree = false;
    this.showSemiFinalTree = false;
    this.startIndex = null;
    this.competitors = new Array<{ nationality: string, representation: string, rank: number }>(16);

    this.alreadyTimetabledCompetitions = [];

    this.teamsPerGroup = null;
    this.numberOfRounds = null;
    this.matchesPerGroup = null;
    //this.groupPhaseMatches = null;
    this.groupLocations = null;
    this.groupDatetime = null;
    this.errorNoTimetable = false;
    this.errorClashingCompetitionsGroup = null;
    this.groups = null;
    this.groupBeginning = true;
    this.needTreeTimetable = false;
    this.groupPhaseFinished = false;
    this.finishedWithEnteringGroupPhase = false;


    for (let i = 0; i < 16; i++) {
      this.choosenLocationTree[i] = "";
      this.errorNoChoosenLocationTree[i] = "";
      this.choosenDatetimeTree[i] = "";
      this.errorNoChoosenDatetimeCompetitionTree[i] = "";
      this.errorClashingCompetitionsTree[i] = "";
    }

    this.timetableCreated = false;
    this.alertMessage = "";

    console.log(this.choosenCompetition.sportName + " " + this.choosenCompetition.disciplineName);
    console.log(this.choosenCompetition.begin);
    console.log(this.choosenCompetition.end);

    this.minDatetimeValueIndividual = this.choosenCompetition.begin + "T00:00";
    this.maxDatetimeValueIndividual = this.choosenCompetition.end + "T23:59";

    this.locations = this.choosenCompetition.possibleLocations;

    if (this.choosenCompetition.actAsSingle) {
      console.log("INDIVIDUAL")
      if (this.choosenCompetition.rankPlayers == false) {
        console.log("JUST FINAL")

      } else {
        console.log("TREE")
        this.timetableService.fetchAllTimetablesService().subscribe((timetables: Timetable[]) => { this.alreadyTimetabledCompetitions = timetables })

        console.log(this.choosenCompetition.participants.length);
        console.log(this.choosenCompetition.competitorsNumber);

        //this.competitors = this.choosenCompetition.participants;

        if (this.choosenCompetition.competitorsNumber == 16) {
          this.showEighthFinalTree = true;
          this.showQuarterFinalTree = true;
          this.showSemiFinalTree = true;
          this.startIndex = 0;

          for (let i = 1; i <= 16; i++) {
            this.competitors[i - 1] = this.choosenCompetition.participants.find(x => x.rank == i);
          }

        } else if (this.choosenCompetition.competitorsNumber == 8) {
          // Nije jos provereno
          this.showEighthFinalTree = false;
          this.showQuarterFinalTree = true;
          this.showSemiFinalTree = true;
          this.startIndex = 8;


          for (let i = 1; i <= 8; i++) {
            this.competitors[i - 1] = this.choosenCompetition.participants.find(x => x.rank == i);
          }

        } else {
          // Nije jos provereno
          // 4 competitors
          this.startIndex = 12;

          for (let i = 1; i <= 4; i++) {
            this.competitors[i - 1] = this.choosenCompetition.participants.find(x => x.rank == i);
          }

          this.showEighthFinalTree = false;
          this.showQuarterFinalTree = false;
          this.showSemiFinalTree = true;
        }
      }
    } else {
      console.log("TEAM -> group")
      // see if timetabledEndCompetition is false, if it is
      // see if the 

      this.timetableService.fetchAllTimetablesService().subscribe((timetables: Timetable[]) => { this.alreadyTimetabledCompetitions = timetables })

      console.log(this.choosenCompetition)
      this.teamsPerGroup = this.choosenCompetition.competitorsNumber / this.choosenCompetition.groupNumber;
      this.numberOfRounds = this.teamsPerGroup - 1;
      this.matchesPerGroup = this.teamsPerGroup / 2;

      console.log(this.numberOfRounds)
      console.log(this.teamsPerGroup)
      console.log(this.matchesPerGroup);

      //this.groupPhaseMatches = new Array<GroupPhase>(this.choosenCompetition.groupNumber * this.numberOfRounds);

      this.groupLocations = new Array<{ "groupNumber": number, "groupContent": Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "location": string }> }> }>(this.choosenCompetition.groupNumber)
      this.groupDatetime = new Array<{ "groupNumber": number, "groupContent": Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "datetime": string }> }> }>(this.choosenCompetition.groupNumber)
      this.errorClashingCompetitionsGroup = new Array<{ "groupNumber": number, "groupContent": Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "error": string }> }> }>(this.choosenCompetition.groupNumber)
      this.groups = new Array<{ "groupNumber": number, "groupContent": Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, nationality1: string, representation1: string, nationality2: string, representation2: string, score }> }> }>(this.choosenCompetition.groupNumber);


      for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
        console.log(i)
        this.groupLocations[i] = { "groupNumber": i, "groupContent": new Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "location": string }> }>(this.numberOfRounds) }
        this.groupDatetime[i] = { "groupNumber": i, "groupContent": new Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "datetime": string }> }>(this.numberOfRounds) }
        this.errorClashingCompetitionsGroup[i] = { "groupNumber": i, "groupContent": new Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, "error": string }> }>(this.numberOfRounds) }
        this.groups[i] = { "groupNumber": i, "groupContent": new Array<{ "roundNumber": number, "roundContent": Array<{ "index": number, nationality1: string, representation1: string, nationality2: string, representation2: string, score }> }>(this.numberOfRounds) }

        for (let j = 0; j < this.numberOfRounds; j++) {
          console.log(j)
          this.groupLocations[i].groupContent[j] = { "roundNumber": j, "roundContent": new Array<{ "index": number, "location": string }>(this.matchesPerGroup) }
          this.groupDatetime[i].groupContent[j] = { "roundNumber": j, "roundContent": new Array<{ "index": number, "datetime": string }>(this.matchesPerGroup) }
          this.errorClashingCompetitionsGroup[i].groupContent[j] = { "roundNumber": j, "roundContent": new Array<{ "index": number, "error": string }>(this.matchesPerGroup) }
          this.groups[i].groupContent[j] = { "roundNumber": j, "roundContent": new Array<{ "index": number, nationality1: string, representation1: string, nationality2: string, representation2: string, score }>(this.matchesPerGroup) }

          for (let k = 0; k < this.matchesPerGroup; k++) {
            this.groupLocations[i].groupContent[j].roundContent[k] = { "index": k, "location": "" };
            this.groupDatetime[i].groupContent[j].roundContent[k] = { "index": k, "datetime": "" };
            this.errorClashingCompetitionsGroup[i].groupContent[j].roundContent[k] = { "index": k, "error": "" };
            this.groups[i].groupContent[j].roundContent[k] = { "index": k, "nationality1": "", "representation1": "", "nationality2": "", "representation2": "", "score": "" };
          }

        }

      }
      console.log(this.groups);
      console.log(this.groupLocations);
      console.log(this.groupDatetime);


    }

  }


  randomDivideTeamsToGroups() {

    let teams: Array<{ nationality: string, representation: string, rank: number }> = [];

    this.choosenCompetition.participants.forEach(p => {
      teams.push({ nationality: p.nationality, representation: p.representation, rank: p.rank })
    });

    console.log(this.choosenCompetition.participants);

    // https://codepen.io/cdellosa/pen/wWkKKP

    let currentIndex = teams.length;

    while (0 !== currentIndex) {


      var randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      var temporaryValue = teams[currentIndex];
      teams[currentIndex] = teams[randomIndex];
      teams[randomIndex] = temporaryValue;
    }

    var robin = require('roundrobin');
    let roundRobinGroupsIndexes = robin(this.teamsPerGroup);

    for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
      for (let j = 0; j < this.numberOfRounds; j++) {
        for (let k = 0; k < this.matchesPerGroup; k++) {
          console.log(i, j, k)
          console.log(roundRobinGroupsIndexes[j])

          this.groups[i].groupContent[j].roundContent[k].nationality1 = teams[roundRobinGroupsIndexes[j][k][0] - 1 + (i * this.teamsPerGroup)].nationality;
          this.groups[i].groupContent[j].roundContent[k].representation1 = teams[roundRobinGroupsIndexes[j][k][0] - 1 + (i * this.teamsPerGroup)].representation;

          this.groups[i].groupContent[j].roundContent[k].nationality2 = teams[roundRobinGroupsIndexes[j][k][1] - 1 + (i * this.teamsPerGroup)].nationality;
          this.groups[i].groupContent[j].roundContent[k].representation2 = teams[roundRobinGroupsIndexes[j][k][1] - 1 + (i * this.teamsPerGroup)].representation;

        }
      }
    }

    // enter in general results 
    let finalGroupResults: Array<GroupCollection> = new Array<GroupCollection>(this.choosenCompetition.groupNumber);

    for (let i = 0; i < this.choosenCompetition.groupNumber; i++) {
      let teamsInGroup: Array<TeamResultInGroup> = new Array<TeamResultInGroup>(this.teamsPerGroup);
      for (let j = 0; j < this.teamsPerGroup; j++) {

        teamsInGroup[j] = {
          "nationality": teams[j + i * (this.teamsPerGroup)].nationality,
          "playedPoints": 0, "points": 0,
          "team": teams[j + i * (this.teamsPerGroup)].representation
        }

      }
      finalGroupResults[i] = { "groupNumber": i, "resultInGroups": teamsInGroup };
    }
    this.resultService.addCompetitionService(
      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender,
      null, null, finalGroupResults).subscribe(
        res => {
          console.log(res)
        });


    console.log(this.groups);
    this.groupBeginning = false
  }

}
