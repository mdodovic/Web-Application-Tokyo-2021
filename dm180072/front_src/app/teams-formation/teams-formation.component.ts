import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Discipline } from '../models/discipline';
import { Player } from '../models/player';
import { Sport } from '../models/sport';
import { User } from '../models/user';
import { NationalTeamsService } from '../national-teams.service';
import { PlayerService } from '../player.service';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-teams-formation',
  templateUrl: './teams-formation.component.html',
  styleUrls: ['./teams-formation.component.css']
})
export class TeamsFormationComponent implements OnInit {

  constructor(
    private router: Router,
    private sportService: SportService,
    private playerService: PlayerService,
    private nationalTeamsService: NationalTeamsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.nationalLeader = JSON.parse(localStorage.getItem('loggedInUser'));

    this.teamSports = [];
    this.sportService.fetchAllSportsService().subscribe((sports: Sport[]) => {

      sports.forEach(sport => {
        sport.disciplines.forEach(discipline => {
          if (discipline.single == false) {
            if (!this.teamSports.includes(sport)) {
              this.teamSports.push(sport);
              console.log(sport)
            }
          }
        });
      });

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

  teamSports: Sport[];
  teamDisciplines: Discipline[];
  hasDisciplines: boolean = false;

  choosenTeamSport: Sport;
  errorNoTeamSport: string;

  choosenTeamDiscipline: Discipline;
  errorNoTeamDiscipline: string;

  genders = [{ "serbia": "Muški", "english": "man" }, { "serbia": "Ženski", "english": "woman" }];
  choosenGender: string;
  errorNoGender: string;

  teamPlayers: Player[];
  choosenPlayers: Player[];
  errorNoPlayers: string;
  hasPlayersForTeam: boolean = false;

  teamCreated: boolean = false;
  alertMessage: string;

  showPlayers: boolean = false;
  showGender: boolean = false;

  teamSportIsChoosen() {
    console.log("Sport is choosen")
    this.errorNoTeamSport = "";
    this.errorNoTeamDiscipline = "";
    this.errorNoGender = "";
    this.errorNoPlayers = "";
    this.choosenGender = "";
    this.showPlayers = false;
    this.showGender = false;
    this.choosenTeamDiscipline = null;
    this.hasPlayersForTeam = false;
    this.teamCreated = false;
    this.alertMessage = "";


    this.teamDisciplines = [];
    this.choosenTeamSport.disciplines.forEach(discipline => {
      if (discipline.single == false) {
        this.teamDisciplines.push(discipline);
      }
    });
    console.log(this.teamDisciplines)
    if (this.teamDisciplines[0].disciplineName == null) {
      this.hasDisciplines = false;
      this.showGender = true;
    } else {
      this.hasDisciplines = true;
      console.log(this.teamDisciplines)
    }
  }
  teamDisciplineIsChoosen() {
    this.errorNoTeamSport = "";
    this.errorNoTeamDiscipline = "";
    this.errorNoGender = "";
    this.errorNoPlayers = "";
    this.showGender = true;
    this.choosenGender = "";
    this.showPlayers = false;
    this.teamCreated = false;
    this.alertMessage = "";
  }

  genderIsChoosen() {
    this.errorNoTeamSport = "";
    this.errorNoTeamDiscipline = "";
    this.errorNoGender = "";
    this.errorNoPlayers = "";
    this.showPlayers = true;
    this.teamCreated = false;
    this.alertMessage = "";
    // Let's fetch players {sport, discipline, gender}
    console.log(this.choosenTeamSport.name)
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
  }

  confirmTeam() {
    console.log("Confirm!");
    this.errorNoTeamSport = "";
    this.errorNoTeamDiscipline = "";
    this.errorNoGender = "";
    this.errorNoPlayers = "";

    let noErrors: boolean = true;

    if (!this.choosenTeamSport) {
      this.errorNoTeamSport = "Morate izabrati sport!";
      return;
    }
    if (this.hasDisciplines && !this.choosenTeamDiscipline) {
      this.errorNoTeamDiscipline = "Morate izabrati disciplinu!";
      return;
    }

    if (this.showGender && !this.choosenGender) {
      this.errorNoGender = "Morate izabrati pol!"
      return;
    }

    if (this.showPlayers && !this.hasPlayersForTeam) {
      return;
    }

    if (this.showPlayers && !this.choosenPlayers) {
      this.errorNoPlayers = "Morate izabrati takmičare za ekipu!"
      return;
    }

    console.log(this.choosenTeamSport)
    console.log(this.choosenTeamDiscipline)
    console.log(this.choosenGender)
    console.log(this.choosenPlayers)

    if (!this.hasDisciplines) {
      console.log("NO DISCIPLINE: remove complete players!");

      console.log(this.choosenPlayers.length + " ? (" + this.choosenTeamSport.disciplines[0].minPlayers + "," + this.choosenTeamSport.disciplines[0].maxPlayers + ")")

      if (this.choosenPlayers.length < this.choosenTeamSport.disciplines[0].minPlayers || this.choosenPlayers.length > this.choosenTeamSport.disciplines[0].maxPlayers) {
        this.errorNoPlayers = "Broj takmičara mora biti u opsegu [" + this.choosenTeamSport.disciplines[0].minPlayers + ", " + this.choosenTeamSport.disciplines[0].maxPlayers + "]!"
        return;
      }

      let choosenPlayersCopy = this.choosenPlayers;
      let omittedPlayersCopy = this.teamPlayers.filter(x => !this.choosenPlayers.includes(x));

      let playerNationality = this.nationalLeader.nationality;
      let sportName = this.choosenTeamSport.name;
      let playerGender = this.choosenGender;
      console.log(playerNationality)
      console.log(sportName)
      console.log(null)
      console.log(playerGender)
      console.log(false)


      choosenPlayersCopy.forEach(player => {
        let playerCredentials = player.firstname + " " + player.lastname;
        this.nationalTeamsService.addPlayerToDisciplineService(
          playerNationality, sportName, null, playerGender, false,
          playerCredentials
        ).subscribe(
          res => {
            console.log(res)
          });

      });

      omittedPlayersCopy.forEach(omittedPlayer => {
        this.playerService.removePlayerService(omittedPlayer.firstname, omittedPlayer.lastname).subscribe(
          res => {
            console.log(res)
          });
      });

      this.teamDisciplines = [];
      this.hasDisciplines = false;
      this.choosenTeamSport = null;

      this.choosenTeamDiscipline = null;

      this.choosenGender = "";

      this.teamPlayers = null;
      this.choosenPlayers = null;

      this.hasPlayersForTeam = false;
      this.showPlayers = false;
      this.showGender = false;

      this.teamCreated = true;
      this.alertMessage = "Tim je napravljen";


    } else {
      console.log("HAS DISCIPLINE: remove sport+discipline from array, and if it is the last sport, remove complete player!");

      console.log(this.choosenPlayers.length + " ? (" + this.choosenTeamDiscipline.minPlayers + "," + this.choosenTeamDiscipline.maxPlayers + ")")

      if (this.choosenPlayers.length < this.choosenTeamDiscipline.minPlayers || this.choosenPlayers.length > this.choosenTeamDiscipline.maxPlayers) {
        if (this.choosenTeamDiscipline.minPlayers != this.choosenTeamDiscipline.maxPlayers) {
          this.errorNoPlayers = "Broj takmičara mora biti u opsegu [" + this.choosenTeamDiscipline.minPlayers + ", " + this.choosenTeamDiscipline.maxPlayers + "]!"
        } else {
          this.errorNoPlayers = "Broj takmičara mora biti jednak " + this.choosenTeamDiscipline.maxPlayers + "!"
        }
        return;
      }

      let choosenPlayersCopy = this.choosenPlayers;
      let omittedPlayersCopy = this.teamPlayers.filter(x => !this.choosenPlayers.includes(x));

      let playerNationality = this.nationalLeader.nationality;
      let disciplineName = this.choosenTeamDiscipline.disciplineName;
      let sportName = this.choosenTeamSport.name;
      let playerGender = this.choosenGender;
      console.log(playerNationality)
      console.log(sportName)
      console.log(disciplineName)
      console.log(playerGender)
      console.log(false)

      choosenPlayersCopy.forEach(player => {
        let playerCredentials = player.firstname + " " + player.lastname;
        console.log(playerCredentials)
        this.nationalTeamsService.addPlayerToDisciplineService(
          playerNationality, sportName, disciplineName, playerGender, false,
          playerCredentials
        ).subscribe(
          res => {
            console.log(res)
          });

      });

      omittedPlayersCopy.forEach(omittedPlayer => {
        let playerCredentials = omittedPlayer.firstname + " " + omittedPlayer.lastname;
        console.log(playerCredentials)

        this.playerService.removeDisciplineFromPlayerService(
          omittedPlayer.firstname, omittedPlayer.lastname, disciplineName).subscribe(
            (playerWithoutDiscipline: Player) => {

              console.log(playerWithoutDiscipline.disciplines.length)
              if (playerWithoutDiscipline.disciplines.length == 0) {
                this.playerService.removePlayerService(
                  playerWithoutDiscipline.firstname, playerWithoutDiscipline.lastname).subscribe(
                    res => {
                      console.log(res)
                    });
              }
            })

      });

      this.teamDisciplines = [];
      this.hasDisciplines = false;
      this.choosenTeamSport = null;

      this.choosenTeamDiscipline = null;

      this.choosenGender = "";

      this.teamPlayers = null;
      this.choosenPlayers = null;

      this.hasPlayersForTeam = false;
      this.showPlayers = false;
      this.showGender = false;

      this.teamCreated = true;
      this.alertMessage = "Tim je napravljen";


    }
  }

  finishTeamsFormation() {
    this.router.navigate(['national-leader']);
  }
}
