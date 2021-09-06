import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from '../competition.service';
import { Competition } from '../models/competition';
import { Discipline } from '../models/discipline';
import { NationalTeam } from '../models/nationalTeam';
import { Sport } from '../models/sport';
import { User } from '../models/user';
import { NationalTeamsService } from '../national-teams.service';
import { SportService } from '../sport.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-enter-competitions',
  templateUrl: './enter-competitions.component.html',
  styleUrls: ['./enter-competitions.component.css']
})
export class EnterCompetitionsComponent implements OnInit {

  constructor(private router: Router,
    private sportService: SportService,
    private userService: UserService,
    private nationalTeamsService: NationalTeamsService,
    private competitionService: CompetitionService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sportService.fetchAllSportsService().subscribe((sports: Sport[]) => {
      this.sports = sports;
    });
    this.activatedRoute.data.subscribe(d => {
      d.breadcrumbs.forEach((b, i) => {
        if (i == 0) {
          this.breadcrumbs = b;
        } else {
          this.breadcrumbs += " > " + b;
        }
      });
    })
  }
  breadcrumbs: string;
  sports: Sport[];

  disciplines: Discipline[];
  hasDisciplines: boolean = false;

  allPossibleLocations: string[];

  delegates: User[];

  nationalTeams: Array<{ "nationality": string, "representation": string, "choosen": boolean, "rank": number }>;
  hasNationalTeams: boolean = false;

  genders = [{ "serbia": "Muški", "english": "man" }, { "serbia": "Ženski", "english": "woman" }];

  showGender: boolean = false;
  showFormForCompetition: boolean = false;
  showPlayers: boolean = false;

  choosenSport: Sport;
  errorNoSport: string;

  choosenDiscipline: Discipline;
  errorNoDiscipline: string;

  choosenGender: string;
  errorNoGender: string;

  choosenLocations: string[];
  //location: string;
  errorNoLocations: string;

  dateCompetitionBegin: string;
  errorNoDateCompetitionBegin: string;

  dateCompetitionEnd: string;
  errorNoDateCompetitionEnd: string;

  choosenDelegate: User;
  errorNoChoosenDelegate: string;

  groupNumber: number;
  errorGroupNumber: string;

  representativesNumberType: string;
  exactRepresentativesNumber: number;
  upperLimitRepresentativesNumber: number;
  errorRepresentativesNumber: string;

  roundsNumber: number;
  errorRoundsNumber: string;

  resultType: string;
  errorResultType: string;

  resultFormat: string;
  errorResultFormat: string;

  rankPlayers: boolean = false;

  additionalComment: string;

  errorNumberOfChoosenPlayers: string;

  competitionCreated: boolean = false;
  alertMessage: string;

  finishCompetitionsFormation() {
    this.router.navigate(['organizer']);
  }

