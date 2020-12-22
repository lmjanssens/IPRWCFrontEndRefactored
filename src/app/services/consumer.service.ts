import {ApiService} from './api.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Consumer} from '../Components/checkout/consumer.model';

@Injectable({
  providedIn: 'root',
})

export class ConsumerService extends ApiService<Consumer> {
  constructor(http: HttpClient) {
    super(http, '/gebruikers/');
  }

  public static createNew(): Consumer {
    return new class implements Consumer {
      public id = -1;
      public postalCode = '';
      public firstName = '';
      public middleName ? = '';
      public lastName = '';
      public address = '';
      public email = '';
      public town = '';
    };
  }
}
