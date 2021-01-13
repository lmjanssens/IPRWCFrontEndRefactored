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
  private shoppingCart: Product[] = [];
  private shoppingCartObservable: Observable<Product[]> = of([]);
  private totalOrderCost: 0;
  public shoppingCartTableColumns = ['name', 'price', 'delete'];
  public shoppingCartTableData: MatTableDataSource<Product>;
  @Output() public whenConsumerRemovesProductFromShoppingCart = new EventEmitter<Product>();

  constructor(private shoppingCartService: ShoppingCartService, private productRemovedConfirmationDialog: MatDialog,
              private productRemovedConfirmationMessage: MatSnackBar) {
  }

  ngOnInit() {
    this.shoppingCart = this.fillShoppingCart();
    this.setUpDataTable();
  }

  setUpDataTable() {
    this.shoppingCartTableData = new MatTableDataSource<Product>(this.shoppingCart);
  }

  fillShoppingCart() {
    this.shoppingCartObservable = this.shoppingCartService.getShoppingCart();
    this.shoppingCartObservable.subscribe(products => this.shoppingCart = products);

    return this.shoppingCart;
  }

  onProductRemoved(productToRemove: Product) {
    this.showProductRemovedConfirmationDialog(productToRemove);
  }

  showProductRemovedConfirmationDialog(productToRemove: Product) {
    this.productRemovedConfirmationDialog.open(DialogComponent, {
      data: {
        title: 'Verwijder product',
        message: 'Weet u zeker dat u dit product wilt verwijderen?'
      },
    }).afterClosed().subscribe(userWantsToRemoveProduct => {
      if (userWantsToRemoveProduct !== true) {
        return;
      }

      this.showProductRemovedConfirmationMessage();
      this.removeProductFromShoppingCart(productToRemove);
    });
  }

  showProductRemovedConfirmationMessage() {
    this.productRemovedConfirmationMessage.open('Product verwijderd!', undefined, {duration: 5000});
  }

  removeProductFromShoppingCart(productToRemove: Product) {
    const indexOfProductToRemove = this.getIndexOfProductToRemove(productToRemove);

    if (this.checkIfShoppingCartContainsSpecificProduct(productToRemove)) {
      this.shoppingCart.splice(indexOfProductToRemove, 1);
      this.setUpDataTable();
    }
  }

  getIndexOfProductToRemove(productToRemove: Product) {
    return this.shoppingCart.indexOf(productToRemove);
  }

  checkIfShoppingCartContainsSpecificProduct(product: Product) {
    return this.shoppingCart.indexOf(product) > -1;
  }

  calculateTotalOrderCost() {
    for (const product of this.shoppingCart) {
      this.totalOrderCost += product.price;
    }

    return this.totalOrderCost;
  }

  checkIfShoppingCartContainsAnyProducts() {
    return this.shoppingCart.length > 0;
  }
}