  confirmCompetition() {
    console.log('confirm');

    this.errorNoSport = null;
    this.errorNoDiscipline = null;
    this.errorNoGender = null;
    this.errorNoLocations = null;
    this.errorNoDateCompetitionBegin = null;
    this.errorNoDateCompetitionEnd = null;
    this.errorNoChoosenDelegate = null;
    this.errorGroupNumber = null;
    this.errorRepresentativesNumber = null;
    this.errorRoundsNumber = null;
    this.errorResultType = null;
    this.errorResultFormat = null;
    this.errorNumberOfChoosenPlayers = null;

    if (!this.choosenSport) {
      this.errorNoSport = "Izaberite!";
      return;
    }
    if (this.hasDisciplines && !this.choosenDiscipline) {
      this.errorNoDiscipline = "Izaberite!";
      return;
    }

    if (this.showGender && !this.choosenGender) {
      this.errorNoGender = "Izaberite!"
      return;
    }

    let noErrors: boolean = true;

    if (!this.choosenLocations) {
      this.errorNoLocations = "Izaberite!"
      console.log(this.choosenLocations);
      noErrors = false;
    }
    if (!this.dateCompetitionBegin) {
      this.errorNoDateCompetitionBegin = "Označite!"
      console.log(noErrors);
      noErrors = false;
    }
    if (!this.dateCompetitionEnd) {
      this.errorNoDateCompetitionEnd = "Označite!"
      console.log(noErrors);
      noErrors = false;
    }
    if (!this.choosenDelegate) {
      this.errorNoChoosenDelegate = "Izaberite!"
      console.log(noErrors);
      noErrors = false;
    }
    if (!this.hasDisciplines && !this.groupNumber) {
      this.errorGroupNumber = "Unesite!"
      console.log(noErrors);
      noErrors = false;
    }
    if (!this.representativesNumberType) {
      this.errorRepresentativesNumber = "Označite!"
      console.log(noErrors);
      noErrors = false;
    }
    if (this.representativesNumberType == "exactNumber" && !this.exactRepresentativesNumber) {
      this.errorRepresentativesNumber = "Unesite!"
      console.log(noErrors);
      noErrors = false;
    }
    if (this.representativesNumberType == "rangeNumber" && !this.upperLimitRepresentativesNumber) {
      this.errorRepresentativesNumber = "Unesite broj!"
      console.log(noErrors);
      noErrors = false;
    }
    if (this.hasDisciplines && !this.roundsNumber) {
      this.errorRoundsNumber = "Označite!"
      console.log(noErrors);
      noErrors = false;
    }
    if (!this.resultType) {
      this.errorResultType = "Označite!"
      console.log(noErrors);
      noErrors = false;
    }
    if (!this.resultFormat) {
      this.errorResultFormat = "Označite!"
      console.log(noErrors);
      noErrors = false;
    }

    if (noErrors == false) {
      return;
    }
    /*
    var d1 = Date.parse(this.dateCompetitionBegin);
    var d2 = Date.parse(this.dateCompetitionEnd);
    if (d1 > d2) {
      console.log("Error!");
    }
    */
    if (this.dateCompetitionBegin > this.dateCompetitionEnd) {
      this.errorNoDateCompetitionBegin = "Datum početka je posle datuma kraja!"
      return;
    }

    console.log(this.choosenSport.name);
    console.log(this.choosenDiscipline);
    console.log(this.choosenGender);

    console.log(this.choosenLocations);
    console.log(this.dateCompetitionBegin);
    console.log(this.dateCompetitionEnd);


    console.log(this.groupNumber);
    console.log(this.representativesNumberType);
    console.log(this.exactRepresentativesNumber + " # " + this.upperLimitRepresentativesNumber);
    console.log(this.roundsNumber);
    console.log(this.resultType);
    console.log(this.resultFormat);
    console.log(this.rankPlayers);
    if (!this.additionalComment) {
      this.additionalComment = "";
    }
    console.log(this.additionalComment);

    if (this.representativesNumberType == "exactNumber") {
      console.log(this.nationalTeams.filter(x => x.choosen == true).length + " - " + this.exactRepresentativesNumber);

      if (this.nationalTeams.filter(x => x.choosen == true).length != this.exactRepresentativesNumber) {
        this.errorNumberOfChoosenPlayers = "Izabrani broj mora biti jednak " + this.exactRepresentativesNumber;
        return;
      }
    }

    if (this.representativesNumberType == "rangeNumber") {
      console.log(this.nationalTeams.filter(x => x.choosen == true).length + " > " + this.upperLimitRepresentativesNumber);
      if (this.nationalTeams.filter(x => x.choosen == true).length > this.upperLimitRepresentativesNumber) {
        this.errorNumberOfChoosenPlayers = "Izabrani broj mora biti manji od " + this.upperLimitRepresentativesNumber;
        return;
      }
    }

    if (this.rankPlayers == true) {

      if (this.representativesNumberType == "exactNumber") {
        console.log(this.nationalTeams.filter(x => (x.choosen == true && x.rank != null)).length + " - " + this.exactRepresentativesNumber);

        if (this.nationalTeams.filter(x => (x.choosen == true && x.rank != null)).length != this.exactRepresentativesNumber) {
          this.errorNumberOfChoosenPlayers = "Morate označiti redni broj svih nosilaca";
          return;
        }
      }

      if (this.representativesNumberType == "rangeNumber") {
        console.log(this.nationalTeams.filter(x => (x.choosen == true && x.rank != null)).length + " > " + this.upperLimitRepresentativesNumber);
        if (this.nationalTeams.filter(x => (x.choosen == true && x.rank != null)).length > this.upperLimitRepresentativesNumber) {
          this.errorNumberOfChoosenPlayers = "Morate označiti redni broj svih nosilaca";
          return;
        }
      }

    }


    let choosenNationalTeams: Array<{ "nationality": string, "representation": string, "rank": number }> = [];
    this.nationalTeams.filter(x => x.choosen == true).forEach(nt => {
      choosenNationalTeams.push({ "nationality": nt.nationality, "representation": nt.representation, "rank": nt.rank })
    });

    // create competition

    // These fields are different from sports with and without disciplines
    // these values are for no-discipline-sports
    let disciplineName: string = null;
    let initiallySingleDiscipline: boolean = false;
    let actAsSingle: boolean = false;
    let groupNumber: number = this.groupNumber;
    let roundsNumber: number = 0;
    if (this.choosenDiscipline != null) {
      disciplineName = this.choosenDiscipline.disciplineName;
      initiallySingleDiscipline = this.choosenDiscipline.single;
      actAsSingle = true;
      groupNumber = 0;
      roundsNumber = this.roundsNumber;
    }
    this.competitionService.addCompetitionService(
      this.choosenSport.name,
      disciplineName,
      initiallySingleDiscipline,
      actAsSingle,
      this.choosenGender,

      this.choosenLocations,
      this.dateCompetitionBegin,
      this.dateCompetitionEnd,
      this.choosenDelegate.username,

      groupNumber,
      choosenNationalTeams.length,

      roundsNumber,

      this.resultType,
      this.resultFormat,
      this.rankPlayers,
      this.additionalComment,

      choosenNationalTeams).subscribe(res => {

        console.log(res);

        this.competitionCreated = true;
        this.alertMessage = "Takmičenje je dodato!";

        this.disciplines = null;
        this.allPossibleLocations = null;
        this.hasDisciplines = null;
        this.delegates = null;
        this.nationalTeams = null;
        this.hasNationalTeams = null;
        this.showGender = null;
        this.showFormForCompetition = null;
        this.showPlayers = null;
        this.choosenSport = null;
        this.errorNoSport = null;
        this.choosenDiscipline = null;
        this.errorNoDiscipline = null;
        this.choosenGender = null;
        this.errorNoGender = null;
        this.choosenLocations = null;
        this.errorNoLocations = null;
        this.dateCompetitionBegin = null;
        this.errorNoDateCompetitionBegin = null;
        this.dateCompetitionEnd = null;
        this.errorNoDateCompetitionEnd = null;
        this.choosenDelegate = null;
        this.errorNoChoosenDelegate = null;
        this.groupNumber = null;
        this.errorGroupNumber = null;
        this.representativesNumberType = null;
        this.exactRepresentativesNumber = null;
        this.upperLimitRepresentativesNumber = null;
        this.errorRepresentativesNumber = null;
        this.roundsNumber = null;
        this.errorRoundsNumber = null;
        this.resultType = null;
        this.errorResultType = null;
        this.resultFormat = null;
        this.errorResultFormat = null;
        this.rankPlayers = false;
        this.additionalComment = null;
        this.errorNumberOfChoosenPlayers = null;

      })

  }

