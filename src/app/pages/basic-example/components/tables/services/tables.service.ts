import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../../../../../environments/environment";
import {map} from "rxjs/operators";

@Injectable()
export class TablesService {

  private http: HttpClient = inject(HttpClient);
  //private links = @Inject('ENV') environment any;

  public getBasicTableData(): Observable<any> {
    return this.http.post(`${environment.server_url}/basic-example/basic-table`, null)
  }

  public getDinamicTableData(): Observable<any> {
    return this.http.post(`${environment.server_url}/basic-example/basic-table`, null)
  }
}
