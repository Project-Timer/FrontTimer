import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbCardModule, NbLayoutModule, NbListModule} from '@nebular/theme';
import { GroupListComponent } from './group-list/group-list.component';


@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    NbLayoutModule,
  ],
  declarations: [
    GroupListComponent,
  ],
})
export class GroupsModule {

}
