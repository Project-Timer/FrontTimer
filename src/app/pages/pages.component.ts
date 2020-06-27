import { Component, OnDestroy, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { takeWhile, takeUntil } from 'rxjs/operators';
import { NbTokenService, NbAuthJWTToken } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';
import { PagesMenu } from './pages-menu';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu *ngIf="alive" [items]="menu" autoCollapse="true"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class PagesComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  menu: NbMenuItem[];
  alive: boolean = true;
  user: any;
  role: any;

  constructor(private pagesMenu: PagesMenu,
    private tokenService: NbTokenService,
  ) { }

  ngOnInit() {
    this.tokenService.tokenChange()
      .pipe(takeWhile(() => this.alive), takeUntil(this.destroy$))
      .subscribe((token: NbAuthJWTToken) => {
        this.role = token.isValid() ? token.getPayload()['role'] : 'guest'
        this.initMenu(this.role)
      });
  }
  initMenu(role) {
    this.pagesMenu.getMenu(role)
      .pipe(takeWhile(() => this.alive))
      .subscribe(menu => {
        this.menu = menu;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
