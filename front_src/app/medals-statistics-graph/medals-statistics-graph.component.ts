import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../state.service';

import { Chart, registerables } from 'chart.js';
import { State } from '../models/state';
import { SportService } from '../sport.service';
import { Sport } from '../models/sport';
import { CompetitionService } from '../competition.service';
import { Competition } from '../models/competition';
import { PlayerService } from '../player.service';
import { Player } from '../models/player';
Chart.register(...registerables);

//import { Chart } from 'node_modules/chart.js'

@Component({
  selector: 'app-medals-statistics-graph',
  templateUrl: './medals-statistics-graph.component.html',
  styleUrls: ['./medals-statistics-graph.component.css']
})
export class MedalsStatisticsGraphComponent implements OnInit {

  constructor(private router: Router,
    private stateService: StateService,
    private sportService: SportService,
    private competitionService: CompetitionService,
    private playerService: PlayerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log("Chart!");
    this.activatedRoute.data.subscribe(d => {
      d.breadcrumbs.forEach((b, i) => {
        if (i == 0) {
          this.breadcrumbs = b;
        } else {
          this.breadcrumbs += " > " + b;
        }
      });
    })
    this.stateService.fetchAllStatesService().subscribe(
      (states: State[]) => {
        this.statesStatistics = { "countryName": [], "totalMedals": [] };
        for (let i = 0; i < states.length; i++) {
          this.statesStatistics.countryName.push(states[i].countryName);
          this.statesStatistics.totalMedals.push(states[i].goldMedals + states[i].silverMedals + states[i].bronseMedals);
        }

        var statesChart = new Chart("chartMedalsStates", {
          type: 'bar',
          data: {
            labels: this.statesStatistics.countryName,
            datasets: [{
              label: '# medalja',
              data: this.statesStatistics.totalMedals,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              },
              xAxes: {
                ticks: {

                  autoSkip: false,
                  maxRotation: 90,
                  minRotation: 75
                }
              }

            }
          }
        });

        this.playerService.fetchAllPlayersService().subscribe(
          (players: Player[]) => {

            this.sportService.fetchAllSportsService().subscribe(
              (sports: Sport[]) => {

                this.countriesDataset = [];

                let countryPerSport: Array<{ "countryName": string, "countryStatistic": Array<{ "sportName": string, "disciplineName": string, "gender": string, "hasGold": boolean, "hasSilver": boolean, "hasBronse": boolean }> }> = [];

                states.forEach(s => {
                  this.countriesDataset.push({ "data": [], "label": s.countryName, "borderColor": '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6) });
                  countryPerSport.push({ "countryName": s.countryName, "countryStatistic": [] })
                });



                this.competitionService.fetchAllFinishedCompetitionsService().subscribe(
                  (competitions: Competition[]) => {

                    this.sportsAndDisciplines = [];

                    competitions.forEach(c => {
                      countryPerSport.forEach(cps => {
                        cps.countryStatistic.push({ "sportName": c.sportName, "disciplineName": c.disciplineName, "gender": c.gender, "hasGold": false, "hasSilver": false, "hasBronse": false });
                      });
                    })


                    competitions.forEach(c => {
                      if (c.disciplineName != null) {
                        let has: boolean = false;
                        this.sportsAndDisciplines.forEach(sAd => {
                          let s: string = c.sportName + " - " + c.disciplineName;
                          if (sAd == s) {
                            has = true;
                          }
                        });
                        if (has == false) {
                          this.sportsAndDisciplines.push(c.sportName + " - " + c.disciplineName)
                        }
                      } else {

                        let has: boolean = false;
                        this.sportsAndDisciplines.forEach(sAd => {
                          if (sAd == c.sportName) {
                            has = true;
                          }
                        });
                        if (has == false) {
                          this.sportsAndDisciplines.push(c.sportName)
                        }

                      }

                    });

                    players.forEach(p => {
                      /*") {
                        return;
                      }*/

                      if (p.disciplines != null) {

                        p.disciplines.forEach(discipline => {

                          countryPerSport.forEach(cps => {
                            if (cps.countryName == p.nationality) {

                              cps.countryStatistic.forEach(cpsCs => {
                                if (cpsCs.sportName == p.sportName && cpsCs.disciplineName == discipline && cpsCs.gender == p.gender) {
                                  if (p.goldMedals != null) {
                                    if (p.goldMedals.length != 0) {

                                      p.goldMedals.forEach(sports => {

                                        let sp: string = sports.substr(0, sports.indexOf(' '));
                                        let dp: string = sports.substr(sports.indexOf(' ') + 1);

                                        if (sp == p.sportName && dp == discipline) {

                                          cpsCs.hasGold = true;

                                        }
                                      });


                                    }
                                  }

                                  if (p.silverMedals != null) {
                                    if (p.silverMedals.length != 0) {

                                      p.silverMedals.forEach(sports => {
                                        let sp: string = sports.substr(0, sports.indexOf(' '));
                                        let dp: string = sports.substr(sports.indexOf(' ') + 1);
                                        if (sp == p.sportName && dp == discipline) {

                                          cpsCs.hasSilver = true;

                                        }
                                      });

                                    }
                                  }

                                  if (p.bronseMedals != null) {
                                    if (p.bronseMedals.length != 0) {

                                      p.bronseMedals.forEach(sports => {

                                        let sp: string = sports.substr(0, sports.indexOf(' '));
                                        let dp: string = sports.substr(sports.indexOf(' ') + 1);
                                        if (sp == p.sportName && dp == discipline) {

                                          cpsCs.hasBronse = true;

                                        }
                                      });

                                    }
                                  }

                                }
                              });
                            }

                          });

                        });

                      } else {

                        countryPerSport.forEach(cps => {
                          if (cps.countryName == p.nationality) {
                            cps.countryStatistic.forEach(cpsCs => {
                              if (cpsCs.sportName == p.sportName && cpsCs.disciplineName == null && cpsCs.gender == p.gender) {

                                if (p.goldMedals != null) {
                                  if (p.goldMedals.length != 0) {

                                    cpsCs.hasGold = true;

                                  }
                                }

                                if (p.silverMedals != null) {
                                  if (p.silverMedals.length != 0) {

                                    cpsCs.hasSilver = true;

                                  }
                                }

                                if (p.bronseMedals != null) {
                                  if (p.bronseMedals.length != 0) {

                                    cpsCs.hasBronse = true;

                                  }
                                }

                              }
                            });
                          }

                        });
                      }

                    });


                    this.countriesDataset.forEach(cd => {
                      this.sportsAndDisciplines.forEach(element => {
                        cd.data.push(0);
                      });
                    });
                    console.log("countryPerSport")
                    console.log(countryPerSport)
                    console.log("this.countriesDataset")
                    console.log(this.countriesDataset)
                    console.log("this.sportsAndDisciplines")
                    console.log(this.sportsAndDisciplines)

                    for (let i = 0; i < this.sportsAndDisciplines.length; i++) {

                      let sportName: string;
                      let disciplineName: string;

                      if (this.sportsAndDisciplines[i].includes(" - ")) {
                        sportName = this.sportsAndDisciplines[i].split(" - ")[0]
                        disciplineName = this.sportsAndDisciplines[i].split(" - ")[1]
                      } else {
                        sportName = this.sportsAndDisciplines[i]
                        disciplineName = null;
                      }
                      //console.log(sportName)
                      //console.log(disciplineName)

                      this.countriesDataset.forEach(cd => {
                        cd.label
                        countryPerSport.forEach(cps => {
                          if (cps.countryName == cd.label) {
                            //if (cps.countryName == "Francuska") {
                            cps.countryStatistic.forEach(statistics => {
                              if (statistics.sportName == sportName && statistics.disciplineName == disciplineName) {
                                if (statistics.hasGold) {
                                  cd.data[i] += 1;
                                }
                                if (statistics.hasSilver) {
                                  cd.data[i] += 1;
                                }
                                if (statistics.hasBronse) {
                                  cd.data[i] += 1;
                                }

                              }

                            });

                            //}

                          }

                        });
                      });

                    }
                    /*
                                        for (let j = 0; j < this.countriesDataset.length; j++) {
                                          for (let i = 0; i < this.sportsAndDisciplines.length; i++) {
                                            
                    
                                            countryPerSport.forEach(cps => {
                                              if(cps.countryName == this.countriesDataset[j].label){
                    
                                                cps.countryStatistic[0].sportName
                                                cps.countryStatistic[0].disciplineName
                                                cps.countryStatistic[0].gender
                    
                                              }
                                            });
                                            
                                          }
                                        }*/
                    var statesSportsChart = new Chart("chartMedalsStatesSports", {
                      type: 'line',
                      data: {
                        labels: this.sportsAndDisciplines,
                        datasets: this.countriesDataset/*[{
                          //                  label: '# of Votes',
                          data: [12, 19, 3, 5, 2, 3],
                          borderColor: 'rgba(54, 162, 235, 1)'
                        },
                        {
                          //                  label: '# of Votes',
                          data: [5, 0, 0, 7, 6, 7],
                          borderColor: 'rgba(99, 77, 235, 1)'
                        },
                        ]*/
                      },
                      options: {
                        /*tooltips: {
                          mode: 'index',
                          intersect: false
                       },*/
                        hover: {
                          mode: 'index',
                          intersect: false
                        },
                        scales: {
                          y: {
                            beginAtZero: true
                          },
                          xAxes: {
                            ticks: {
                              autoSkip: false,
                              maxRotation: 90,
                              minRotation: 75,

                            }
                          }
                        }
                      }
                    });

                  });
              })
          })


      })

  }

  breadcrumbs: string;

  statesStatistics: { "countryName": Array<string>, "totalMedals": Array<number> };

  sportsAndDisciplines: Array<string>;

  countriesDataset: Array<{ data: Array<number>, label: string, borderColor: string }>;

  finishShowingMedalsStatistics() {
    this.router.navigate(['']);
  }

}
