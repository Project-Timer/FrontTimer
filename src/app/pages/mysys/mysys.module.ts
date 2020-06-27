import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {
  NbCardModule,
  NbButtonModule,
  NbCalendarKitModule,
  NbCalendarModule,
  NbCalendarRangeModule,
  NbTabsetModule,
  NbToastrModule,
  NbSpinnerModule,
  NbDialogModule,
  NbStepperModule,
  NbToastrService,
  NbDialogService
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DecisionnelRoutingModule, routedComponents } from './mysys-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    ThemeModule,
    DecisionnelRoutingModule,
    Ng2SmartTableModule,
    NgxChartsModule,
    NbCardModule, NbButtonModule, NbSpinnerModule,
    NbCalendarKitModule,
    NbCalendarModule,
    NbCalendarRangeModule,
    NbStepperModule,
    NbTabsetModule,
    NbToastrModule.forRoot(),
    NbDialogModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
    NbToastrService,
    NbDialogService
  ],
})
export class MysysModule { }
