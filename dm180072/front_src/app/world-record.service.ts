import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorldRecordService {

  uri = 'http://localhost:4000'


  constructor(private http: HttpClient) { }


  fetchAllWorldRecordsService() {
    return this.http.get(`${this.uri}/world-records/fetchAllWorldRecords`);
  }
}
