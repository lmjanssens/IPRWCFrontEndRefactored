import {Injectable} from '@angular/core';
import {Product} from '../Components/product/product.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private itemsInCart: Product[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }

  public addToCart(product: Product) {
    this.itemsInCartSubject.next([...this.itemsInCart, product]);
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject;
  }
}
