import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  username: string;
  errorUsername: string;

  password: string;
  errorPassword: string;

  cancelLogIn() {
    this.router.navigate([''])
  }

  confirmLogIn() {
    this.errorUsername = "";
    this.errorPassword = "";

    let noErrors: boolean = true;

    if (!this.username) {
      this.errorUsername = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.password) {
      this.errorPassword = "Obavezno polje!"
      noErrors = false;
    }

    if (this.username) {
      console.log(this.username)
      this.userService.fetchByUsernameService(this.username).subscribe((user: User) => {
        if (!user) {
          // check if user exists in database
          this.errorUsername = "Korisnik sa datim korisničkim imenom ne postoji!"
          noErrors = false;
        } else {
          console.log(user);
          // check if it has the same password as it has been written in the appropriate field

          if (this.password && user.password != this.password) {
            console.log(this.password)
            console.log(user.password)
            this.errorPassword = "Pogrešna lozinka!";
            noErrors = false;
          }

          if (noErrors) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            if (user.type == "organizer") {
              this.router.navigate(['organizer'])
            } else if (user.type == "delegate") {
              this.router.navigate(['delegate'])
            } else if (user.type == "nationalLeader") {
              this.router.navigate(['national-leader'])
            }

          }
        }

      }) // end of username check subscribe

    }

  }

}
