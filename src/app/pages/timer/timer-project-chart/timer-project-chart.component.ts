import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ngx-timer-project-chart',
  templateUrl: './timer-project-chart.component.html',
  styleUrls: ['./timer-project-chart.component.scss'],
})
export class TimerProjectChartComponent implements OnInit {
  project;
  timers;
  type = 'line';
  data = {
    labels: [],
    datasets: [
      {
        label: 'Global working time',
        backgroundColor: 'rgb(136,170,255)',
        borderColor: 'rgb(104,129,206)',
        data: [],
      },
    ],
  };
  options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.project = this.route.snapshot.data.project;
    this.timers = this.route.snapshot.data.timers;
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    this.timers = this.timers.filter(obj => {
      return obj.dateEnd !== undefined && new Date(obj.dateStart) > date;
    });

    const data = [];
    for (const timer of this.timers) {
      const diff = Math.round((new Date(timer.dateEnd).getTime() - new Date(timer.dateStart).getTime()) / 1000);
      if (data[new Date(timer.dateStart).toLocaleDateString('fr-FR')]) {
        data[new Date(timer.dateStart).toLocaleDateString('fr-FR')] += Math.round(diff / 60);
      } else {
        data[new Date(timer.dateStart).toLocaleDateString('fr-FR')] = Math.round(diff / 60);
      }
    }

    for (const [key, value] of Object.entries(data)) {
      this.data.labels.push(key);
      this.data.datasets[0].data.push(value);
    }
  }
}
