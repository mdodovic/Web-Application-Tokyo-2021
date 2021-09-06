import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Sport } from '../models/sport';
import { WorldRecord } from '../models/worldRecord';
import { SportService } from '../sport.service';
import { WorldRecordService } from '../world-record.service';

@Component({
  selector: 'app-world-records',
  templateUrl: './world-records.component.html',
  styleUrls: ['./world-records.component.css']
})
export class WorldRecordsComponent implements OnInit {

  constructor(private worldRecordsService: WorldRecordService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.worldRecordsService.fetchAllWorldRecordsService().subscribe(
      (worldRecords: WorldRecord[]) => {
        this.worldRecords = worldRecords;
        console.log(this.worldRecords)
      });
    this.activatedRoute.data.subscribe(d => {
      d.breadcrumbs.forEach((b, i) => {
        if (i == 0) {
          this.breadcrumbs = b;
        } else {
          this.breadcrumbs += " > " + b;
        }
      });
    })
  }

  breadcrumbs: string;

  worldRecords: WorldRecord[];

  finishWorldRecordShowing() {
    this.router.navigate(['organizer'])
  }

}
