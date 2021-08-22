import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Discipline } from '../models/discipline';
import { Sport } from '../models/sport';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-sports-and-disciplines',
  templateUrl: './sports-and-disciplines.component.html',
  styleUrls: ['./sports-and-disciplines.component.css']
})
export class SportsAndDisciplinesComponent implements OnInit {

  constructor(private router: Router, private sportService: SportService) { }

  ngOnInit(): void {
    this.sportService.fetchAllSportsService().subscribe((sports: Sport[]) => {
      this.sports = sports;
    })
  }

  sports: Sport[];
  disciplines: Discipline[];
  hasDisciplines: boolean = false;
  choosenSport: Sport;
  choosenDiscipline: string[];

  errorNoSport: string;
  errorNoDiscipline: string;

  addedSport: boolean = false;
  alertMessage: string;

  finishSelectingSports() {
    this.router.navigate(['organizer'])
  }

  confirmSport() {
    this.errorNoSport = "";
    this.errorNoDiscipline = "";

    if (!this.choosenSport) {
      this.errorNoSport = "Morate izabrati sport!";
      return;
    }
    if (this.hasDisciplines && !this.choosenDiscipline) {
      this.errorNoDiscipline = "Morate izabrati bar jednu disciplinu";
      return;
    }

    console.log(this.choosenSport.name);

    if (this.hasDisciplines) {
      this.choosenDiscipline.forEach(discipline => {
        console.log(discipline);
        this.sportService.acceptSportService(this.choosenSport.name, discipline).subscribe(res => {
          console.log(res)
        })
      });
      this.disciplines = null;
      this.hasDisciplines = false;
      this.choosenSport = null;
      this.choosenDiscipline = [];
    } else {
      // This sport has not got any discipline!
      this.sportService.acceptSportService(this.choosenSport.name, null).subscribe(res => {
        console.log(res)
        this.disciplines = null;
        this.hasDisciplines = false;
        this.choosenSport = null;
        this.choosenDiscipline = [];

      }) // end of user adding
    }


  }

  sportIsChoosen() {

    this.errorNoSport = "";
    this.errorNoDiscipline = "";
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
