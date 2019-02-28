import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from './product.model';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ShoppingCartComponent]
})
export class ProductComponent implements OnInit {
  products: Product[] = [
    new Product(14.99, 'Met deze gloednieuwe Texas Instruments ' +
      'wetenschappelijke rekenmachine staat u altijd klaar voor iedere berekening!',
      'https://i.imgur.com/HAci3g7.jpg',
      'Texas Instruments Rekenmachine'),
    new Product(13, 'Dit is een testrun',
      'https://i.imgur.com/8DZMUiE.png', 'ei')
  ];
  @Output() productAdded = new EventEmitter<Product>();
  toShoppingCartObservable: Observable<Product[]>;

  constructor(private shoppingCartService: ShoppingCartService, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onAddToShoppingCart(product: Product) {
    // this.productAdded.emit(product);
    // this.shoppingCartComponent.onProductAdded(product);
    this.snackbar.open(product.name + ' is toegevoegd aan uw winkelmand!', undefined, {duration: 5000});
    this.shoppingCartService.addToCart(product);
  }
}
