import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionService } from '../competition.service';
import { Competition } from '../models/competition';
import { Timetable } from '../models/timetable';
import { User } from '../models/user';
import { ResultService } from '../result.service';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-enter-timetable',
  templateUrl: './enter-timetable.component.html',
  styleUrls: ['./enter-timetable.component.css']
})
export class EnterTimetableComponent implements OnInit {

  constructor(private competitionService: CompetitionService, private router: Router, private timetableService: TimetableService, private resultService: ResultService) { }

  ngOnInit(): void {
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


  timetableCreated: boolean = false;
  alertMessage: string;

  finishTimetableEntering() {
    this.router.navigate(['delegate']);
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
    }

  }

}
