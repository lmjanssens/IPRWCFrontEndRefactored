import {Component, OnInit} from '@angular/core';
import {Consumer} from './consumer.model';
import {ConsumerService} from '../../services/consumer.service';
import {MatSnackBar} from '@angular/material';
import {Order} from '../shopping-cart/order.model';
import {Product} from '../product/product.model';
import {OrderService} from '../../services/order.service';
import {Observable, of} from 'rxjs';
import {ShoppingCartService} from '../../services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productsInCart: Product[] = [];
  shoppingCartObservable: Observable<Product[]> = of([]);

  constructor(private consumerService: ConsumerService, private orderService: OrderService,
              private purchaseConfirmationMessage: MatSnackBar, private shoppingCartService: ShoppingCartService) {
    this.shoppingCartObservable = this.shoppingCartService.getProductsFromCart();
    this.shoppingCartObservable.subscribe(_ => this.productsInCart = _);
  }

  ngOnInit() {

  }

  confirmPurchase(consumer: Consumer) {
    if (typeof consumer === 'undefined' || consumer === null) {
      return;
    }
    this.consumerService.postDatabaseEntity(consumer).subscribe(
      (addedConsumer) => {
        this.purchaseConfirmationMessage.open('Bestelling geplaatst!', undefined, {
          duration: 5000,
        });
        this.postOrder(addedConsumer);
      });
  }

  postOrder(consumer: Consumer) {
    if (typeof this.productsInCart === 'undefined' || this.productsInCart.length === 0) {
      return;
    }
    for (const product of this.productsInCart) {
      const order = {consumerId: consumer.id, productId: product.id, productName: product.name} as Order;
      this.orderService.postDatabaseEntity(order).subscribe((sentOrder) => {
      });
    }
  }
}
