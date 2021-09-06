import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-delegate',
  templateUrl: './delegate.component.html',
  styleUrls: ['./delegate.component.css']
})
export class DelegateComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.delegate = JSON.parse(localStorage.getItem('loggedInUser'));
  }

  delegate: User;

  enterTimetableForCompetition() {
    this.router.navigate(['enter-timetable']);
  }

  enterResults() {
    this.router.navigate(['enter-results']);
  }

  logOut() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['']);
  }
}
