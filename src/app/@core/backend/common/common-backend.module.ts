import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '../../interfaces/common/users';
import { UsersService } from './services/users.service';
import { UsersApi } from './api/users.api';
import { VersionData } from '../../interfaces/common/version';
import { VersionService } from './services/version.service';
import { VersionsApi } from './api/version.api';
import { ProjectData } from '../../interfaces/common/vtom/project';
import { ProjectService } from './services/vtom/project.service';
import { ProjectApi } from './api/vtom/project.api';
import { ConsignData } from '../../interfaces/common/vtom/consign';
import { ConsignService } from './services/vtom/consign.service';
import { PushNotificationService } from './services/pushNotif/push-notification.service';
import { ConsignApi } from './api/vtom/consign.api';
import { HttpService } from './api/http.service';

const APIs = [
  [UsersApi, HttpService],
  [VersionsApi, HttpService],
  [ProjectApi, HttpService],
  [ConsignApi, HttpService],
];

const SERVICES = [
  { provide: UserData, useClass: UsersService },
  { provide: VersionData, useClass: VersionService },
  { provide: ProjectData, useClass: ProjectService },
  { provide: ConsignData, useClass: ConsignService },

];

@NgModule({
  imports: [CommonModule],
})
export class CommonBackendModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CommonBackendModule,
      providers: [
        ...APIs,
        ...SERVICES,
        PushNotificationService
      ],
    };
  }
}
