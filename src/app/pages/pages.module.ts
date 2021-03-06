import {NgModule} from '@angular/core';
import {NbMenuModule} from '@nebular/theme';
import {NbSelectModule} from '@nebular/theme';
import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {PagesMenu} from './pages-menu';
import {GroupsModule} from './groups/groups.module';
import {ProjectModule} from './project/project.module';
import {TimerModule} from './timer/timer.module';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    NbMenuModule,
    NbSelectModule,
    GroupsModule,
    ProjectModule,
    TimerModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    PagesMenu,
  ],
})
export class PagesModule {
}