  sportIsChoosen() {
    this.errorNoSport = null;
    this.errorNoDiscipline = null;
    this.errorNoGender = null;
    this.errorNoLocations = null;
    this.errorNoDateCompetitionBegin = null;
    this.errorNoDateCompetitionEnd = null;
    this.errorNoChoosenDelegate = null;
    this.errorGroupNumber = null;
    this.errorRepresentativesNumber = null;
    this.errorRoundsNumber = null;
    this.errorResultType = null;
    this.errorResultFormat = null;
    this.errorNumberOfChoosenPlayers = null;

    this.choosenDiscipline = null;
    this.showGender = false;
    this.choosenGender = "";
    this.showFormForCompetition = false;
    this.showPlayers = false;

    this.choosenLocations = null;
    this.dateCompetitionBegin = null;
    this.dateCompetitionEnd = null;
    this.choosenDelegate = null;
    this.groupNumber = null;
    this.representativesNumberType = null;
    this.exactRepresentativesNumber = null;
    this.upperLimitRepresentativesNumber = null;
    this.roundsNumber = null;
    this.resultType = null;
    this.resultFormat = null;
    this.rankPlayers = false;
    this.additionalComment = null;


    this.competitionCreated = false;
    this.alertMessage = "";

    this.disciplines = this.choosenSport.disciplines;
    this.allPossibleLocations = this.choosenSport.possibleLocations;
    //console.log(this.disciplines);
    if (this.disciplines[0].disciplineName == null) {
      this.hasDisciplines = false;
      this.showGender = true;
    } else {
      this.hasDisciplines = true;
    }

    this.userService.fetchByTypeService("delegate").subscribe((delegates: User[]) => {
      console.log(delegates);
      this.delegates = [];
      // check if delegates has less than 3 competitions
      this.competitionService.fetchAllCompetitionsService().subscribe((competitions: Competition[]) => {
        delegates.forEach(d => {
          if (competitions.filter(x => x.delegate == d.username).length < 3) {
            this.delegates.push(d);
          }
        });
      })
    });

  }

