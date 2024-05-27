import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
/*import {EffectsModule} from '@ngrx/effects'
import {StoreModule} from '@ngrx/store'

import {reducers} from "@app/pages/auth/store/reducers"
import {RegistrationEffects} from '@app/pages/auth/store/effects/registration.effects'
import {LoginEffects} from '@app/pages/auth/store/effects/login.effects'
import {LogoutEffects} from "@app/pages/auth/store/effects/logout.effects";*/
import {BasicExampleRoutingModule } from './basic-example-routing.module'
import { BasicExampleComponent } from './components/basic-example/basic-example.component'
import { DynamicTableModule } from "../../shared/components/dynamic-table/dynamic-table.module";

@NgModule({
    declarations: [BasicExampleComponent],
    exports: [],
    providers: [],
    imports: [
        CommonModule,
        BasicExampleRoutingModule,
        DynamicTableModule
    ]
})
export class BasicExampleModule { }
