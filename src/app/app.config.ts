import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import {HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {ApplicationConfig, importProvidersFrom, inject, provideZoneChangeDetection} from "@angular/core";
import {provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation} from "@angular/router";
import { authInterceptor } from "@core/interceptors/auth.interceptor";
import { routes as appRotes} from "./app.routes";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from '@ngrx/store';
import { loginEffects } from '@pages/auth';
import { basicExampleEffects } from '@pages/basic-example';
import {provideRouterStore, routerReducer} from "@ngrx/router-store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {loginFeature} from "@pages/auth/store/user.reducer";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {AuthTokenStorageService} from "@core/services/auth-token-storage.service";
import {JwtModule} from '@auth0/angular-jwt';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {AuthService} from "@pages/auth/services/auth.service";
import {BrowserAnimationsModule, provideAnimations } from "@angular/platform-browser/animations";
import {PlatformModule} from '@angular/cdk/platform';
import {BrowserModule} from "@angular/platform-browser";
import {basicExampleFeature} from "@pages/basic-example/store/basic-example.reducer";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {ENV} from "@core/tokens/environment.token";
import {TablesService} from "@pages/basic-example/components/tables/services/tables.service";
import {SelectorsService} from "@pages/basic-example/components/selectors/services/selectors.service";


export const appConfig: ApplicationConfig = {
    providers: [
        {provide: ENV, useValue: environment},
        importProvidersFrom(BrowserModule),
        importProvidersFrom(BrowserAnimationsModule),
        importProvidersFrom(PlatformModule),
        importProvidersFrom(),
        provideRouter(appRotes,
          withComponentInputBinding(),
          withEnabledBlockingInitialNavigation()),
        provideAnimationsAsync(),
        AuthTokenStorageService,
        AuthService,
        TablesService,
        TranslateService,
        SelectorsService,
        NG_EVENT_PLUGINS,
        provideStore({
          router: routerReducer,
          [loginFeature.name]: loginFeature.reducer,
          [basicExampleFeature.name]: basicExampleFeature.reducer
        }),
        provideEffects(
          loginEffects,
          basicExampleEffects
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
          })
        ),
        provideHttpClient(
          withInterceptorsFromDi()
        ),
        provideZoneChangeDetection({ eventCoalescing: true}),
        provideHttpClient(withInterceptors([authInterceptor])),
        NG_EVENT_PLUGINS
    ]
}

export function JwtTokenGetter() {
  const token = inject(AuthTokenStorageService).getToken('access_token');
  if (!token) return "";
  return token;
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
