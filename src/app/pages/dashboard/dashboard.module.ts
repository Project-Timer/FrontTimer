import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { AuthModule } from '../../@auth/auth.module';
import { StatusCardComponent } from './status-card/status-card.component';
import { NbSpinnerModule, NbCardModule, NbTabsetModule, NbTooltipModule, NbIconModule } from '@nebular/theme';
@NgModule({
  imports: [
    ThemeModule,
    AuthModule,
    NbCardModule,
    NbIconModule,
    NbTabsetModule,
    NbSpinnerModule,
    NbTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    StatusCardComponent
  ],
})
export class DashboardModule { }
