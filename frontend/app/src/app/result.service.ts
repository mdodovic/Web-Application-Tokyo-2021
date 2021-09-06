import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  addCompetitionService(sportName, disciplineName, gender, final, tree, group) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      final: final,
      tree: tree,
      group: group
    }
    return this.http.post(`${this.uri}/results/addResultScratch`, data);
  }

  fetchBySportDisciplineAndGenderService(sportName, disciplineName, gender) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender
    }
    return this.http.post(`${this.uri}/results/fetchBySportDisciplineAndGender`, data);
  }

  replaceFinalResultListService(sportName, disciplineName, gender, final) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      final: final
    }
    return this.http.post(`${this.uri}/results/replaceFinalResultList`, data);

  }

  addTreeScoreByIndexService(index, score) {
    const data = {
      index: index,
      score: score
    }
    return this.http.post(`${this.uri}/results/addTreeScoreByIndex`, data);

  }

  addTreeScratchService(index, player1, nationality1, player2, nationality2, score) {
    const data = {
      index: index,
      player1: player1,
      nationality1: nationality1,
      player2: player2,
      nationality2: nationality2,
      score: score
    }
    return this.http.post(`${this.uri}/results/addTreeScratch`, data);

  }


}


