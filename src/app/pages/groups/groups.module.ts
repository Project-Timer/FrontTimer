import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbListModule} from '@nebular/theme';
import {GroupListComponent} from './group-list/group-list.component';
import {GroupsRoutingModule} from './groups-routing.module';
import { GroupViewComponent } from './group-view/group-view.component';


@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    NbLayoutModule,
    NbButtonModule,
    GroupsRoutingModule,
    NbIconModule,
  ],
  declarations: [
    GroupListComponent,
    GroupViewComponent,
  ],
})
export class GroupsModule {

}
