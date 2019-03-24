import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiCredentials} from './api-credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticated: boolean;

  constructor(private http: HttpClient) {
  }

  verifyLogin(user: string, pass: string) {
    const credentials = new ApiCredentials(user, pass);
    return new Promise((res, rej) => this.http.get(ApiService.API_ROOT + 'login', {
      headers: new HttpHeaders({
        'Authorization': credentials.toHeader(),
      }),
    }).subscribe(() => {
      ApiService.credentials = credentials;
      this.authenticated = true;
      res();
    }, rej));
  }

  isAuthenticated() {
    return this.authenticated;
  }
}
