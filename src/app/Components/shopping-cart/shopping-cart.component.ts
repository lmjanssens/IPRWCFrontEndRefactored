import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from '../product/product.model';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  private productsInCart: Product[] = [];
  private totalOrderCost: 0;
  public shoppingCartTableColumns = ['name', 'price', 'delete'];
  public shoppingCartTableData: MatTableDataSource<Product>;
  @Output() public whenConsumerRemovesProductFromShoppingCart = new EventEmitter<Product>();

  constructor(private shoppingCartService: ShoppingCartService, private productRemovedConfirmationDialog: MatDialog,
              private productRemovedConfirmationMessage: MatSnackBar) {
  }

  ngOnInit() {
    this.productsInCart = this.shoppingCartService.getProductsInShoppingCart();
    this.setUpDataTable();
  }

  public onProductRemoved(productToRemove: Product) {
    this.showProductRemovedConfirmationDialog(productToRemove);
  }

  private showProductRemovedConfirmationDialog(productToRemove: Product) {
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

  private removeProductFromShoppingCart(productToRemove: Product) {
    const indexOfProductToRemove = this.getIndexOfProductToRemove(productToRemove);

    if (this.checkIfShoppingCartContainsSpecificProduct(productToRemove)) {
      this.productsInCart.splice(indexOfProductToRemove, 1);
      this.setUpDataTable();
    }
  }

  private setUpDataTable() {
    this.shoppingCartTableData = new MatTableDataSource<Product>(this.productsInCart);
  }

  private showProductRemovedConfirmationMessage() {
    this.productRemovedConfirmationMessage.open('Product verwijderd!', undefined, {duration: 5000});
  }

  private getIndexOfProductToRemove(productToRemove: Product) {
    return this.productsInCart.indexOf(productToRemove);
  }

  private checkIfShoppingCartContainsSpecificProduct(product: Product) {
    return this.productsInCart.indexOf(product) > -1;
  }

  public calculateTotalOrderCost() {
    for (const product of this.productsInCart) {
      this.totalOrderCost += product.price;
    }

    return this.totalOrderCost;
  }

  public checkIfShoppingCartContainsAnyProducts() {
    return this.productsInCart.length > 0;
  }
}
