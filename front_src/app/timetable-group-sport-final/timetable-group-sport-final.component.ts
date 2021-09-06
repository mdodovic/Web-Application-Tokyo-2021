import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Competition } from '../models/competition';
import { Result } from '../models/result';
import { Timetable } from '../models/timetable';
import { ResultService } from '../result.service';
import { TimetableService } from '../timetable.service';

@Component({
  selector: 'app-timetable-group-sport-final',
  templateUrl: './timetable-group-sport-final.component.html',
  styleUrls: ['./timetable-group-sport-final.component.css']
})
export class TimetableGroupSportFinalComponent implements OnInit {

  constructor(
    private timetableService: TimetableService,
    private resultService: ResultService,
    private router: Router,
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

    this.choosenCompetition = JSON.parse(localStorage.getItem('competitionForTimetabling'));

    this.locations = this.choosenCompetition.possibleLocations;
    for (let i = 0; i < 16; i++) {
      this.choosenLocationTree[i] = "";
      this.choosenDatetimeTree[i] = "";
    }

    this.minDatetimeValueIndividual = this.choosenCompetition.begin + "T00:00";
    this.maxDatetimeValueIndividual = this.choosenCompetition.end + "T23:59";
    this.showQuarterFinalTree = false;
    this.competitors =
      new Array<{ "player1": string, "nationality1": string, "player2": string, "nationality2": string, "score": string }>(16);
    this.timetableCreated = false;
    this.alertMessage = "";

    this.timetableService.fetchAllTimetablesService().subscribe((timetables: Timetable[]) => {
      this.alreadyTimetabledCompetitions = timetables
      console.log(this.alreadyTimetabledCompetitions);
      this.resultService.fetchBySportDisciplineAndGenderService(
        this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender).subscribe(
          (result: Result) => {
            console.log(result);

            result.tree.forEach(treeElement => {

              this.competitors[treeElement.index] = {
                "nationality1": treeElement.nationality1,
                "nationality2": treeElement.nationality2,
                "player1": treeElement.nationality2,
                "player2": treeElement.nationality1,
                "score": ""
              }

            });

            this.showQuarterFinalTree = true;
            this.showSemiFinalTree = true;


          })

    })

  }


  breadcrumbs: string;

  choosenCompetition: Competition;

  minDatetimeValueIndividual: string; // used for dates in general, for all 3 cathegories
  maxDatetimeValueIndividual: string; // used for dates in general, for all 3 cathegories

  alreadyTimetabledCompetitions: Timetable[];

  genders: { [id: string]: string; } = {
    "man": "Muškarci", "woman": "Žene"
  }

  locations: string[];

  indexesTree: number[] = [1, 5, 3, 7, 2, 6, 4, 8, 1, 3, 2, 4, 1, 2];
  eighthFinalTreeArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7];
  quarterFinalTreeArray: number[] = [8, 9, 10, 11];
  semiFinalTreeArray: number[] = [12, 13];
  thirdPlaceTreeArray: number[] = [14];
  firstPlaceTreeArray: number[] = [15];

  showEighthFinalTree: boolean = false;
  showQuarterFinalTree: boolean = false;
  showSemiFinalTree: boolean = false;

  competitors: Array<{ "player1": string, "nationality1": string, "player2": string, "nationality2": string, "score": string }> =
    new Array<{ "player1": string, "nationality1": string, "player2": string, "nationality2": string, "score": string }>(16);

  choosenLocationTree: Array<string> = new Array<string>(16);

  choosenDatetimeTree: Array<string> = new Array<string>(16);

  errorClashingCompetitionsTree: Array<string> = new Array<string>(16);

  startIndex: number;
  errorNoTimetable: boolean = false;

  timetableCreated: boolean = false;
  alertMessage: string;


  confirmTimetableForCompetition() {

    console.log("tree phase")
    this.startIndex = 8; // 8-12 is 1/4 of final!
    this.errorNoTimetable = false;

    this.timetableCreated = false;
    this.alertMessage = "";

    for (let i = 0; i < 16; i++) {
      this.errorClashingCompetitionsTree[i] = "";
    }




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
            "Takmičenje se poklapa sa [" + this.genders[c.gender] + "]" + c.sportName;
          if (c.disciplineName != null) {
            this.errorClashingCompetitionsTree[i] += " " + c.disciplineName;
          }
          errorInOverlapingCompetitions += 1;
        }
      });

    }
    console.log(errorInOverlapingCompetitions)
    if (errorInOverlapingCompetitions > 0) {
      return;
    }

    this.resultService.doneWithEnteringFinalTimetableAfterGroupPhaseService(
      this.choosenCompetition.sportName, this.choosenCompetition.disciplineName, this.choosenCompetition.gender).subscribe(
        res => {
          console.log(res);
        })


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

    }

    this.timetableCreated = true;
    this.alertMessage = "Raspored mečeva završne faze je dodat!";

  }

  finishWithEnteringTimetable() {
    this.router.navigate(['enter-results']);
  }

}
