import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbSelectModule} from '@nebular/theme';
import {GroupListComponent} from './group-list/group-list.component';
import {GroupsRoutingModule} from './groups-routing.module';
import {GroupViewComponent} from './group-view/group-view.component';
import {FormsModule} from '@angular/forms';
import { MemberListComponent } from './member-list/member-list.component';
import { GroupBoxComponent } from './group-box/group-box.component';


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
    NbSelectModule,
  ],
  declarations: [
    GroupListComponent,
    GroupViewComponent,
    MemberListComponent,
    GroupBoxComponent,
  ],
})
export class GroupsModule {

}
