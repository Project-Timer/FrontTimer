import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { NbTokenService, NbAuthJWTToken } from '@nebular/auth'
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, takeWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  user: {
    id: string,
    name: string,
    role: string
  };
  alive: boolean = true;
  userPictureOnly: boolean = false;
  userMenu: any;
  username: string;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    }
  ];

  currentTheme = 'default';

  constructor(private sidebarService: NbSidebarService,
    private cd: ChangeDetectorRef,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private tokenService: NbTokenService) {   

  }

  ngOnInit() {
       
    this.tokenService.get()
    .pipe(takeWhile(() => this.alive))
    .subscribe((token: NbAuthJWTToken) => {
      this.user = token.isValid() ? token.getPayload() : {}
      let fullname =  this.user.name
      this.username = fullname ? fullname.split(" ")[0] : "";
    });
    this.userMenu = [
      { title: 'Profil', icon: 'person-outline', link: 'auth/profile' },
      { title: 'Paramètres', icon: 'settings-2-outline', link: '' },
      { title: 'Se Déconnecter', icon: 'log-out-outline', link: '/auth/logout' },
    ];

    this.currentTheme = this.themeService.currentTheme;
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome("/pages/dashboard");
  }

  ngOnDestroy() {
    this.alive = false;
    this.destroy$.next();
    this.destroy$.complete();
  }
}
