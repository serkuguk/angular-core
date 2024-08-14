import {HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection} from "@angular/core";
import {provideRouter, withEnabledBlockingInitialNavigation} from "@angular/router";
import { authErrorInterceptor } from "@core/services/auth/auth-error-interceptor";
import { authInterceptor } from "@core/services/auth/auth.interceptor";
import { routes as appRotes} from "./app.routes";

import { provideEffects } from "@ngrx/effects";
import { provideStore } from '@ngrx/store';
import { loginEffects, loginReducers } from '@pages/auth';
import {provideRouterStore, routerReducer} from "@ngrx/router-store";
import {provideStoreDevtools, StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {loginFeature} from "@pages/auth/store/user.reducer";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {AuthTokenStorageService} from "@core/services/auth/auth-token-storage.service";
import { JwtModule } from '@auth0/angular-jwt';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthService} from "@pages/auth/services/auth.service";

export const appConfig: ApplicationConfig = {
    providers: [
        AuthTokenStorageService,
        AuthService,
        TranslateService,
        provideStore({
          router: routerReducer,
          [loginFeature.name]: loginFeature.reducer
        }),
        provideEffects(
          loginEffects
        ),
        provideRouterStore(),
        provideStoreDevtools({
          maxAge: 25,
          logOnly: environment.production, //TODO: function for check environment (!!isDevMde())
          autoPause: true,
          trace: false,
          traceLimit: 75 //max stack trace frames to be stored (in case trace option was provided as true)
        }),
        importProvidersFrom(
        JwtModule.forRoot({
          config: {
            tokenGetter: JwtTokenGetter,
            allowedDomains: ["localhost:4200"],
            disallowedRoutes: [],
            },
          }),
        ),
        importProvidersFrom(
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          },
          defaultLanguage: 'sp'
        })),
        provideHttpClient(
          withInterceptorsFromDi()
        ),
        provideZoneChangeDetection({ eventCoalescing: true}),
        provideRouter(appRotes, withEnabledBlockingInitialNavigation()),
        provideHttpClient(withInterceptors([authInterceptor, authErrorInterceptor]))
    ]
}

export function JwtTokenGetter() {
  const token = inject(AuthTokenStorageService).getToken();
  if (!token) return "";
  return token;
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
