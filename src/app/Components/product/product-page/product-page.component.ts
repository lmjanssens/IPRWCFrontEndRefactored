import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../product.model';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartComponent} from '../../shopping-cart/shopping-cart.component';
import {ProductComponent} from '../product.component';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  providers: [ShoppingCartComponent, ProductComponent]
})
export class ProductPageComponent implements OnInit {
  @Input() public product: Product;
  private productId: number;

  constructor(private productService: ProductService, private currentRoute: ActivatedRoute,
              private productComponent: ProductComponent) {
    this.productId = Number(this.currentRoute.snapshot.paramMap.get('productId'));
  }

  ngOnInit() {
    this.getProductFromAPI();
  }

  private getProductFromAPI() {
    this.productService.tryToGetEntityFromAPI(this.productId)
      .subscribe(fetchedProduct => {
        this.product = fetchedProduct;
      });
  }

  public onAddToShoppingCart(product: Product) {
    this.productComponent.onAddToShoppingCart(product);
  }
}
