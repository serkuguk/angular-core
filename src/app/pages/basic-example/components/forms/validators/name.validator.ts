import {inject, Injectable} from "@angular/core";
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {delay, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class NameValidator implements AsyncValidator {

  http = inject(HttpClient)

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.http.get<any[]>('localhost:4200/api/account/test_accounts')
      .pipe(
        delay(1000),
        map(users => {
          return users.filter(u => u.firstName === control.value).length > 0
            ? null
            : {nameValid: {message: `El nombre debe ser uno de la lista.: ${users.map(u => u.firstName).join(', ')}`}}
        })
      )
  }
}
