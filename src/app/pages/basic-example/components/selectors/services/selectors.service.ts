import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnvironmentInterface} from "@core/interfaces/environment.interface";
import {ENV} from "@core/tokens/environment.token";

@Injectable()
export class SelectorsService {

  private http: HttpClient = inject(HttpClient);
  private env = inject<EnvironmentInterface>(ENV);

  public getBasicDropdownData(): Observable<any> {
    return this.http.post(`${this.env.server_url}/basic-example/basic-select`, null)
  }
}
