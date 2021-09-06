import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '../models/state';
import { PlayerService } from '../player.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-medals-statistics-table',
  templateUrl: './medals-statistics-table.component.html',
  styleUrls: ['./medals-statistics-table.component.css']
})
export class MedalsStatisticsTableComponent implements OnInit {

  constructor(
    private router: Router,
    private stateService: StateService,
    private playerService: PlayerService,
    private activatedRoute: ActivatedRoute

  ) { }

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
    this.stateService.fetchAllStatesService().subscribe(
      (states: State[]) => {
        if (states.length > 10) {
          this.paginationShow = true;
        }
        states.sort((a: State, b: State) => {
          if (a.goldMedals + a.silverMedals + a.bronseMedals > b.goldMedals + b.silverMedals + b.bronseMedals) {
            return -1;
          }
          if (a.goldMedals + a.silverMedals + a.bronseMedals < b.goldMedals + b.silverMedals + b.bronseMedals) {
            return 0;
          }
          return 0;
        })

        for (let i = 0; i < states.length; i++) {
          this.statesStatistics.push({
            "rank": i,
            "state": states[i].countryName,
            "gold": states[i].goldMedals,
            "silver": states[i].silverMedals,
            "bronse": states[i].bronseMedals,
            "total": states[i].goldMedals + states[i].silverMedals + states[i].bronseMedals
          })
        }

      })

  }


  breadcrumbs: string;

  statesStatistics: Array<{ "rank": number, "state": string, "gold": number, "silver": number, "bronse": number, "total": number }> = [];
  p: number = 1;
  paginationShow: boolean = false;

  finishShowingMedalsStatistics() {
    this.router.navigate(['']);
  }

}
