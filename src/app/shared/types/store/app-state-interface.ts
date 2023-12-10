import {DictionaryStateInterface} from '@app/shared/dictionary/types/dictionary-state-interface';
import {UserStateInterface} from '@app/pages/auth/types/user-state-interface';
import {EmployeeInterface} from "@app/shared/types/backend/types/employee-interface";
import {ProductInterface} from "@app/pages/products-list/components/types/product-interface";

export interface AppStateInterface {
    dictionary : DictionaryStateInterface,
    auth: UserStateInterface,
    profile: any,
    init: any,
    employees: EmployeeInterface,
    products: ProductInterface
}
