import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  fetchAllCompetitionsService() {
    return this.http.get(`${this.uri}/competitions/fetchAllCompetitions`);
  }

  fetchByDelegateService(delegateUsername) {
    console.log(delegateUsername)
    const data = {
      delegateUsername: delegateUsername
    }

    return this.http.post(`${this.uri}/competitions/fetchByDelegate`, data);
  }

  addCompetitionService(sportName, disciplineName, initiallySingle, actAsSingle, gender,
    possibleLocations, begin, end, delegate,
    groupNumber, competitorsNumber,
    roundsNumber,
    resultType, resultFormat, rankPlayers, comment,
    participants) {

    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      initiallySingle: initiallySingle,
      actAsSingle: actAsSingle,
      gender: gender,

      possibleLocations: possibleLocations,
      begin: begin,
      end: end,
      delegate: delegate,

      groupNumber: groupNumber,
      competitorsNumber: competitorsNumber,

      roundsNumber: roundsNumber,

      resultType: resultType,
      resultFormat: resultFormat,
      rankPlayers: rankPlayers,
      comment: comment,

      participants: participants

    }

    return this.http.post(`${this.uri}/competitions/addCompetition`, data);
  }

}
