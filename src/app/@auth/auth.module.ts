import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  NbAuthJWTInterceptor,
  NbAuthModule,
  NbPasswordAuthStrategy,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbTokenLocalStorage
} from '@nebular/auth';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { environment } from '../../environments/environment';
import { AuthPipe } from './auth.pipe';
import { RoleProvider } from './role.provider';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { NbAuthJWTToken } from '@nebular/auth'


const GUARDS = [AuthGuard, AdminGuard];
const PIPES = [AuthPipe];

export function filterInterceptorRequest(req: HttpRequest<any>): boolean {
  return ['/auth/login', '/auth/sign-up', '/auth/request-pass']
    .some(url => req.url.includes(url));
}

@NgModule({
  declarations: [...PIPES],
  imports: [
    CommonModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          // baseEndpoint: environment.apiUrl,
          baseEndpoint: 'https://workandout.herokuapp.com',
          login: {
            endpoint: '/login',
            method: 'post',
            redirect:{
              success: '/pages/dashboard',
              failure: '/auth/login',
            },
          },
          register: {
            endpoint: '/register',
            method: 'post',
            redirect: {
              success: '/',
              failure: '/auth/register',
            },
            defaultErrors: ["Une erreur s'est produite. Veuillez réessayer"],
            defaultMessages: ['Vous êtes bien enregistré'],
          },
          logout: {
            endpoint: '/logout',
            method: 'get',
            redirect: {
              success: '/login',
              failure: '/',
            },
          },
          requestPass: {
            endpoint: '/request-pass',
            method: 'post',
            redirect: {
              success: '/',
              failure: '/auth/request-pass',
            },
            defaultErrors: ["Une erreur s'est produite. Veuillez réessayer"],
            defaultMessages: ['Vous êtes bien enregistré'],
          },
          resetPass: {
            endpoint: '/reset-pass',
            method: 'post',
            redirect: {
              success: '/',
              failure: '/auth/reset-pass',
            },
            defaultErrors: ["Une erreur s'est produite. Veuillez réessayer"],
            defaultMessages: ['Vous êtes bien enregistré'],
          },
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 1200, // delay before redirect after a successful login, while success message is shown to the user
          strategy: 'email',  // strategy id key.
          rememberMe: false,   // whether to show or not the `rememberMe` checkbox
          showMessages: {     // show/not show success/error messages
            success: true,
            error: true,
          },
          logout: {
            redirectDelay: 300
          }
        }
      },
    }),
  ],
  exports: [...PIPES],
  providers: [
    NbSecurityModule.forRoot({
      accessControl: {
        guest: {
        },
        user: {
          parent: 'guest',
          view: ['devices', 'orders'],
          edit: ['devices', 'orders'],
        },
        admin: {
          parent: 'user',
          view: ['devices', 'orders', 'users'],
          edit: ['devices', 'orders', 'users'],
        },
      },
    }).providers,
    {
      provide: NbRoleProvider, useClass: RoleProvider,
    },
    {
      provide: NbTokenLocalStorage, useClass: NbTokenLocalStorage,
    },
  ],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: AuthModule,
      providers: [
        { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
        { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        ...GUARDS
      ],
    };
  }
}
