import {Component, OnInit} from '@angular/core';
import {Consumer} from './consumer.model';
import {ConsumerService} from '../../services/consumer.service';
import {MatSnackBar} from '@angular/material';
import {Order} from '../shopping-cart/order.model';
import {Product} from '../product/product.model';
import {OrderService} from '../../services/order.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {FaultyEntityError} from '../../exception/FaultyEntityError';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  public productsInCart: Product[] = [];

  private static throwFaultyEntityErrorIfConsumerIsUndefinedOrNull(consumer: Consumer) {
    if (typeof consumer === 'undefined' || consumer === null) {
      throw new FaultyEntityError('Consumer is undefined or null!');
    }
  }

  private static throwFaultyEntityErrorIfShoppingCartIsUndefinedOrEmpty(shoppingCart: Product[]) {
    if (typeof shoppingCart === 'undefined' || shoppingCart.length === 0) {
      throw new FaultyEntityError('Shopping cart is undefined or empty!');
    }
  }

  private static createOrderToPostToAPI(product: Product, consumer: Consumer): Order {
    return {consumerId: consumer.id, productId: product.id, productName: product.name} as Order;
  }

  constructor(private consumerService: ConsumerService, private orderService: OrderService,
              private purchaseConfirmationMessage: MatSnackBar, private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.productsInCart = this.shoppingCartService.getProductsInShoppingCart();
  }

  public onPurchaseConfirmed(consumer: Consumer) {
    try {
      this.confirmPurchase(consumer);
    } catch (FaultyEntityError) {
      console.error(FaultyEntityError.message);
    }
  }

  private confirmPurchase(consumer: Consumer) {
    CheckoutComponent.throwFaultyEntityErrorIfConsumerIsUndefinedOrNull(consumer);

    this.postConsumerToAPI(consumer);
  }

  private postConsumerToAPI(consumer: Consumer) {
    this.consumerService.tryToPostEntityToAPI(consumer).subscribe(
      (addedConsumer) => {
        this.tryToPostOrdersToAPI(addedConsumer);
      });
  }

  private tryToPostOrdersToAPI(consumer: Consumer) {
    try {
      this.postOrdersToAPI(consumer);
    } catch (FaultyEntityError) {
      console.error(FaultyEntityError.message);
    }
  }

  private postOrdersToAPI(consumer: Consumer) {
    CheckoutComponent.throwFaultyEntityErrorIfShoppingCartIsUndefinedOrEmpty(this.productsInCart);

    for (const product of this.productsInCart) {
      const order = CheckoutComponent.createOrderToPostToAPI(product, consumer);

      // The order table in the database serves as a junction table, stemming from a many-to-many relationship;
      // In other words: we need to post an order row for each product row.
      this.orderService.tryToPostEntityToAPI(order);
    }

    this.showPurchaseConfirmationMessage();
  }

  private showPurchaseConfirmationMessage() {
    this.purchaseConfirmationMessage.open('Bestelling geplaatst!', undefined, {duration: 5000});
  }
}
