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

  verifyLogin(user: string, pass: string) {
    const credentials = new ApiCredentials(user, pass);
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

  checkIfUserIsAuthenticated() {
    return this.userIsAuthenticated;
  }
}
