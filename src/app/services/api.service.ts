import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseModel} from '../base.model';
import {ApiCredentials} from './api-credentials';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export abstract class ApiService<T extends BaseModel> {
  public static readonly API_ROOT = '/api/';
  private static _credentials: ApiCredentials = new ApiCredentials();

  protected constructor(protected http: HttpClient, protected PATH: string) {
  }

  static set credentials(apiCredentials: ApiCredentials) {
    this._credentials = apiCredentials;
  }

  private static buildHttpOptions(options?: {}) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': ApiService._credentials.toHeader(),
      }),
      withCredentials: false,
      ...options,
    };
  }

  private static buildPath(path: string) {
    return ApiService.API_ROOT + (path.startsWith('/') ? path.substr(1) : path);
  }

  public getEntityFromAPI(id: number): Observable<T> {
    return this.request('GET', this.PATH + id);
  }

  public getAllEntitiesFromAPI(): Observable<T[]> {
    return this.request('GET', this.PATH);
  }

  public postEntityToAPI(entity: T): Observable<T> {
    return this.request('POST', this.PATH, entity);
  }

  private throwErrorIfMethodIsPostOrPutAndBodyIsMissing<R = T>(method: RequestMethod, body?: R) {
    if ((method === 'POST' || method === 'PUT') && !body) {
      throw new Error('Parameter body is required when using POST or PUT');
    }
  }

  protected request<R = T>(method: RequestMethod, path: string, body?: R): Observable<R> {
    this.throwErrorIfMethodIsPostOrPutAndBodyIsMissing(method, body);

    return this.http.request<R>(method, ApiService.buildPath(path), ApiService.buildHttpOptions({body}));
  }
}
