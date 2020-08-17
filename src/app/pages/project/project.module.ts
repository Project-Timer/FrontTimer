import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectRoutingModule} from './project-routing.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {ProjectFormComponent} from './project-form/project-form.component';
import {GroupListComponent} from './group-list/group-list.component';
import {ProjectBoxComponent} from './project-box/project-box.component';
import { ProjectViewComponent } from './project-view/project-view.component';


@NgModule({
  declarations: [ProjectListComponent, ProjectFormComponent, GroupListComponent, ProjectBoxComponent, ProjectViewComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NbCardModule,
    NbIconModule,
    FormsModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbAlertModule,
    NbListModule,
  ],
})
export class ProjectModule {
}
