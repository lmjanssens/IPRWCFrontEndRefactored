import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiCredentials} from './api-credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userIsAuthenticated: boolean;

  constructor(private http: HttpClient) {
  }

  public verifyLogin(username: string, password: string) {
    const credentials = new ApiCredentials(username, password);
    return new Promise((resolve, reject) => this.http.get(ApiService.API_ROOT + 'login', {
      headers: new HttpHeaders({
        'Authorization': credentials.toHeader(),
      }),
    }).subscribe(() => {
      ApiService.credentials = credentials;
      this.userIsAuthenticated = true;
      resolve();
    }, reject));
  }

  public checkIfUserIsAuthenticated() {
    return this.userIsAuthenticated;
  }
}
