import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {GroupListComponent} from './group-list/group-list.component';
import {GroupViewComponent} from './group-view/group-view.component';
import {GroupFormComponent} from './group-form/group-form.component';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent,
  },
  {
    path: 'view/:id',
    component: GroupViewComponent,
  },
  {
    path: 'add',
    component: GroupFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {
}
