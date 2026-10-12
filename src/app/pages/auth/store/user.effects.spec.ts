import {HttpErrorResponse} from '@angular/common/http';
import {Actions} from '@ngrx/effects';
import {Router} from '@angular/router';
import {of, throwError} from 'rxjs';
import {AuthService} from '@core/services/auth/auth.service';
import {ErrorParserService} from '@core/services/error-parser.service';
import * as UserActions from './user.actions';
import {init, login} from './user.effects';

describe('user effects', () => {
  const user = {username: 'demo', roleId: 'admin', access_token: 'access', role: 'admin'};

  it('restores a valid persisted session and resets a missing one', () => {
    const authService = {init: jest.fn()
      .mockReturnValueOnce(of({authenticated: true, user}))
      .mockReturnValueOnce(of({authenticated: false, user: null}))} as unknown as AuthService;
    const parser = {parseHttpError: jest.fn()} as unknown as ErrorParserService;
    const result: unknown[] = [];

    init(new Actions(of(UserActions.init(), UserActions.init())), authService, parser)
      .subscribe(action => result.push(action));

    expect(result).toEqual([
      UserActions.initAuthorized({access_token: true, user}),
      UserActions.initUnauthorized({error: ''}),
    ]);
  });

  it('parses a login transport error once before storing its safe message', () => {
    const error = new HttpErrorResponse({status: 500, statusText: 'Server Error', error: null});
    const authService = {login: jest.fn(() => throwError(() => error))} as unknown as AuthService;
    const parser = {parseHttpError: jest.fn(() => ({message: 'Servicio no disponible'}))} as unknown as ErrorParserService;
    const router = {navigate: jest.fn()} as unknown as Router;
    const result: unknown[] = [];

    login(new Actions(of(UserActions.login({username: 'demo', password: 'wrong'}))), authService, router, parser)
      .subscribe(action => result.push(action));

    expect(parser.parseHttpError).toHaveBeenCalledTimes(1);
    expect(parser.parseHttpError).toHaveBeenCalledWith(error);
    expect(result).toEqual([UserActions.loginError({error: 'Servicio no disponible'})]);
  });
});
