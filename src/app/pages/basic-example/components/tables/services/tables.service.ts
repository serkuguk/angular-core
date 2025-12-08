import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {EnvironmentInterface} from "@core/interfaces/environment.interface";
import {ENV} from "@core/tokens/environment.token";
import {AutoMapperService} from "@shared/utils/automapper/automapper";
import {usuarioMapperConfig} from "@shared/models/automapper/user_mapper_config";
import {map} from "rxjs/operators";
import {UsuarioBackendDTO} from "@shared/interfaces/automapper/user-backand-dto.interface";
import {UsuarioFrontendModel} from "@shared/interfaces/automapper/user-frontend.interface";

@Injectable()
export class TablesService {

  private http: HttpClient = inject(HttpClient);
  private env = inject<EnvironmentInterface>(ENV);
  private mapper =  inject(AutoMapperService);

  constructor() {
    // Registrar el mapeo
    this.mapper.createMap('UsuarioMapper', usuarioMapperConfig);

  }


  public getBasicTableData(): Observable<any> {
    return this.http.post(`${this.env.server_url}/basic-example/basic-table`, null)
  }

  public getDinamicTableData(): Observable<any> {
    return this.http.post(`${this.env.server_url}/basic-example/basic-table`, null)
  }

  /*public getBasicTableWithAutomapper(): Observable<any> {
    return this.http.post(`${this.env.server_url}/basic-example/basic-table`, null)
    //example 1
    .pipe(
      map((dtos, index) => {
        return dtos.map((dto, i) => {
          const mapped = this.mapper.map<UsuarioBackendDTO, UsuarioFrontendModel>(
            'UsuarioMapper',
            dto
          );
          mapped.id = i;
          return mapped;
        });
      })
    );
    //example 2
    .pipe(
      map(dto => this.mapper.map<UsuarioBackendDTO, UsuarioFrontendModel>(
        'UsuarioMapper',
        dto
      ))
  }*/
}
