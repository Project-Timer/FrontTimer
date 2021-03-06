import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbAlertModule,
  NbInputModule,
  NbCheckboxModule,
  NbToastrModule,
  NbCardModule,
  NbSpinnerModule,
  NbPopoverModule,
  NbTooltipModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbSecurityModule } from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  NgxLoginComponent,
  NgxLogoutComponent,
  TinyMCEComponent,
  NgxRegisterComponent,
  NgxProfileComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import { WindowModeBlockScrollService } from './services/window-mode-block-scroll.service';
import { DEFAULT_THEME } from './styles/theme.default';
import { COSMIC_THEME } from './styles/theme.cosmic';
import { CORPORATE_THEME } from './styles/theme.corporate';
import { DARK_THEME } from './styles/theme.dark';
import { UserData } from '../@core/interfaces/common/users';
import { UsersService} from '../@core/backend/common/services/users.service';
import { UsersApi} from '../@core/backend/common/api/users.api';
import { HttpService} from '../@core/backend/common/api/http.service';




const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
  FormsModule,
  NbAlertModule,
  NbInputModule,
  NbCheckboxModule,
  NbCardModule,
  NbSpinnerModule,
  NbPopoverModule,
  NbTooltipModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  NgxLoginComponent,
  NgxLogoutComponent,
  NgxRegisterComponent,
  NgxProfileComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES, NbToastrModule.forRoot(),],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ThemeModule,
      providers: [
        UserData,
        UsersService,
        UsersApi,
        HttpService,
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [ DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME ],
        ).providers,
        WindowModeBlockScrollService,
        ...NbSidebarModule.forRoot().providers,
        ...NbMenuModule.forRoot().providers,
      ],
    };
  }
}
