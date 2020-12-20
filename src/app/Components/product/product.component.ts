import {Component, OnInit} from '@angular/core';
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

  constructor(private shoppingCartService: ShoppingCartService, private shoppingCartConfirmationMessage: MatSnackBar,
              private productService: ProductService) {
  }

  ngOnInit() {
    forkJoin(
      this.productService.getAllDatabaseEntities()
    ).subscribe(([fetchedProducts]) => {
      this.products = fetchedProducts;
    });
  }

  onAddToShoppingCart(addedProduct: Product) {
    this.shoppingCartConfirmationMessage.open(addedProduct.name + ' is toegevoegd aan uw winkelmand!', undefined, {duration: 5000});
    this.shoppingCartService.addProductToCart(addedProduct);
  }
}
