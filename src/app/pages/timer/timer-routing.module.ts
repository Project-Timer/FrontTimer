import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TimerUserComponent} from './timer-user/timer-user.component';
import {TimerResolve} from '../project/project-list/timer.resolve';
import {TimerUserChartComponent} from './timer-user-chart/timer-user-chart.component';
import {TimerProjectResolve} from './timer-project-chart/timer-project.resolve';
import {SingleProjectResolve} from '../project/project-view/single-project.resolve';
import {TimerProjectChartComponent} from './timer-project-chart/timer-project-chart.component';

const routes: Routes = [
  {
    path: '',
    component: TimerUserComponent,
    resolve: {
      timers: TimerResolve,
    },
  },
  {
    path: 'my-stats',
    component: TimerUserChartComponent,
    resolve: {
      timers: TimerResolve,
    },
  },
  {
    path: 'stats-project/:id',
    component: TimerProjectChartComponent,
    resolve: {
      project: SingleProjectResolve,
      timers: TimerProjectResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    TimerResolve,
    TimerProjectResolve,
    SingleProjectResolve,
  ],
})
export class TimerRoutingModule {
}
