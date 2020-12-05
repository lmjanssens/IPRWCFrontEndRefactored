import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Product} from '../product.model';
import {ShoppingCartComponent} from '../../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css'],
  providers: [ShoppingCartComponent]
})
export class ProductPreviewComponent {
  @Input() products: Product[];
  @Output() whenProductAdded: EventEmitter<Product> = new EventEmitter();

  constructor() {
  }

  onAddToShoppingCart(product: Product) {
    this.whenProductAdded.emit(product);
  }
}
