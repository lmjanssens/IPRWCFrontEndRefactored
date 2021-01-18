import {Injectable} from '@angular/core';
import {Product} from '../Components/product/product.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private shoppingCart: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private productsInShoppingCart: Product[] = [];

  constructor() {
    this.fillShoppingCartWithProducts();
  }

  public getProductsInShoppingCart() {
    this.fillShoppingCartWithProducts();

    return this.productsInShoppingCart;
  }

  private fillShoppingCartWithProducts() {
    this.shoppingCart.subscribe(products => this.productsInShoppingCart = products);
  }

  public addProductToCart(product: Product) {
    this.shoppingCart.next([...this.productsInShoppingCart, product]);
  }
}
