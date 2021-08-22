import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.organizer = JSON.parse(localStorage.getItem('loggedInUser'));

  }

  organizer: User;

  enterSportsAndDisciplines() {
    this.router.navigate(['sports-and-disciplines']);
  }

  enterCompetitions() {
    this.router.navigate(['enter-competitions']);
  }

  logOut() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['']);
  }
}
