import {Component, OnInit} from '@angular/core';
import {Consumer} from './consumer.model';
import {ConsumerService} from '../../services/consumer.service';
import {MatSnackBar} from '@angular/material';
import {Order} from '../shopping-cart/order.model';
import {Product} from '../product/product.model';
import {OrderService} from '../../services/order.service';
import {Observable, of} from 'rxjs';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  providers: [ShoppingCartComponent],
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  productsInCart: Product[] = [];
  shoppingCartObservable: Observable<Product[]> = of([]);

  constructor(private consumerService: ConsumerService, private orderService: OrderService,
              private purchaseConfirmationMessage: MatSnackBar, private shoppingCartService: ShoppingCartService,
              private shoppingCartComponent: ShoppingCartComponent) {
  }

  ngOnInit() {
    this.fillShoppingCart();
  }

  fillShoppingCart() {
    this.shoppingCartObservable = this.shoppingCartService.getProductsFromCart();
    this.shoppingCartObservable.subscribe(_ => this.productsInCart = _);
  }

  confirmPurchase(consumer: Consumer) {
    if (typeof consumer === 'undefined' || consumer === null) {
      return; // TODO: :thinking:
    }
    this.postConsumer(consumer);
    this.showPurchaseConfirmationMessage();
  }

  showPurchaseConfirmationMessage() {
    this.purchaseConfirmationMessage.open('Bestelling geplaatst!', undefined, {
      duration: 5000,
    });
  }

  postConsumer(consumer: Consumer) {
    this.consumerService.postEntityToAPI(consumer).subscribe(
      (addedConsumer) => {
        this.postOrder(addedConsumer); // TODO: orders worden niet meer gepost ofzo
      });
  }

  postOrder(consumer: Consumer) {
    if (typeof this.productsInCart === 'undefined' || this.productsInCart.length === 0) {
      return;
    }
    for (const product of this.productsInCart) {
      const order = {consumerId: consumer.id, productId: product.id, productName: product.name} as Order;
      this.orderService.postEntityToAPI(order);
    }
  }
}
