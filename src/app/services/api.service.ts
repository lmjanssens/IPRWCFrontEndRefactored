import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseModel} from '../base.model';
import {ApiCredentials} from './api-credentials';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export abstract class ApiService<K, T extends BaseModel> {
  public static readonly API_ROOT = '/api/';
  private static _credentials: ApiCredentials = new ApiCredentials('student', 'studentww');
  protected constructor(protected http: HttpClient, protected PATH: string) {
  }

  static set credentials(value: ApiCredentials) {
    this._credentials = value;
  }

  private static buildOptions(options?: {}) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        'Authorization': ApiService._credentials.toHeader(),
      }),
      withCredentials: false,
      ...options,
    };
  }

  private static buildPath(path: string) {
    return ApiService.API_ROOT + (path.startsWith('/') ? path.substr(1) : path);
  }

  public getDatabaseEntity(id: number): Observable<T> {
    return this.request('GET', this.PATH + id);
  }

  public getAllDatabaseEntities(): Observable<T[]> {
    return this.request('GET', this.PATH);
  }

  public postDatabaseEntity(entity: T): Observable<T> {
    return this.request('POST', this.PATH, entity);
  }

  protected request<R = T>(method: RequestMethod, path: string, body?: R): Observable<R> {
    if ((method === 'POST' || method === 'PUT') && !body) {
      throw new Error('Parameter body is required when using POST or PUT');
    }
    return this.http.request<R>(method, ApiService.buildPath(path), ApiService.buildOptions({ body }));
  }
}
