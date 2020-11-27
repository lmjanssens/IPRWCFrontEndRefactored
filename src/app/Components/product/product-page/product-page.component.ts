import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../product.model';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {ShoppingCartComponent} from '../../shopping-cart/shopping-cart.component';
import {MatSnackBar} from '@angular/material';
import {ShoppingCartService} from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  providers: [ShoppingCartComponent]
})
export class ProductPageComponent implements OnInit {
  @Input() product: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute,
              private snackbar: MatSnackBar, private shoppingCartService: ShoppingCartService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productService.get(Number(params.get('supplierid')))
        .subscribe(fetchedProduct => {
          this.product = fetchedProduct;
        });
    });
  }

  onAddToShoppingCart(product: Product) {
    this.snackbar.open(product.name + ' is toegevoegd aan uw winkelmand!', undefined, {duration: 5000});
    this.shoppingCartService.addToCart(product);
  }
}
