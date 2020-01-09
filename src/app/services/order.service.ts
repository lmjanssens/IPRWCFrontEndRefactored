import {ApiService} from './api.service';
import {Order} from '../Components/shopping-cart/order.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class OrderService extends ApiService<number, Order> {
  constructor(http: HttpClient) {
    super(http, '/bestellingen/');
  }
}
