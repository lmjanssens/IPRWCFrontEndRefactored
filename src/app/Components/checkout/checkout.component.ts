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
  public shoppingCart: Product[] = [];

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
  }

  private postConsumerToAPI(consumer: Consumer) {
    this.consumerService.tryToPostEntityToAPI(consumer).subscribe(
      (addedConsumer) => {
        this.postOrdersToAPI(addedConsumer);
      });
  }

  private postOrdersToAPI(consumer: Consumer) {
    try {
      this.tryToPostOrdersToAPI(consumer);
    } catch (FaultyEntityError) {
      console.error(FaultyEntityError.message);
    }
  }

  private tryToPostOrdersToAPI(consumer: Consumer) {
    this.throwFaultyEntityErrorIfShoppingCartIsUndefinedOrEmpty(this.shoppingCart);

    for (const product of this.shoppingCart) {
      const order = this.createOrderToPostToAPI(product, consumer);

      // The order table in the database serves as a junction table, stemming from a many-to-many relationship;
      // In other words: we need to post an order row for each product row.
      this.orderService.tryToPostEntityToAPI(order);
    }

    this.showPurchaseConfirmationMessage();
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
