
import { TuiRootModule, TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, StateKey, TransferState } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from "src/environments/environment";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FooterComponent } from "./componentes/footer/footer.component";
import { BodyComponent } from "./componentes/body/body.component";
import { HeaderComponent, SidenavComponent } from "./componentes";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
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
    ] })

export class AppModule { }
