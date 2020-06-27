import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MysysComponent } from './mysys.component';
import { MeteoProjectComponent } from './meteo-project/meteo-project.component';


const routes: Routes = [{
  path: '',
  component: MysysComponent,
  children: [  
  {
    path: 'meteo-project',
    component: MeteoProjectComponent,
  },
 
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DecisionnelRoutingModule { }

export const routedComponents = [
  MysysComponent,
  MeteoProjectComponent,
  
];
