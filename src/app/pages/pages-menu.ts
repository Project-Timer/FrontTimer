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

        ],
      },

    ];
    return observableOf([...dashboardMenu/* , ...menu */]);
  }
}
