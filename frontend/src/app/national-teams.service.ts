import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NationalTeamsService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }



  addPlayerToDisciplineService(playerNationality, sportName, myDiscipline, playerGender, single, playerCredentials) {
    const data = {
      nationality: playerNationality,
      sportName: sportName,
      disciplineName: myDiscipline,
      gender: playerGender,
      single: single,
      player: playerCredentials
    }

    return this.http.post(`${this.uri}/national-teams/addPlayerToDiscipline`, data);

  }

  addNationalTeamScratchService(nationality, sportName, disciplineName, gender, single) {
    //console.log(nationality)
    const data = {
      nationality: nationality,
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      single: single,
      players: [],
      accepted: false
    }

    return this.http.post(`${this.uri}/national-teams/addNationalTeamScratch`, data);
  }

  fetchBySportDisciplineAndGenderService(sportName, disciplineName, gender) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
    }

    return this.http.post(`${this.uri}/national-teams/fetchBySportDisciplineAndGender`, data);

  }

}