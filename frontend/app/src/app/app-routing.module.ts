import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DelegateComponent } from './delegate/delegate.component';
import { EnterCompetitionsComponent } from './enter-competitions/enter-competitions.component';
import { InitialComponent } from './initial/initial.component';
import { LoginComponent } from './login/login.component';
import { NationalLeaderComponent } from './national-leader/national-leader.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { PlayersApplicationsComponent } from './players-applications/players-applications.component';
import { RegisterComponent } from './register/register.component';
import { ShowNationalTeamComponent } from './show-national-team/show-national-team.component';
import { SportsAndDisciplinesComponent } from './sports-and-disciplines/sports-and-disciplines.component';
import { TeamsFormationComponent } from './teams-formation/teams-formation.component';

const routes: Routes = [
  { path: '', component: InitialComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'organizer', component: OrganizerComponent },
  { path: 'delegate', component: DelegateComponent },
  { path: 'national-leader', component: NationalLeaderComponent },
  { path: 'sports-and-disciplines', component: SportsAndDisciplinesComponent },
  { path: 'players-applications', component: PlayersApplicationsComponent },
  { path: 'teams-formation', component: TeamsFormationComponent },
  { path: 'show-national-team', component: ShowNationalTeamComponent },
  { path: 'enter-competitions', component: EnterCompetitionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
