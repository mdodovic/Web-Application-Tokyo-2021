import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discipline } from '../models/discipline';
import { Sport } from '../models/sport';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-enter-competitions',
  templateUrl: './enter-competitions.component.html',
  styleUrls: ['./enter-competitions.component.css']
})
export class EnterCompetitionsComponent implements OnInit {

  constructor(private router: Router, private sportService: SportService) { }

  ngOnInit(): void {
    this.sportService.fetchAllSportsService().subscribe((sports: Sport[]) => {
      this.sports = sports;
    });
  }

  sports: Sport[];
  disciplines: Discipline[];
  hasDisciplines: boolean = false;
  genders = [{ "serbia": "Muški", "english": "man" }, { "serbia": "Ženski", "english": "woman" }];
  showGender: boolean = false;
  showFormForCompetition: boolean = false;

  choosenSport: Sport;
  errorNoSport: string;

  choosenDiscipline: Discipline;
  errorNoDiscipline: string;

  choosenGender: string;
  errorNoGender: string;

  groupNumber: number;
  errorGroupNumber: string;

  competitionCreated: boolean = false;
  alertMessage: string;

  finishCompetitionsFormation() {
    this.router.navigate(['organizer']);
  }

  confirmCompetition() {
    console.log('confirm');
  }

  sportIsChoosen() {
    console.log("Sport is choosen")
    this.errorNoSport = "";
    this.errorNoDiscipline = "";
    this.errorNoGender = "";

    this.choosenDiscipline = null;
    this.showGender = false;
    this.choosenGender = "";
    this.showFormForCompetition = false;

    this.competitionCreated = false;
    this.alertMessage = "";

    this.disciplines = this.choosenSport.disciplines;
    //console.log(this.disciplines);
    if (this.disciplines[0].disciplineName == null) {
      this.hasDisciplines = false;
      this.showGender = true;
    } else {
      this.hasDisciplines = true;
    }


  }

  disciplineIsChoosen() {
    this.errorNoSport = "";
    this.errorNoDiscipline = "";
    this.errorNoGender = "";
    this.choosenGender = "";
    this.showFormForCompetition = false;
    this.competitionCreated = false;
    this.alertMessage = "";

    this.showGender = true;

  }


  genderIsChoosen() {
    this.errorNoSport = "";
    this.errorNoDiscipline = "";
    this.errorNoGender = "";
    this.competitionCreated = false;
    this.alertMessage = "";

    this.showFormForCompetition = true;

    /*
        // Let's fetch players {sport, discipline, gender}
        console.log(this.choosenSport.name)
        console.log(this.choosenTeamDiscipline)
    
        if (this.choosenTeamDiscipline == null) {
          console.log("NO discipline for this sport!")
          console.log(this.choosenTeamDiscipline)
          console.log(this.choosenGender)
          console.log(this.nationalLeader.nationality);
          this.playerService.fetchByNationalitySportDisciplineAndGenderService(
            this.nationalLeader.nationality, this.choosenTeamSport.name, null, this.choosenGender).subscribe(
              (players: Player[]) => {
                console.log(players)
                this.teamPlayers = players;
                if (this.teamPlayers.length > 0) {
                  this.hasPlayersForTeam = true;
                } else {
                  this.hasPlayersForTeam = false;
                }
              })
    
        } else {
          console.log(this.choosenTeamDiscipline)
          console.log(this.choosenGender)
          console.log(this.nationalLeader.nationality);
          this.playerService.fetchByNationalitySportDisciplineAndGenderService(
            this.nationalLeader.nationality, this.choosenTeamSport.name, this.choosenTeamDiscipline.disciplineName, this.choosenGender).subscribe(
              (players: Player[]) => {
                console.log(players)
                this.teamPlayers = players;
                if (this.teamPlayers.length > 0) {
                  this.hasPlayersForTeam = true;
                } else {
                  this.hasPlayersForTeam = false;
                }
              })
        }
    */
  }

}
