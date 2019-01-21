import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Product} from '../product/product.model';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ShoppingCartService} from '../../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  displayedColumns = ['price', 'name'];
  shoppingCart: Product[] = [];
  shoppingCartObservable: Observable<Product[]> = of([]);

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

}
