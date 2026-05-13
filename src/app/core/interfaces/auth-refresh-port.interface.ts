import { Observable } from 'rxjs';

export interface AuthRefreshResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthRefreshPort {
  refreshAccessToken(): Observable<AuthRefreshResponse>;
}
