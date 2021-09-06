import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  fetchByFirstnameAndLastnameService(firstname, lastname) {
    const data = {
      firstname: firstname,
      lastname: lastname
    }
    return this.http.post(`${this.uri}/players/fetchByFirstnameAndLastname`, data);
  }

  addPlayerService(firstname, lastname, gender, sportName, nationality, choosenDisciplines) {

    const data = {
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      sportName: sportName,
      nationality: nationality,
      disciplines: choosenDisciplines
    }

    return this.http.post(`${this.uri}/players/addPlayer`, data);
  }


  addDisciplineToPlayerService(playerName, playerSurname, myDiscipline) {
    const data = {
      firstname: playerName,
      lastname: playerSurname,
      disciplineName: myDiscipline
    }

    return this.http.post(`${this.uri}/players/addDisciplineToPlayer`, data);

  }

  fetchByNationalitySportDisciplineAndGenderService(nationality, sportName, discipline, gender) {
    const data = {
      nationality: nationality,
      sportName: sportName,
      discipline: discipline,
      gender: gender
    }
    return this.http.post(`${this.uri}/players/fetchByNationalitySportDisciplineAndGender`, data);
  }

  removePlayerService(firstname, lastname) {
    const data = {
      firstname: firstname,
      lastname: lastname,
    }
    return this.http.post(`${this.uri}/players/removePlayer`, data);
  }

  removeDisciplineFromPlayerService(firstname, lastname, disciplineName) {
    const data = {
      firstname: firstname,
      lastname: lastname,
      disciplineName: disciplineName
    }

    return this.http.post(`${this.uri}/players/removeDisciplineFromPlayer`, data);

  }

  fetchByNationalityService(nationality) {
    const data = {
      nationality: nationality
    }

    return this.http.post(`${this.uri}/players/fetchByNationality`, data);

  }

  addMedalService(firstname, lastname, competitionName, medal) {
    const data = {
      firstname: firstname,
      lastname: lastname,
      competitionName: competitionName,
      medal: medal
    }

    return this.http.post(`${this.uri}/players/addMedal`, data);

  }

}
