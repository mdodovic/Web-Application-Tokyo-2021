import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Discipline } from '../models/discipline';
import { NationalTeam } from '../models/nationalTeam';
import { Player } from '../models/player';
import { Sport } from '../models/sport';
import { User } from '../models/user';
import { NationalTeamsService } from '../national-teams.service';
import { PlayerService } from '../player.service';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-players-applications',
  templateUrl: './players-applications.component.html',
  styleUrls: ['./players-applications.component.css']
})
export class PlayersApplicationsComponent implements OnInit {

  constructor(
    private router: Router,
    private sportService: SportService,
    private playerService: PlayerService,
    private nationalTeamsService: NationalTeamsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.nationalLeader = JSON.parse(localStorage.getItem('loggedInUser'));

    this.sportService.fetchAllSportsService().subscribe((sports: Sport[]) => {
      this.sports = sports;
    })
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
  nationalLeader: User;

  sports: Sport[];

  firstname: string;
  errorFirstname: string;

  lastname: string;
  errorLastname: string;

  gender: string;
  errorGender: string;

  disciplines: Discipline[];
  hasDisciplines: boolean = false;
  choosenSport: Sport;
  choosenDiscipline: string[];

  errorNoSport: string;
  errorNoDiscipline: string;

  addedPlayer: boolean = false;
  alertMessage: string;

  finishPlayersApplications() {
    this.router.navigate(['national-leader']);
  }

  confirmPlayer() {
    this.errorFirstname = "";
    this.errorLastname = ""
    this.errorGender = "";
    this.errorNoSport = "";
    this.errorNoDiscipline = "";
    this.addedPlayer = false;

    let noErrors: boolean = true;

    if (!this.firstname) {
      this.errorFirstname = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.lastname) {
      this.errorLastname = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.gender) {
      this.errorGender = "Obavezno polje!"
      noErrors = false;
    }

    if (!this.choosenSport) {
      this.errorNoSport = "Morate izabrati sport!";
      return;
    }
    if (this.hasDisciplines && !this.choosenDiscipline) {
      this.errorNoDiscipline = "Morate izabrati bar jednu disciplinu";
      return;
    }
    if (noErrors == false) {
      return;
    }

    console.log(this.firstname)
    console.log(this.lastname)
    console.log(this.gender)
    console.log(this.choosenSport)
    if (!this.hasDisciplines) {
      this.choosenDiscipline = null;
    }
    console.log(this.choosenDiscipline)
    console.log("Entering!");
    if (this.firstname && this.lastname) {
      this.playerService.fetchByFirstnameAndLastnameService(
        this.firstname, this.lastname).subscribe((player: Player) => {
          if (player) {
            // check if player exists in database
            // and if exists check if the choosen sport is different from already written
            console.log(player);
            if (player.sportName != this.choosenSport.name) {
              // if it is different, error
              this.errorNoSport = "Takmičar je već izabran za drugi (" + player.sportName + ") sport!";
              this.errorFirstname = "Takmičar je već izabran za drugi (" + player.sportName + ") sport!";
              this.errorLastname = "Takmičar je već izabran za drugi (" + player.sportName + ") sport!";
              return;
            } else {
              // otherwise, add non existing disciplines to list of this player
              // and if this sport and discipline is single, add this player to the list of accepted players!
              // check if disciplines exist!
              if (this.choosenDiscipline) {
                let disciplinesChoosenByLeader = this.choosenDiscipline;
                let allDisciplines = this.disciplines;

                let playerNationality = this.nationalLeader.nationality;
                let sportName = this.choosenSport.name;
                let playerGender = this.gender;
                let playerName = this.firstname;
                let playerSurname = this.lastname;
                let playerCredentials = this.firstname + " " + this.lastname;

                disciplinesChoosenByLeader.forEach(myDiscipline => {
                  if (!player.disciplines.includes(myDiscipline)) {
                    allDisciplines.forEach(allDisciplines => {

                      if (allDisciplines.single == true) {
                        if (allDisciplines.disciplineName == myDiscipline) {
                          console.log(allDisciplines.disciplineName)
                          this.nationalTeamsService.addPlayerToDisciplineService(
                            playerNationality, sportName, myDiscipline, playerGender, true,
                            playerCredentials
                          ).subscribe(
                            res => {
                              console.log(res)
                              this.playerService.addDisciplineToPlayerService(
                                playerName, playerSurname, myDiscipline).subscribe(res => {

                                  console.log(res)
                                });

                            });

                        }

                      } else {
                        if (allDisciplines.disciplineName == myDiscipline) {
                          console.log(allDisciplines.disciplineName)

                          this.playerService.addDisciplineToPlayerService(
                            playerName, playerSurname, myDiscipline).subscribe(res => {

                              console.log(res)
                            });

                        }
                      }
                    })
                  }
                })

              }
              this.firstname = "";
              this.lastname = "";
              this.gender = "";
              this.disciplines = null;
              this.hasDisciplines = false;
              this.choosenSport = null;
              this.choosenDiscipline = null;

              this.addedPlayer = true;
              this.alertMessage = "Takmičar je uspešno dodat!";
              // clear all!
            }
          } else {
            // add this player to the sport list
            // if this sport and discipline is single, add this player to the list of accepted players!
            this.playerService.addPlayerService(
              this.firstname, this.lastname, this.gender,
              this.choosenSport.name, this.nationalLeader.nationality, this.choosenDiscipline).subscribe(
                res => {
                  console.log(res)
                  // player is created!
                  // check if discipline exists!
                  if (this.choosenDiscipline) {
                    // if exists, check 
                    let disciplinesChoosenByLeader = this.choosenDiscipline;
                    let allDisciplines = this.disciplines;
                    let playerNationality = this.nationalLeader.nationality;
                    let sportName = this.choosenSport.name;
                    let playerGender = this.gender;
                    let playerCredentials = this.firstname + " " + this.lastname;
                    disciplinesChoosenByLeader.forEach(myDiscipline => {
                      allDisciplines.forEach(allDisciplines => {

                        if (allDisciplines.single == true) {
                          if (allDisciplines.disciplineName == myDiscipline) {
                            console.log(allDisciplines)
                            this.nationalTeamsService.addPlayerToDisciplineService(
                              playerNationality, sportName, myDiscipline, playerGender, true,
                              playerCredentials
                            ).subscribe(
                              res => {
                                console.log(res)
                              });
                          }
                        }

                      });
                    });

                  } /*else {*/
                  // clear all!
                  this.firstname = "";
                  this.lastname = "";
                  this.gender = "";
                  this.disciplines = null;
                  this.hasDisciplines = false;
                  this.choosenSport = null;
                  this.choosenDiscipline = null;

                  this.addedPlayer = true;
                  this.alertMessage = "Takmičar je uspešno dodat!";
                  /*}*/

                });

          }
        });
    }
  }

  sportIsChoosen() {

    this.errorNoSport = "";
    this.errorNoDiscipline = "";
    this.errorFirstname = "";
    this.errorLastname = ""
    this.errorGender = "";

    //console.log(this.choosenSport)
    this.disciplines = this.choosenSport.disciplines;
    //console.log(this.disciplines);
    if (this.disciplines[0].disciplineName == null) {
      this.hasDisciplines = false;
    } else {
      this.hasDisciplines = true;
    }
  }

}
