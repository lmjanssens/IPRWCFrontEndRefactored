import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseModel} from '../base.model';
import {ApiCredentials} from './api-credentials';
import {FaultyEntityError} from '../exception/FaultyEntityError';

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export abstract class ApiService<T extends BaseModel> {
  public static readonly API_ROOT = '/api/';
  private static _credentials: ApiCredentials = new ApiCredentials();

  protected constructor(protected http: HttpClient, protected PATH: string) {
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

  public tryToGetEntityFromAPI(id: number): Observable<T> {
    return this.sendRequestToAPI('GET', this.PATH + id);
  }

  public tryToGetAllEntitiesFromAPI(): Observable<T[]> {
    return this.sendRequestToAPI('GET', this.PATH);
  }

  public tryToPostEntityToAPI(entity: T): Observable<T> {
    try {
      return this.sendRequestToAPI('POST', this.PATH, entity);
    } catch (error) {
      console.error(error.message);
    }
  }

  private throwErrorIfMethodIsPostAndBodyIsMissing<R = T>(method: RequestMethod, body?: R) {
    if (method === 'POST' && !body) {
      throw new FaultyEntityError('Parameter body is required when using POST');
    }
  }

  protected sendRequestToAPI<R = T>(method: RequestMethod, path: string, body?: R): Observable<R> {
    this.throwErrorIfMethodIsPostAndBodyIsMissing(method, body);

    return this.http.request<R>(method, ApiService.buildPath(path), ApiService.buildHttpOptions({body}));
  }

  static set credentials(apiCredentials: ApiCredentials) {
    this._credentials = apiCredentials;
  }
}
