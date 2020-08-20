import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectViewComponent} from './project-view/project-view.component';
import {ProjectsResolve} from './project-list/projects.resolve';
import {SingleProjectResolve} from './project-view/single-project.resolve';

const routes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
    resolve: {
      projects: ProjectsResolve,
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
  ],
})
export class ProjectRoutingModule {
}
