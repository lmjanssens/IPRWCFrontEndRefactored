import {Component, OnInit} from '@angular/core';
import {Consumer} from './consumer.model';
import {ConsumerService} from '../../services/consumer.service';
import {MatSnackBar} from '@angular/material';
import {Order} from '../shopping-cart/order.model';
import {Product} from '../product/product.model';
import {OrderService} from '../../services/order.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {ShoppingCartComponent} from '../shopping-cart/shopping-cart.component';
import {FaultyEntityError} from '../../exception/FaultyEntityError';

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

  public onPurchaseConfirmed(consumer: Consumer) {
    try {
      this.confirmPurchase(consumer);
    } catch (FaultyEntityError) {
      console.error(FaultyEntityError.message);
    }
  }

  public confirmPurchase(consumer: Consumer) {
    this.throwFaultyEntityErrorIfConsumerIsUndefinedOrNull(consumer);

    this.postConsumerToAPI(consumer);
    this.showPurchaseConfirmationMessage();
  }

  private postConsumerToAPI(consumer: Consumer) {
    this.consumerService.tryToPostEntityToAPI(consumer).subscribe(
      (addedConsumer) => {
        this.postOrderToAPI(addedConsumer);
      });
  }

  private postOrderToAPI(consumer: Consumer) {
    try {
      this.tryToPostOrderToAPI(consumer);
    } catch (FaultyEntityError) {
      console.error(FaultyEntityError.message);
    }
  }

  private tryToPostOrderToAPI(consumer: Consumer) {
    this.throwFaultyEntityErrorIfShoppingCartIsUndefinedOrEmpty(this.shoppingCart);

    for (const product of this.shoppingCart) {
      const order = this.createOrderToPostToAPI(product, consumer);
      this.orderService.tryToPostEntityToAPI(order);
    }
  }

  private showPurchaseConfirmationMessage() {
    this.purchaseConfirmationMessage.open('Bestelling geplaatst!', undefined, {duration: 5000});
  }

  private createOrderToPostToAPI(product: Product, consumer: Consumer): Order {
    return {consumerId: consumer.id, productId: product.id, productName: product.name} as Order;
  }

  private throwFaultyEntityErrorIfConsumerIsUndefinedOrNull(consumer: Consumer) {
    if (typeof consumer === 'undefined' || consumer === null) {
      throw new FaultyEntityError('Consumer is undefined or null!');
    }
  }

  private throwFaultyEntityErrorIfShoppingCartIsUndefinedOrEmpty(shoppingCart: Product[]) {
    if (typeof shoppingCart === 'undefined' || shoppingCart.length === 0) {
      throw new FaultyEntityError('Shopping cart is undefined or empty!');
    }
  }
}
