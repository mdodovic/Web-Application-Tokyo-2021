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

  addTreeScoreByIndexService(sportName, disciplineName, gender, index, score) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      index: index,
      score: score
    }
    return this.http.post(`${this.uri}/results/addTreeScoreByIndex`, data);

  }

  addTreeScratchService(sportName, disciplineName, gender, treeScratch) {

    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      treeScratch: treeScratch
    }
    return this.http.post(`${this.uri}/results/addTreeScratch`, data);

  }

  postponeEnteringFinalTimetableService(sportName, disciplineName, gender) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      timetabledEndCompetition: false,
      groupPhaseFinished: false
    }
    return this.http.post(`${this.uri}/results/postponeEnteringFinalTimetable`, data);

  }

  doneWithEnteringFinalTimetableService(sportName, disciplineName, gender) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      timetabledEndCompetition: true,
      groupPhaseFinished: false
    }
    return this.http.post(`${this.uri}/results/postponeEnteringFinalTimetable`, data);

  }

  doneWithEnteringFinalTimetableAfterGroupPhaseService(sportName, disciplineName, gender) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      timetabledEndCompetition: true,
      groupPhaseFinished: true
    }
    return this.http.post(`${this.uri}/results/postponeEnteringFinalTimetable`, data);

  }


  addTreeToGroupResultCompetitionService(sportName, disciplineName, gender, tree) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      tree: tree
    }
    return this.http.post(`${this.uri}/results/addTreeToGroupResultCompetition`, data);
  }

  addPointsAndScoreToRepresentationService(sportName, disciplineName, gender, groupNumber, nationality, points, playedPoints) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      groupNumber: groupNumber,
      nationality: nationality,
      points: points,
      playedPoints: playedPoints

    }
    return this.http.post(`${this.uri}/results/addPointsAndScoreToRepresentation`, data);

  }

  finishGroupPhaseService(sportName, disciplineName, gender) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      groupPhaseFinished: true
    }

    return this.http.post(`${this.uri}/results/finishGroupPhase`, data);

  }

  addRepresentationsToTreeService(sportName, disciplineName, gender, index, nationality1, nationality2, player1, player2) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      index: index,
      nationality1: nationality1,
      nationality2: nationality2,
      player1: player1,
      player2: player2
    }
    return this.http.post(`${this.uri}/results/addRepresentationsToTree`, data);

  }

}


