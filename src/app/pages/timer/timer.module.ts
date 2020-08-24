import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TimerUserComponent} from './timer-user/timer-user.component';
import {TimerRoutingModule} from './timer-routing.module';
import {NbButtonModule, NbIconModule, NbInputModule} from '@nebular/theme';
import {TimerUserRowComponent} from './timer-user-row/timer-user-row.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [TimerUserComponent, TimerUserRowComponent],
  imports: [
    CommonModule,
    TimerRoutingModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    FormsModule,
  ],
})
export class TimerModule {
}
