import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule} from '@nebular/theme';
import {GroupListComponent} from './group-list/group-list.component';
import {GroupsRoutingModule} from './groups-routing.module';
import {GroupViewComponent} from './group-view/group-view.component';
import {FormsModule} from '@angular/forms';
import { MemberListComponent } from './member-list/member-list.component';


@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    NbLayoutModule,
    NbButtonModule,
    GroupsRoutingModule,
    NbIconModule,
    FormsModule,
    NbInputModule,
  ],
  declarations: [
    GroupListComponent,
    GroupViewComponent,
    MemberListComponent,
  ],
})
export class GroupsModule {

}
