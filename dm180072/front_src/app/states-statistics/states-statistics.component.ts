import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Player } from '../models/player';
import { State } from '../models/state';
import { PlayerService } from '../player.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-states-statistics',
  templateUrl: './states-statistics.component.html',
  styleUrls: ['./states-statistics.component.css']
})
export class StatesStatisticsComponent implements OnInit {

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
        states.forEach(s => {
          this.playerService.fetchByNationalityService(s.countryName).subscribe(
            (players: Player[]) => {

              this.statesStatistics.push({ "stateData": s, 'numbers': players.length });
            })
        })

      })
  }

  breadcrumbs: string;

  statesStatistics: Array<{ "stateData": State, "numbers": number }> = [];
  p: number = 1;
  paginationShow: boolean = false;

  finishShowingStatesStatistics() {
    this.router.navigate(['']);
  }

}


