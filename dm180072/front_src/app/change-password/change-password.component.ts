import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
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
  }

  breadcrumbs: string;

  username: string;
  errorUsername: string;

  password: string;
  errorPassword: string;

  newPassword: string;
  errorNewPassword: string;



  cancelPasswordChange() {
    this.router.navigate([''])
  }

  maxRepeating(str: string) {
    let len = str.length;
    let count = 0;

    // Find the maximum repeating character
    // starting from str[i]
    let res = str[0];
    for (let i = 0; i < len; i++) {
      let cur_count = 1;
      for (let j = i + 1; j < len; j++) {
        if (str[i] != str[j])
          break;
        cur_count++;
      }

      // Update result if required
      if (cur_count > count) {
        count = cur_count;
        res = str[i];
      }
    }
    return count;
  }

  confirmPasswordChange() {

    this.errorUsername = "";
    this.errorPassword = "";
    this.errorNewPassword = ""

    let noErrors: boolean = true;

    if (!this.username) {
      this.errorUsername = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.password) {
      this.errorPassword = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.newPassword) {
      this.errorNewPassword = "Obavezno polje!"
      noErrors = false;
    }

    if (this.password && this.newPassword && this.password === this.newPassword) {
      console.log(this.password)
      console.log(this.newPassword)
      this.errorNewPassword = "Stara i nova lozinka se moraju razlikovati!";
      noErrors = false;
    }

    let passwordRegex = /^(?=(.*[a-z]){3,})(?=.*[A-Z])(?=(.*\d){2,})(?=(.*[_@$!%*?&]){2,})[A-Za-z\d_@$!%*?&]{8,12}$/

    if (this.newPassword && !this.errorNewPassword) {
      console.log(this.newPassword)
      if (!passwordRegex.test(this.newPassword)) {
        this.errorNewPassword = "Lozinka mora biti u odgovarajućem formatu!"
        noErrors = false;
      } else {
        if (this.maxRepeating(this.newPassword) >= 3) {
          this.errorPassword = "Lozinka mora biti u odgovarajućem formatu!"
          noErrors = false;
        }
      }
    }


    if (this.username) {
      console.log(this.username)
      this.userService.fetchByUsernameService(this.username).subscribe((user: User) => {
        if (!user) {
          // check if user exists in database
          this.errorUsername = "Korisnik sa datim korisničkim imenom ne postoji!"
          noErrors = false;
        }
        console.log(user);
        // check if it has the same password as it has been written in the appropriate field

        if (this.password && user.password != this.password) {
          console.log(this.password)
          console.log(user.password)
          this.errorPassword = "Pogrešna lozinka!";
          noErrors = false;
        }

        if (noErrors) {
          this.userService.changePasswordByUsernameService(this.username, this.newPassword).subscribe(res => {
            console.log(res)
            this.router.navigate(['']);
          }) // end of user adding
        }

      }) // end of username check subscribe

    }


  }


}