  disciplineIsChoosen() {
    this.errorNoSport = null;
    this.errorNoDiscipline = null;
    this.errorNoGender = null;
    this.errorNoLocations = null;
    this.errorNoDateCompetitionBegin = null;
    this.errorNoDateCompetitionEnd = null;
    this.errorNoChoosenDelegate = null;
    this.errorGroupNumber = null;
    this.errorRepresentativesNumber = null;
    this.errorRoundsNumber = null;
    this.errorResultType = null;
    this.errorResultFormat = null;
    this.errorNumberOfChoosenPlayers = null;

    this.choosenGender = "";
    this.showFormForCompetition = false;
    this.showPlayers = false;

    this.choosenLocations = null;
    this.dateCompetitionBegin = null;
    this.dateCompetitionEnd = null;
    this.choosenDelegate = null;
    this.groupNumber = null;
    this.representativesNumberType = null;
    this.exactRepresentativesNumber = null;
    this.upperLimitRepresentativesNumber = null;
    this.roundsNumber = null;
    this.resultType = null;
    this.resultFormat = null;
    this.rankPlayers = false;
    this.additionalComment = null;

    this.competitionCreated = false;
    this.alertMessage = "";

    this.showGender = true;

  }


  genderIsChoosen() {
    this.errorNoSport = null;
    this.errorNoDiscipline = null;
    this.errorNoGender = null;
    this.errorNoLocations = null;
    this.errorNoDateCompetitionBegin = null;
    this.errorNoDateCompetitionEnd = null;
    this.errorNoChoosenDelegate = null;
    this.errorGroupNumber = null;
    this.errorRepresentativesNumber = null;
    this.errorRoundsNumber = null;
    this.errorResultType = null;
    this.errorResultFormat = null;
    this.errorNumberOfChoosenPlayers = null;

    this.choosenLocations = null;
    this.dateCompetitionBegin = null;
    this.dateCompetitionEnd = null;
    this.choosenDelegate = null;
    this.groupNumber = null;
    this.representativesNumberType = null;
    this.exactRepresentativesNumber = null;
    this.upperLimitRepresentativesNumber = null;
    this.roundsNumber = null;
    this.resultType = null;
    this.resultFormat = null;
    this.rankPlayers = false;
    this.additionalComment = null;

    this.competitionCreated = false;
    this.alertMessage = "";

    this.showFormForCompetition = true;
    this.showPlayers = true;

    console.log(this.choosenSport.name)
    console.log(this.choosenDiscipline)

    if (this.choosenDiscipline == null) {
      console.log("NO discipline for this sport!")
      console.log(this.choosenDiscipline)
      console.log(this.choosenGender)
      this.nationalTeamsService.fetchBySportDisciplineAndGenderService(
        this.choosenSport.name, null, this.choosenGender).subscribe(
          (nationalTeams: NationalTeam[]) => {
            console.log(nationalTeams)

            this.nationalTeams = [];

            nationalTeams.forEach(nt => {
              let representation: string = "[";
              nt.players.forEach(p => {
                representation += p/*.substr(p.indexOf(' ') + 1)*/ + "; ";
              });
              representation = representation.substring(0, representation.length - 2) + "]";
              this.nationalTeams.push({ "nationality": nt.nationality, "representation": representation, "choosen": false, "rank": null })
            });

            if (this.nationalTeams.length > 0) {
              this.hasNationalTeams = true;
            } else {
              this.hasNationalTeams = false;
            }
            console.log(this.hasNationalTeams)
          })

    } else {
      console.log(this.choosenDiscipline)
      console.log(this.choosenGender)
      this.nationalTeamsService.fetchBySportDisciplineAndGenderService(
        this.choosenSport.name, this.choosenDiscipline.disciplineName, this.choosenGender).subscribe(
          (nationalTeams: NationalTeam[]) => {
            if (this.choosenDiscipline.single == true) {
              this.nationalTeams = [];

              nationalTeams.forEach(nt => {

                nt.players.forEach(p => {
                  this.nationalTeams.push({ "nationality": nt.nationality, "representation": String(p), "choosen": false, "rank": null })
                });

              });
            } else {
              this.nationalTeams = [];

              nationalTeams.forEach(nt => {
                let representation: string = "[";
                nt.players.forEach(p => {
                  representation += p/*.substr(p.indexOf(' ') + 1)*/ + "; ";
                });
                representation = representation.substring(0, representation.length - 2) + "]";
                this.nationalTeams.push({ "nationality": nt.nationality, "representation": representation, "choosen": false, "rank": null })
              });

            }

            if (this.nationalTeams.length > 0) {
              this.hasNationalTeams = true;
            } else {
              this.hasNationalTeams = false;
            }

            console.log(this.hasNationalTeams)
          })
    }
  }

}
