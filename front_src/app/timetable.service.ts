import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  fetchByLocationAndDatetimeService(location, datetime) {

    const data = {
      location: location,
      datetime: datetime
    }

    return this.http.post(`${this.uri}/timetables/fetchByLocationAndDatetime`, data);
  }

  addCompetitionService(sportName, disciplineName, gender, type, location, datetime) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender,
      type: type,
      location: location,
      datetime: datetime
    }
    return this.http.post(`${this.uri}/timetables/addTimetable`, data);
  }

  fetchAllTimetablesService() {
    return this.http.get(`${this.uri}/timetables/fetchAllTimetables`);
  }

  fetchBySportDisciplineAndGenderService(sportName, disciplineName, gender) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
      gender: gender
    }
    return this.http.post(`${this.uri}/timetables/fetchBySportDisciplineAndGender`, data);
  }

}
