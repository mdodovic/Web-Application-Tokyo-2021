import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-national-leader',
  templateUrl: './national-leader.component.html',
  styleUrls: ['./national-leader.component.css']
})
export class NationalLeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.nationalLeader = JSON.parse(localStorage.getItem('loggedInUser'));

  }

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
