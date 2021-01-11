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
    const indexOfProductToRemove = this.getIndexOfProductToRemove(productToRemove);

    this.showProductRemovedConfirmationDialog(indexOfProductToRemove);
  }

  getIndexOfProductToRemove(productToRemove: Product) {
    return this.shoppingCart.indexOf(productToRemove);
  }

  showProductRemovedConfirmationDialog(indexOfProductToRemove: number) {
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
      this.removeProductFromShoppingCart(indexOfProductToRemove);
    });
  }

  showProductRemovedConfirmationMessage() {
    this.productRemovedConfirmationMessage.open('Product verwijderd!', undefined, {duration: 5000});
  }

  removeProductFromShoppingCart(indexOfProductToRemove: number) {
    if (indexOfProductToRemove !== -1) { // If item is not present, it will delete item at -1, the last item, we need to avoid that.
      this.shoppingCart.splice(indexOfProductToRemove, 1);
      this.setUpDataTable();
    }
  }

  calculateTotalOrderCost() {
    for (const product of this.shoppingCart) {
      this.totalOrderCost += product.price;
    }

    return this.totalOrderCost;
  }

  shoppingCartContainsProducts() {
    return this.shoppingCart.length > 0;
  }
}
