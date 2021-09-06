import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-accept-users',
  templateUrl: './accept-users.component.html',
  styleUrls: ['./accept-users.component.css']
})
export class AcceptUsersComponent implements OnInit {

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }

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

    this.userService.fetchUnacceptedUsersService().subscribe(
      (unacceptedUsers: User[]) => {
        this.unacceptedUsers = unacceptedUsers;
      })


  }

  breadcrumbs: string;

  unacceptedUsers: User[];


  finishUsersAccepting() {
    this.router.navigate(['organizer']);
  }

  acceptUser(u: User) {
    console.log(u.firstname)
    console.log(u.lastname)
    console.log(u.nationality)
    console.log(u.type)
    console.log(u.email)
    console.log(u.username)

    this.userService.acceptUserService(u.username).subscribe(
      res => {
        console.log(res)
        this.userService.fetchUnacceptedUsersService().subscribe(
          (unacceptedUsers: User[]) => {
            this.unacceptedUsers = unacceptedUsers;
          })
      })
  }

}
