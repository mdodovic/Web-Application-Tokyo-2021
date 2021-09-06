import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from '../models/state';
import { StateService } from '../state.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  constructor(private router: Router, private stateService: StateService) { }

  ngOnInit(): void {
  }

  states: State[];

  registerUser() {
    console.log("register user");
    this.router.navigate(['register']);
  }

  logIn() {
    console.log("login user");
    this.router.navigate(['login']);
  }

  changePassword() {
    console.log("change password");
    this.router.navigate(['change-password']);
  }

  medalsShowTables() {
    console.log("medals-statistics-table")
    this.router.navigate(['medals-statistics-table'])
  }

  medalsShowGraphs() {
    console.log("medals-statistics-graph")
    this.router.navigate(['medals-statistics-graph'])
  }

  countriesStatistics() {
    console.log("countries statistics")
    this.router.navigate(['states-statistics'])
  }
  playersSearch() {
    console.log("player-statistics")
    this.router.navigate(['player-search'])
  }



}
