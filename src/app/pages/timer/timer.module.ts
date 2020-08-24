import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimerUserComponent} from './timer-user/timer-user.component';
import {TimerRoutingModule} from './timer-routing.module';
import {NbButtonModule, NbIconModule, NbInputModule} from '@nebular/theme';
import {TimerUserRowComponent} from './timer-user-row/timer-user-row.component';
import {FormsModule} from '@angular/forms';
import { TimerUserChartComponent } from './timer-user-chart/timer-user-chart.component';
import {ChartModule} from 'angular2-chartjs';
import {TimerProjectChartComponent} from './timer-project-chart/timer-project-chart.component';


@NgModule({
  declarations: [TimerUserComponent, TimerUserRowComponent, TimerUserChartComponent, TimerProjectChartComponent],
  imports: [
    CommonModule,
    TimerRoutingModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    FormsModule,
    ChartModule,
  ],
})
export class TimerModule {
}
