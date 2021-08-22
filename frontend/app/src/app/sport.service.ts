import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  fetchAllSportsService() {
    return this.http.get(`${this.uri}/sports/fetchAllSports`);
  }

  acceptSportService(sportName, disciplineName) {
    const data = {
      sportName: sportName,
      disciplineName: disciplineName,
    }

    return this.http.post(`${this.uri}/sports/acceptSport`, data);
  }
}
