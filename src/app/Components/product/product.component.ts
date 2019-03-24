import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from './product.model';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {forkJoin} from 'rxjs';
import {MatSnackBar} from '@angular/material';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ShoppingCartComponent]
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  @Output() productAdded = new EventEmitter<Product>();

  constructor(private shoppingCartService: ShoppingCartService, private snackbar: MatSnackBar,
              private productService: ProductService) {
  }

  ngOnInit() {
    forkJoin(
      this.productService.getAll()
    ).subscribe(([products]) => {
      this.products = products;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.snackbar.open(product.name + ' is toegevoegd aan uw winkelmand!', undefined, {duration: 5000});
    this.shoppingCartService.addToCart(product);
  }
}
