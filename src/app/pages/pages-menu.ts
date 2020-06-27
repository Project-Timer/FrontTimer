import { NbMenuItem } from '@nebular/theme';
import { of as observableOf, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PagesMenu {

  getMenu(role): Observable<NbMenuItem[]> {
    const dashboardMenu = [
      
      {
        title: 'DASHBOARD',
        icon: 'npm-outline',
        expanded: true,
        children: [
          {
            title: 'HOME',
            link: '/pages/dashboard',
            icon: 'home-outline',
          },
        
        ],
      },
      {
        title: 'RESOURCES',
        icon: 'calendar-outline',
        expanded: true,
        children: [
          {
            title: 'time entry by user',
            link: '/pages/mysys/meteo-project',
            icon: 'people-outline',
          },
          {
            title: 'time entry by project',
            link: '/pages/mysys/meteo-project',
            icon: 'people-outline',
          },
         
        ],
      },
      {
        title: 'PROJECT',
        icon: 'npm-outline',
        expanded: true,
        // children: [
        //   {
        //     title: 'HOME',
        //     link: '/pages/dashboard',
        //     icon: 'home-outline',
        //   },
        
        // ],
      },
      
    ];
    return observableOf([...dashboardMenu/* , ...menu */]);
  }
}
