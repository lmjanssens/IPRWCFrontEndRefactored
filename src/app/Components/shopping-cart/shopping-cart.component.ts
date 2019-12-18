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
  displayedColumns = ['name', 'price', 'delete'];
  shoppingCart: Product[] = [];
  dataSource;
  shoppingCartObservable: Observable<Product[]> = of([]);
  @Output() remove = new EventEmitter<Product>();
  totalCost: number;

  constructor(private shoppingCartService: ShoppingCartService, private dialog: MatDialog, private snackbar: MatSnackBar) {
    this.shoppingCartObservable = this.shoppingCartService.getItems();
    this.shoppingCartObservable.subscribe(_ => this.shoppingCart = _);
  }

  ngOnInit() {
    this.refreshDataSource();
  }

  refreshDataSource() {
    this.dataSource = new MatTableDataSource<Product>(this.shoppingCart);
  }

  onProductDeleted(product: Product) {
    const index = this.shoppingCart.indexOf(product);
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Verwijder product',
        message: 'Weet u zeker dat u dit product wilt verwijderen?'
      },
    }).afterClosed().subscribe(remove => {
      if (remove !== true) { return; }
      this.snackbar.open('Product verwijderd!',  undefined, {duration: 5000});
      if (index !== -1) { // If item is not present, it will delete item at -1, the last item, we need to avoid that.
        this.shoppingCart.splice(index, 1);
        this.refreshDataSource();
      }
    });
  }

  getTotalCost() {
    this.totalCost = 0;
    for (const product of this.shoppingCart) {
      this.totalCost += product.price;
    }
    return this.totalCost;
  }

  shoppingCartFilled() {
    return this.shoppingCart.length > 0;
  }
}
