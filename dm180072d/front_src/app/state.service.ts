import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }


  addMedalService(countryName, medal) {
    const data = {
      countryName: countryName,
      medal: medal,
    }

    return this.http.post(`${this.uri}/state/addMedal`, data);
  }

  fetchAllStatesService() {
    return this.http.get(`${this.uri}/state/fetchAllStates`);
  }


}
