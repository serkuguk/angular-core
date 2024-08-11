
import { TuiRootModule, TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {inject, NgModule, StateKey, TransferState} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "src/environments/environment";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FooterComponent, BodyComponent } from "./componentes";
import { HeaderComponent, SidenavComponent } from "./componentes";
import { authInterceptor } from "./core/services/auth/auth.interceptor";
import { authErrorInterceptor } from "./core/services/auth/auth-error-interceptor";
import { AuthTokenStorageService } from "./core/services/auth/auth-token-storage.service";
import {JwtModule} from "@auth0/angular-jwt";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function JwtTokenGetter() {
  const token = inject(AuthTokenStorageService).getToken();
  if (!token) return "";
  return token;
}

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthTokenStorageService,
        //provideHttpClient(withInterceptorsFromDi()),
        provideHttpClient(withInterceptors([authInterceptor, authErrorInterceptor])),
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TuiRootModule,
        HeaderComponent,
        BodyComponent,
        FooterComponent,
        SidenavComponent,
        JwtModule.forRoot({
          config: {
            allowedDomains: ['localhost:4200', 'localhost:3000'],
            tokenGetter: JwtTokenGetter,
          }
        }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            },
            defaultLanguage: 'sp'
        }),
        StoreRouterConnectingModule.forRoot(),
        StoreModule.forRoot({ router: routerReducer }, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
    ]})

export class AppModule { }
