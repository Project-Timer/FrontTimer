import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupListComponent} from './group-list/group-list.component';
import {GroupViewComponent} from './group-view/group-view.component';
import {GroupsResolve} from './group-list/groups.resolve';
import {SingleGroupResolve} from './group-view/single-group.resolve';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent,
    resolve: {
      groups: GroupsResolve,
    },
  },
  {
    path: 'view/:id',
    component: GroupViewComponent,
    resolve: {
      group: SingleGroupResolve,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    GroupsResolve,
    SingleGroupResolve,
  ],
})
export class GroupsRoutingModule {
}
