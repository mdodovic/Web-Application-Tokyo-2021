import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }


  fetchRegularRoundsBySportDisciplineAndGenderService(sportName, disciplineName, gender) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      roundType: "regular"
    }
    return this.http.post(`${this.uri}/round/fetchBySportDisciplineGenderAndType`, data);

  }

  fetchRepeatedRoundsBySportDisciplineAndGenderService(sportName, disciplineName, gender) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      roundType: "repeated"
    }
    return this.http.post(`${this.uri}/round/fetchBySportDisciplineGenderAndType`, data);

  }


  addRoundService(sportName, disciplineName, gender, currentRound, roundResult, type, forPosition) {
    const data = {

      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,

      roundNumber: currentRound,

      roundResults: roundResult,
      roundType: type,
      forPosition: forPosition
    }
    return this.http.post(`${this.uri}/round/addRound`, data);

  }
}