import {Injectable} from '@angular/core';
import {Product} from '../Components/product/product.model';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private shoppingCart: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private productsInCart: Product[] = [];

  constructor() {
    this.shoppingCart.subscribe(_ => this.productsInCart = _);
  }

  public addProductToCart(product: Product) {
    this.shoppingCart.next([...this.productsInCart, product]);
  }

  public getShoppingCart(): Observable<Product[]> {
    return this.shoppingCart;
  }
}
