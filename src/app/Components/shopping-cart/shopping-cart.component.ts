import {Component, OnInit} from '@angular/core';
import {Product} from '../product/product.model';
import {Observable, of} from 'rxjs';
import {ShoppingCartService} from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  displayedColumns = ['name', 'price'];
  shoppingCart: Product[] = [];
  shoppingCartObservable: Observable<Product[]> = of([]);
  totalCost: number;

  constructor(private shoppingCartService: ShoppingCartService) {
    this.shoppingCartObservable = this.shoppingCartService.getItems();
    this.shoppingCartObservable.subscribe(_ => this.shoppingCart = _);
  }

  ngOnInit() {
  }

  onProductAdded(product: Product) {
    this.shoppingCart.push(product);
    console.log(this.shoppingCart);
  }

  getTotalCost() {
    this.totalCost = 0;
    for (const product of this.shoppingCart) {
      this.totalCost += product.price;
    }
    return this.totalCost;
  }

  shoppingCartFilled() {
    return this.shoppingCart.length > 0;
  }
}
