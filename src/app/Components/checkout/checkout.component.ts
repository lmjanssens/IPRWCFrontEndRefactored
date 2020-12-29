import {Component, OnInit} from '@angular/core';
import {Consumer} from './consumer.model';
import {ConsumerService} from '../../services/consumer.service';
import {MatSnackBar} from '@angular/material';
import {Order} from '../shopping-cart/order.model';
import {Product} from '../product/product.model';
import {OrderService} from '../../services/order.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  providers: [ShoppingCartComponent],
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  shoppingCart: Product[] = [];

  constructor(private consumerService: ConsumerService, private orderService: OrderService,
              private purchaseConfirmationMessage: MatSnackBar, private shoppingCartService: ShoppingCartService,
              private shoppingCartComponent: ShoppingCartComponent) {
  }

  ngOnInit() {
    this.shoppingCart = this.fillShoppingCart();
  }

  private fillShoppingCart() {
    return this.shoppingCartComponent.fillShoppingCart();
  }

  private checkIfConsumerIsUndefinedOrNull(consumer: Consumer) {
    return typeof consumer === 'undefined' || consumer === null;
  }

  private checkIfShoppingCartIsUndefinedOrEmpty(shoppingCart: Product[]) {
    return typeof shoppingCart === 'undefined' || shoppingCart.length === 0;
  }

  public onPurchaseConfirmed(consumer: Consumer) {
    if (this.checkIfConsumerIsUndefinedOrNull(consumer)) {
      return;
    }

    this.postConsumer(consumer);
    this.showPurchaseConfirmationMessage();
  }

  private showPurchaseConfirmationMessage() {
    this.purchaseConfirmationMessage.open('Bestelling geplaatst!', undefined, {duration: 5000});
  }

  private postConsumer(consumer: Consumer) {
    this.consumerService.postEntityToAPI(consumer).subscribe(
      (addedConsumer) => {
        this.postOrder(addedConsumer); // TODO: orders worden niet meer gepost ofzo
      });
  }

  private createOrderToPostToAPI(product: Product, consumer: Consumer): Order {
    return {consumerId: consumer.id, productId: product.id, productName: product.name} as Order;
  }

  private postOrder(consumer: Consumer) {
    if (this.checkIfShoppingCartIsUndefinedOrEmpty(this.shoppingCart)) {
      return;
    }

    for (const product of this.shoppingCart) {
      const order = this.createOrderToPostToAPI(product, consumer);
      this.orderService.postEntityToAPI(order);
    }
  }
}
