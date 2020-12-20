import {Injectable} from '@angular/core';
import {Product} from '../Components/product/product.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cart: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private productsInCart: Product[] = [];

  constructor() {
    this.cart.subscribe(_ => this.productsInCart = _);
  }

  public addProductToCart(product: Product) {
    this.cart.next([...this.productsInCart, product]);
  }

  public getProductsFromCart(): Observable<Product[]> {
    return this.cart;
  }
}
