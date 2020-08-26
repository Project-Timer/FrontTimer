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
          {
            title: 'GROUPS',
            link: '/pages/groups',
            icon: 'people-outline',
          },
          {
            title: 'PROJECTS',
            link: '/pages/project',
            icon: 'briefcase-outline',
          },

        ],
      },
      {
        title: 'TIMER',
        icon: 'clock-outline',
        expanded: true,
        children: [
          {
            title: 'MY TIMERS',
            link: '/pages/timer',
            icon: 'person-outline',
          },
          {
            title: 'MY STATS',
            link: '/pages/timer/my-stats',
            icon: 'bar-chart-outline',
          },

        ],
      },

    ];
    return observableOf([...dashboardMenu/* , ...menu */]);
  }
}
