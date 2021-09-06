import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sport } from '../models/sport';
import { User } from '../models/user';
import { NationalTeamsService } from '../national-teams.service';
import { SportService } from '../sport.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
    private userService: UserService,
    private sportService: SportService,
    private nationalTeamsService: NationalTeamsService,
    private activatedRoute: ActivatedRoute) { }

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

  confirmPassword: string;
  errorConfirmPassword: string;

  firstname: string;
  errorFirstname: string;

  lastname: string;
  errorLastname: string;

  country: string;
  errorCountry: string;

  email: string;
  errorEmail: string;

  type: string;
  errorType: string;

  addedUser: boolean = false;
  alertMessage: string;

  cancelRegistration() {
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

  confirmRegistration() {
    this.errorUsername = "";
    this.errorPassword = "";
    this.errorConfirmPassword = ""
    this.errorFirstname = "";
    this.errorLastname = ""
    this.errorCountry = "";
    this.errorEmail = "";
    this.errorType = "";
    this.addedUser = false;

    let noErrors: boolean = true;

    if (!this.username) {
      this.errorUsername = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.password) {
      this.errorPassword = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.confirmPassword) {
      this.errorConfirmPassword = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.firstname) {
      this.errorFirstname = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.lastname) {
      this.errorLastname = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.country) {
      this.errorCountry = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.email) {
      this.errorEmail = "Obavezno polje!"
      noErrors = false;
    }
    if (!this.type) {
      this.errorType = "Obavezno polje!"
      noErrors = false;
    }

    let passwordRegex = /^(?=(.*[a-z]){3,})(?=.*[A-Z])(?=(.*\d){2,})(?=(.*[_@$!%*?&]){2,})[A-Za-z\d_@$!%*?&]{8,12}$/

    if (this.password) {
      console.log(this.password)
      if (!passwordRegex.test(this.password)) {
        this.errorPassword = "Lozinka mora biti u odgovarajućem formatu!"
        noErrors = false;
      } else {
        if (this.maxRepeating(this.password) >= 3) {
          this.errorPassword = "Lozinka mora biti u odgovarajućem formatu!"
          noErrors = false;
        }
      }
    }

    if (this.password && this.confirmPassword && this.password !== this.confirmPassword) {
      console.log(this.confirmPassword)
      this.errorConfirmPassword = "Lozinke moraju biti iste!"
      noErrors = false;
    }

    if (this.username) {
      console.log(this.username)
      this.userService.fetchByUsernameService(this.username).subscribe((user: User) => {
        if (user) {
          // check if user exists in database
          console.log(user);
          this.errorUsername = "Korisničko ime već postoji u bazi!"
          noErrors = false;
        }
        // because of async ability of subscribe, all others (recursive) subscribe is placed insice  

        if (this.country && this.type == "nationalLeader") {
          console.log(this.country + " # " + this.type)

          this.userService.fetchByTypeAndCountryService(this.type, this.country).subscribe((user: User) => {
            console.log(user);
            if (user) {
              this.errorUsername = "Lider nacionalnog tima već postoji!"
              noErrors = false;
            }

            if (noErrors) {
              // add user!
              //let cnt = 0;
              let countryForNationalTeam = this.country;
              this.userService.addUserService(this.username, this.password,
                this.firstname, this.lastname,
                this.country, this.email, this.type).subscribe(res => {
                  console.log(res)
                  // add scratch for national team!
                  this.sportService.fetchAllSportsService().subscribe((sports: Sport[]) => {
                    sports.forEach(sport => {
                      //console.log(sport.name);
                      sport.disciplines.forEach(discipline => {
                        //console.log(discipline.disciplineName);
                        //console.log(discipline.single);

                        this.nationalTeamsService.addNationalTeamScratchService
                          (countryForNationalTeam, sport.name, discipline.disciplineName,
                            "man", discipline.single).subscribe(res => {
                              //console.log(res);
                              //cnt += 1;
                            })
                        this.nationalTeamsService.addNationalTeamScratchService(
                          countryForNationalTeam, sport.name, discipline.disciplineName,
                          "woman", discipline.single).subscribe(res => {
                            //console.log(res);
                            //cnt += 1;
                          })
                      });
                    });
                  })
                  // end of scratch
                  this.addedUser = true;
                  this.alertMessage = "Korisnik je uspešno dodat!"
                  //console.log(cnt);
                  this.username = "";
                  this.password = "";
                  this.confirmPassword = "";
                  this.firstname = "";
                  this.lastname = "";
                  this.country = "";
                  this.email = "";
                  this.type = "";

                }) // end of user adding
            }

          }) // end of counrty-type check subscribe
        }
        if (this.type == "delegate") {
          if (noErrors) {
            // add user!
            //let cnt = 0;

            this.userService.addUserService(this.username, this.password,
              this.firstname, this.lastname,
              this.country, this.email, this.type).subscribe(res => {
                console.log(res)
                // end of scratch
                this.addedUser = true;
                this.alertMessage = "Korisnik je uspešno dodat!"
                //console.log(cnt);
                this.username = "";
                this.password = "";
                this.confirmPassword = "";
                this.firstname = "";
                this.lastname = "";
                this.country = "";
                this.email = "";
                this.type = "";
              }) // end of user adding
          }
        }

      }) // end of username check subscribe
    }

  }

  close() {
    console.log('close alert');
    this.router.navigate(['']);
  }

}
