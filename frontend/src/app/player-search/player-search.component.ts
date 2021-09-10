import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../models/player';
import { Sport } from '../models/sport';
import { State } from '../models/state';
import { PlayerService } from '../player.service';
import { SportService } from '../sport.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit {

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private stateService: StateService,
    private sportService: SportService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.playerService.fetchAllPlayersService().subscribe(
      (players: Player[]) => {
        this.players = players;
        console.log(this.players);
      })
    this.stateService.fetchAllStatesService().subscribe(
      (states: State[]) => {
        this.states = states;
        console.log(this.states);
      })
    this.sportService.fetchAllSportsService().subscribe(
      (sport: Sport[]) => {
        this.sports = sport;
        console.log(this.sports);
        this.disciplines = [];
        this.sports.forEach(s => {
          s.disciplines.forEach(d => {
            if (d.disciplineName != null) {
              this.disciplines.push(d.disciplineName);
            }
          });
        });
        console.log(this.disciplines);

      }
    )
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

  players: Player[];
  choosenPlayers: Player[];

  states: State[];
  sports: Sport[];
  disciplines: string[];

  name: string = "";
  choosenState: string = "";
  choosenSport: string = "";
  choosenDiscipline: string = "";
  gender: string = "";
  hasMedals: boolean = false;

  showPlayers: boolean;
  paginationSize: number = 20;

  finishPlayersSearch() {
    this.router.navigate(['']);
  }


  confirmSearch() {
    this.showPlayers = false;
    console.log(this.name);
    console.log(this.choosenState);
    console.log(this.choosenSport);
    console.log(this.choosenDiscipline);
    console.log(this.gender);
    console.log(this.hasMedals)
    this.choosenPlayers = [];
    let temporaryPlayers: Player[] = [];
    this.players.forEach(p => {
      temporaryPlayers.push(p);
    });

    console.log(temporaryPlayers.length)


    if (this.name != "") {
      for (let i = 0; i < temporaryPlayers.length; i++) {
        let sName: string = temporaryPlayers[i].firstname + " " + temporaryPlayers[i].lastname;
        if (sName != this.name) {
          temporaryPlayers[i] = null;
        }
      }
    }

    if (this.choosenState != "" && this.choosenState != "Sve zemlje") {
      for (let i = 0; i < temporaryPlayers.length; i++) {
        if (temporaryPlayers[i] != null) {
          if (temporaryPlayers[i].nationality != this.choosenState) {
            temporaryPlayers[i] = null;
          }
        }
      }
    }

    if (this.choosenSport != "" && this.choosenSport != "Svi sportovi") {
      for (let i = 0; i < temporaryPlayers.length; i++) {
        if (temporaryPlayers[i] != null) {
          if (temporaryPlayers[i].sportName != this.choosenSport) {
            temporaryPlayers[i] = null;
          }
        }
      }
    }

    if (this.choosenDiscipline != "" && this.choosenDiscipline != "Sve discipline") {
      for (let i = 0; i < temporaryPlayers.length; i++) {

        if (temporaryPlayers[i] != null) {
          let has: boolean = false;
          if (temporaryPlayers[i].disciplines != null) {
            temporaryPlayers[i].disciplines.forEach(d => {
              if (d == this.choosenDiscipline) {
                has = true;
              }
            });
            if (has == false) {
              temporaryPlayers[i] = null;
            }
          } else {
            temporaryPlayers[i] = null;
          }
        }
      }
    }

    if (this.gender != "") {
      for (let i = 0; i < temporaryPlayers.length; i++) {
        if (temporaryPlayers[i] != null) {
          if (temporaryPlayers[i].gender != this.gender) {
            temporaryPlayers[i] = null;
          }
        }
      }
    }

    if (this.hasMedals == true) {
      for (let i = 0; i < temporaryPlayers.length; i++) {
        if (temporaryPlayers[i] != null) {
          if (temporaryPlayers[i].goldMedals == null && temporaryPlayers[i].bronseMedals == null && temporaryPlayers[i].silverMedals == null) {
            console.log("N")
            console.log(temporaryPlayers[i])
            temporaryPlayers[i] = null;
            continue;
          }
          if (temporaryPlayers[i].goldMedals != null && temporaryPlayers[i].goldMedals.length == 0 && temporaryPlayers[i].bronseMedals != null && temporaryPlayers[i].bronseMedals.length == 0 && temporaryPlayers[i].silverMedals != null && temporaryPlayers[i].silverMedals.length == 0) {
            console.log("S")
            console.log(temporaryPlayers[i])
            temporaryPlayers[i] = null;
            continue;
          }

        }
      }
    }

    temporaryPlayers.forEach(t => {
      if (t != null) {
        this.choosenPlayers.push(t);
      }
    });

    console.log(this.choosenPlayers)
    if (this.choosenPlayers.length > 0) {
      this.showPlayers = true;
    }
    this.name = "";
    this.choosenState = "";
    this.choosenSport = "";
    this.choosenDiscipline = "";
    this.gender = "";
    this.hasMedals = false;

  }

}
