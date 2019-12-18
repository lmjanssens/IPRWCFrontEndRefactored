import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Product} from '../product.model';
import {ShoppingCartComponent} from '../../shopping-cart/shopping-cart.component';
import {ProductService} from '../../../services/product.service';
import {MatGridList} from '@angular/material';
import {MediaChange, MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.component.html',
  styleUrls: ['./product-preview.component.css'],
  providers: [ShoppingCartComponent]
})
export class ProductPreviewComponent implements OnInit {
  @Input() products: Product[];
  @Output() productAdded: EventEmitter<Product> = new EventEmitter();


  constructor(private shoppingCartComponent: ShoppingCartComponent, private productService: ProductService,
              private observableMedia: MediaObserver) {
  }

  ngOnInit() {
  }

  onAddToShoppingCart(product: Product) {
    this.productAdded.emit(product);
  }
}
