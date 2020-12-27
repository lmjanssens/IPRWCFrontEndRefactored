import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from '../product/product.model';
import {Observable, of} from 'rxjs';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart: Product[] = [];
  shoppingCartObservable: Observable<Product[]> = of([]);
  shoppingCartTableColumns = ['name', 'price', 'delete'];
  shoppingCartTableData: MatTableDataSource<Product>;
  @Output() whenConsumerRemovesProductFromShoppingCart = new EventEmitter<Product>();
  totalOrderCost: 0;

  constructor(private shoppingCartService: ShoppingCartService, private productRemovedConfirmationScreen: MatDialog,
              private productRemovedConfirmationMessage: MatSnackBar) {
    this.shoppingCartObservable = this.shoppingCartService.getProductsFromCart();
    this.shoppingCartObservable.subscribe(products => this.shoppingCart = products);
  }

  ngOnInit() {
    this.setUpDataTable();
  }

  setUpDataTable() {
    this.shoppingCartTableData = new MatTableDataSource<Product>(this.shoppingCart);
  }

  onProductRemoved(productToRemove: Product) {
    const index = this.shoppingCart.indexOf(productToRemove);
    this.productRemovedConfirmationScreen.open(DialogComponent, {
      data: {
        title: 'Verwijder product',
        message: 'Weet u zeker dat u dit product wilt verwijderen?'
      },
    }).afterClosed().subscribe(remove => {
      if (remove !== true) {
        return;
      }
      this.productRemovedConfirmationMessage.open('Product verwijderd!', undefined, {duration: 5000});
      if (index !== -1) { // If item is not present, it will delete item at -1, the last item, we need to avoid that.
        this.shoppingCart.splice(index, 1);
        this.setUpDataTable();
      }
    });
  }

  getTotalOrderCost() {
    for (const product of this.shoppingCart) {
      this.totalOrderCost += product.price;
    }
    return this.totalOrderCost;
  }

  shoppingCartContainsProducts() {
    return this.shoppingCart.length > 0;
  }
}
