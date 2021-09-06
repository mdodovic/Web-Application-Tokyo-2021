import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  uri = 'http://localhost:4000'


  constructor(private http: HttpClient) { }


  addUserService(sportName, gender, groupNumber, roundNumber, groupMatches) {

    const data = {
      sportName: sportName,
      gender: gender,
      groupNumber: groupNumber,
      roundNumber: roundNumber,
      groupMatches: groupMatches
    }

    return this.http.post(`${this.uri}/group/addGroup`, data);
  }

  fetchBySportAndGenderService(sportName, gender) {
    const data = {
      sportName: sportName,
      gender: gender
    }
    return this.http.post(`${this.uri}/group/fetchBySportAndGender`, data);
  }

  addPointsToGroupMatchService(sportName, gender, groupNumber, roundNumber, index, score) {
    const data = {
      sportName: sportName,
      gender: gender,
      groupNumber: groupNumber,
      roundNumber: roundNumber,
      index: index,
      score: score
    }

    return this.http.post(`${this.uri}/group/addPointsToGroupMatch`, data);

  }


}


