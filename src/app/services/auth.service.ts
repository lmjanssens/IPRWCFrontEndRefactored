import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiCredentials} from './api-credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userIsAuthenticated: boolean;

  constructor(private http: HttpClient) {
  }

  private static buildAuthorizationHeaders(credentials: ApiCredentials) {
    return {
      headers: new HttpHeaders({
        'Authorization': credentials.toHeader(),
      }),
    };
  }

  public verifyLogin(username: string, password: string) {
    const credentials = new ApiCredentials(username, password);

    return new Promise((resolve, reject) =>
      this.http.get(ApiService.API_ROOT + 'login', AuthService.buildAuthorizationHeaders(credentials))
        .subscribe(() => {
          ApiService.credentials = credentials;
          this.userIsAuthenticated = true;
          resolve();
        }, reject));
  }

  public checkIfUserIsAuthenticated() {
    return this.userIsAuthenticated;
  }
}
