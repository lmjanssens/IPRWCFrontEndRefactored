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

  constructor(private shoppingCartService: ShoppingCartService, private productAddedToShoppingCartConfirmationMessage: MatSnackBar,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.getAllProductsFromAPI();
  }

  private getAllProductsFromAPI() {
    forkJoin(
      this.productService.tryToGetAllEntitiesFromAPI()
    ).subscribe(([fetchedProductsFromAPI]) => {
      this.products = fetchedProductsFromAPI;
    });
  }

  public onAddToShoppingCart(addedProduct: Product) {
    this.showProductAddedToShoppingCartConfirmationMessage(addedProduct);
    this.shoppingCartService.addProductToCart(addedProduct);
  }

  private showProductAddedToShoppingCartConfirmationMessage(addedProduct: Product) {
    this.productAddedToShoppingCartConfirmationMessage.open(addedProduct.name + ' is toegevoegd aan uw winkelmand!', undefined, {
      duration: 5000
    });
  }
}
