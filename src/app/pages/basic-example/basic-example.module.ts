import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
/*import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {reducers} from "@app/pages/auth/store/reducers"
import {RegistrationEffects} from '@app/pages/auth/store/effects/registration.effects'
import {LoginEffects} from '@app/pages/auth/store/effects/login.effects'
import {LogoutEffects} from "@app/pages/auth/store/effects/logout.effects";*/
import {BasicExampleRoutingModule } from './basic-example-routing.module'
import {BasicExampleComponent} from './components/basic-example/basic-example.component'




@NgModule({
  declarations: [
    BasicExampleComponent
  ],
  imports: [
    CommonModule,
    BasicExampleRoutingModule,
    /*StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([RegistrationEffects, LoginEffects, LogoutEffects])*/
  ],
  exports: [BasicExampleComponent],
  providers: []
})
export class BasicExampleModule { }
