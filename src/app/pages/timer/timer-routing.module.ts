import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {TimerUserComponent} from './timer-user/timer-user.component';
import {TimerResolve} from '../project/project-list/timer.resolve';

const routes: Routes = [
  {
    path: '',
    component: TimerUserComponent,
    resolve: {
      timers: TimerResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    TimerResolve,
  ],
})
export class TimerRoutingModule {
}
