import {ApiService} from './api.service';
import {Product} from '../Components/product/product.model';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductService extends ApiService<Product> {
  constructor(http: HttpClient) {
    super(http, '/producten/');
  }
}
