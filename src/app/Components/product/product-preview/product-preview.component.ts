import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from '../product.model';
import {ShoppingCartComponent} from '../../shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css'],
  providers: [ShoppingCartComponent]
})
export class ProductPreviewComponent implements OnInit {
  products: Product[] = [
    new Product(14.99, 'Met deze gloednieuwe Texas Instruments ' +
      'wetenschappelijke rekenmachine staat u altijd klaar voor iedere berekening!',
      'https://static.webshopapp.com/shops/224579/files/178375874/200x200x2/texas-instruments-ti-nspire-cx-grafische-rekenmach.jpg',
      'Texas Instruments Rekenmachine')
  ];
  @Output() productAdded = new EventEmitter<Product>();

  constructor(private shoppingCartComponent: ShoppingCartComponent) {
  }

  ngOnInit() {
  }

  onAddToShoppingCart(product: Product) {
    alert('Product toegevoegd!');
    this.productAdded.emit(product);
    this.shoppingCartComponent.onProductAdded(product);
    // return new Product(product.price, product.description, product.imagePath, product.name);
  }
}
