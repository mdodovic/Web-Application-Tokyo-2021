import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.css']
})
export class InitialComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  countriesStatistics() {
    console.log("countries statistics")
  }
  playersSearch() {
    console.log("players statistics")
  }

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

  }

  medalsShowGraphs() {

  }


}
