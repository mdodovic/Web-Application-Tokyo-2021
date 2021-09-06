import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-national-leader',
  templateUrl: './national-leader.component.html',
  styleUrls: ['./national-leader.component.css']
})
export class NationalLeaderComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.nationalLeader = JSON.parse(localStorage.getItem('loggedInUser'));

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

  enterPlayers() {
    this.router.navigate(['players-applications']);
  }

  makeTeamsFromPlayers() {
    this.router.navigate(['teams-formation']);
  }

  showNationalTeam() {
    this.router.navigate(['show-national-team']);
  }

  logOut() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['']);
  }
}
