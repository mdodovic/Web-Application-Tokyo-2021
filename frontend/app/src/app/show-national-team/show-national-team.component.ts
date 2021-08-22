import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discipline } from '../models/discipline';
import { Player } from '../models/player';
import { Sport } from '../models/sport';
import { User } from '../models/user';
import { PlayerService } from '../player.service';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-show-national-team',
  templateUrl: './show-national-team.component.html',
  styleUrls: ['./show-national-team.component.css']
})
export class ShowNationalTeamComponent implements OnInit {

  constructor(private router: Router, private playerService: PlayerService, private sportService: SportService) { }

  ngOnInit(): void {
    this.nationalLeader = JSON.parse(localStorage.getItem('loggedInUser'));
    this.sports = [];
    this.sportService.fetchAllSportsService().subscribe((sports: Sport[]) => {
      this.playerService.fetchByNationalityService(this.nationalLeader.nationality).subscribe((players: Player[]) => {
        this.nationalPlayers = players;
        sports.forEach(sport => {
          this.sports.push({ 'sport': sport, 'number': players.filter((x: Player) => x.sportName == sport.name).length })
        });
      })
    })
  }

  nationalLeader: User;
  nationalPlayers: Player[];

  sports: Array<{ 'sport': Sport, 'number': number }>;
  disciplines: Discipline[];
  choosenSport: Sport;
  hasDisciplines: boolean = false;
  choosenDiscipline: Discipline;

  playersForShowing: Array<{ 'firstname': string, 'lastname': string }>;
  showPlayers: boolean = false;

  finishShowingNationalTeam() {
    this.router.navigate(['national-leader']);
  }

  sportIsChoosen() {
    this.choosenDiscipline = null;
    this.showPlayers = false;
    this.playersForShowing = [];

    this.disciplines = this.choosenSport.disciplines;
    if (this.disciplines[0].disciplineName == null) {
      this.hasDisciplines = false;
      this.showPlayers = true;

      this.nationalPlayers.forEach(allPlayer => {
        if (allPlayer.sportName == this.choosenSport.name) {
          this.playersForShowing.push({ 'firstname': allPlayer.firstname, 'lastname': allPlayer.lastname })
        }
      });
      /*
      let x: Array<{ 'firstname': string, 'lastname': string }> = [];
      x.push({ 'firstname': "C", 'lastname': "B" })
      x.push({ 'firstname': "X", 'lastname': "A" })
      x.push({ 'firstname': "B", 'lastname': "B" })
      x.push({ 'firstname': "A", 'lastname': "C" })
      */
      this.playersForShowing = this.playersForShowing.sort((a: { 'firstname': string, 'lastname': string }, b: { 'firstname': string, 'lastname': string }) => {
        if (a.lastname > b.lastname) return 1;
        if (a.lastname < b.lastname) return -1;
        if (a.firstname > b.firstname) return 1;
        if (a.firstname < b.firstname) return -1;
        return 0;
      })



    } else {
      this.hasDisciplines = true;
    }
  }

  disciplineIsChoosen() {

    this.playersForShowing = [];
    this.showPlayers = true;
    console.log(this.choosenSport);
    console.log(this.choosenDiscipline);

    this.nationalPlayers.forEach(allPlayer => {
      if (allPlayer.sportName == this.choosenSport.name && allPlayer.disciplines.indexOf(this.choosenDiscipline.disciplineName) != -1) {
        this.playersForShowing.push({ 'firstname': allPlayer.firstname, 'lastname': allPlayer.lastname })
      }
    });
    /*
    let x: Array<{ 'firstname': string, 'lastname': string }> = [];
    x.push({ 'firstname': "C", 'lastname': "B" })
    x.push({ 'firstname': "X", 'lastname': "A" })
    x.push({ 'firstname': "B", 'lastname': "B" })
    x.push({ 'firstname': "A", 'lastname': "C" })
    */
    this.playersForShowing = this.playersForShowing.sort((a: { 'firstname': string, 'lastname': string }, b: { 'firstname': string, 'lastname': string }) => {
      if (a.lastname > b.lastname) return 1;
      if (a.lastname < b.lastname) return -1;
      console.log("a")
      if (a.firstname > b.firstname) return 1;
      if (a.firstname < b.firstname) return -1;
      return 0;
    })

  }

}
