import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '../../interfaces/common/users';
import { UsersService } from './services/users.service';
import { UsersApi } from './api/users.api';
import { PushNotificationService } from './services/pushNotif/push-notification.service';
import { HttpService } from './api/http.service';

const APIs = [
  [UsersApi, HttpService],
];

const SERVICES = [
  { provide: UserData, useClass: UsersService },
  
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
