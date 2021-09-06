import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InitialComponent } from './initial/initial.component';

import { MatMenuModule } from '@angular/material/menu';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LoginComponent } from './login/login.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { DelegateComponent } from './delegate/delegate.component';
import { NationalLeaderComponent } from './national-leader/national-leader.component';
import { SportsAndDisciplinesComponent } from './sports-and-disciplines/sports-and-disciplines.component';
import { PlayersApplicationsComponent } from './players-applications/players-applications.component';
import { TeamsFormationComponent } from './teams-formation/teams-formation.component';
import { ShowNationalTeamComponent } from './show-national-team/show-national-team.component';
import { EnterCompetitionsComponent } from './enter-competitions/enter-competitions.component';
import { EnterTimetableComponent } from './enter-timetable/enter-timetable.component';
import { EnterResultsComponent } from './enter-results/enter-results.component';
import { TimetableGroupSportFinalComponent } from './timetable-group-sport-final/timetable-group-sport-final.component';
import { StatesStatisticsComponent } from './states-statistics/states-statistics.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MedalsStatisticsTableComponent } from './medals-statistics-table/medals-statistics-table.component';
import { MedalsStatisticsGraphComponent } from './medals-statistics-graph/medals-statistics-graph.component';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { WorldRecordsComponent } from './world-records/world-records.component';
import { AcceptUsersComponent } from './accept-users/accept-users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InitialComponent,
    RegisterComponent,
    ChangePasswordComponent,
    LoginComponent,
    OrganizerComponent,
    DelegateComponent,
    NationalLeaderComponent,
    SportsAndDisciplinesComponent,
    PlayersApplicationsComponent,
    TeamsFormationComponent,
    ShowNationalTeamComponent,
    EnterCompetitionsComponent,
    EnterTimetableComponent,
    EnterResultsComponent,
    TimetableGroupSportFinalComponent,
    StatesStatisticsComponent,
    MedalsStatisticsTableComponent,
    MedalsStatisticsGraphComponent,
    PlayerSearchComponent,
    WorldRecordsComponent,
    AcceptUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
