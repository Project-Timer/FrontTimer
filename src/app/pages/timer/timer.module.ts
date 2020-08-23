import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerUserComponent } from './timer-user/timer-user.component';
import {TimerRoutingModule} from './timer-routing.module';
import {NbButtonModule, NbIconModule} from "@nebular/theme";



@NgModule({
  declarations: [TimerUserComponent],
  imports: [
    CommonModule,
    TimerRoutingModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class TimerModule { }
