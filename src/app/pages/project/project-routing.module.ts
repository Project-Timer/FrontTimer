import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectViewComponent} from './project-view/project-view.component';
import {ProjectsResolve} from './project-list/projects.resolve';
import {SingleProjectResolve} from './project-view/single-project.resolve';
import {TimerResolve} from './project-list/timer.resolve';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    resolve: {
      projects: ProjectsResolve,
      timer: TimerResolve,
    },
  },
  {
    path: 'view/:id',
    component: ProjectViewComponent,
    resolve: {
      project: SingleProjectResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ProjectsResolve,
    SingleProjectResolve,
    TimerResolve,
  ],
})
export class ProjectRoutingModule {
}
