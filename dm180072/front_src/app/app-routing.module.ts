import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcceptUsersComponent } from './accept-users/accept-users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DelegateComponent } from './delegate/delegate.component';
import { EnterCompetitionsComponent } from './enter-competitions/enter-competitions.component';
import { EnterResultsComponent } from './enter-results/enter-results.component';
import { EnterTimetableComponent } from './enter-timetable/enter-timetable.component';
import { InitialComponent } from './initial/initial.component';
import { LoginComponent } from './login/login.component';
import { MedalsStatisticsGraphComponent } from './medals-statistics-graph/medals-statistics-graph.component';
import { MedalsStatisticsTableComponent } from './medals-statistics-table/medals-statistics-table.component';
import { NationalLeaderComponent } from './national-leader/national-leader.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { PlayersApplicationsComponent } from './players-applications/players-applications.component';
import { RegisterComponent } from './register/register.component';
import { ShowNationalTeamComponent } from './show-national-team/show-national-team.component';
import { SportsAndDisciplinesComponent } from './sports-and-disciplines/sports-and-disciplines.component';
import { StatesStatisticsComponent } from './states-statistics/states-statistics.component';
import { TeamsFormationComponent } from './teams-formation/teams-formation.component';
import { TimetableGroupSportFinalComponent } from './timetable-group-sport-final/timetable-group-sport-final.component';
import { WorldRecordsComponent } from './world-records/world-records.component';

const routes: Routes = [
  { path: '', component: InitialComponent },
  {
    path: 'register',
    component: RegisterComponent,
    data: { breadcrumbs: ['home', 'register'] }
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    data: { breadcrumbs: ['home', 'change-password'] }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { breadcrumbs: ['home', 'login'] }
  },
  {
    path: 'organizer',
    component: OrganizerComponent,
    data: { breadcrumbs: ['home', 'organizer'] }
  },
  {
    path: 'delegate',
    component: DelegateComponent,
    data: { breadcrumbs: ['home', 'delegate'] }
  },
  {
    path: 'national-leader',
    component: NationalLeaderComponent,
    data: { breadcrumbs: ['home', 'national-leader'] }
  },
  {
    path: 'sports-and-disciplines',
    component: SportsAndDisciplinesComponent,
    data: { breadcrumbs: ['home', 'organizer', 'sports-and-disciplines'] }
  },
  {
    path: 'players-applications',
    component: PlayersApplicationsComponent,
    data: { breadcrumbs: ['home', 'national-leader', 'players-applications'] }
  },
  {
    path: 'teams-formation',
    component: TeamsFormationComponent,
    data: { breadcrumbs: ['home', 'national-leader', 'teams-formation'] }
  },
  {
    path: 'show-national-team',
    component: ShowNationalTeamComponent,
    data: { breadcrumbs: ['home', 'national-leader', 'show-national-team'] }
  },
  {
    path: 'enter-competitions',
    component: EnterCompetitionsComponent,
    data: { breadcrumbs: ['home', 'organizer', 'enter-competitions'] }

  },
  {
    path: 'enter-timetable',
    component: EnterTimetableComponent,
    data: { breadcrumbs: ['home', 'delegate', 'enter-timetable'] }
  },
  {
    path: 'enter-results',
    component: EnterResultsComponent,
    data: { breadcrumbs: ['home', 'delegate', 'enter-results'] }
  },
  {
    path: 'timetable-group-sport-final',
    component: TimetableGroupSportFinalComponent,
    data: { breadcrumbs: ['home', 'delegate', 'enter-results', 'timetable-group-sport-final'] }

  },
  {
    path: 'states-statistics',
    component: StatesStatisticsComponent,
    data: { breadcrumbs: ['home', 'states-statistics'] }
  },
  {
    path: 'medals-statistics-table',
    component: MedalsStatisticsTableComponent,
    data: { breadcrumbs: ['home', 'medals-statistics-table'] }
  },
  {
    path: 'medals-statistics-graph',
    component: MedalsStatisticsGraphComponent,
    data: { breadcrumbs: ['home', 'medals-statistics-graph'] }
  },
  {
    path: 'player-search',
    component: PlayerSearchComponent,
    data: { breadcrumbs: ['home', 'player-search'] }
  },
  {
    path: 'world-records',
    component: WorldRecordsComponent,
    data: { breadcrumbs: ['home', 'organizer', 'world-records'] }
  },
  {
    path: 'accept-users',
    component: AcceptUsersComponent,
    data: { breadcrumbs: ['home', 'organizer', 'accept-users'] }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
