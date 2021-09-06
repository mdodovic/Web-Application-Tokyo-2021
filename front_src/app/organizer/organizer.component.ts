import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.organizer = JSON.parse(localStorage.getItem('loggedInUser'));
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

  showWorldRecords() {
    localStorage.removeItem('world records');
    this.router.navigate(['world-records']);
  }

  acceptUsers() {
    localStorage.removeItem('accept users');
    this.router.navigate(['accept-users']);
  }
}
