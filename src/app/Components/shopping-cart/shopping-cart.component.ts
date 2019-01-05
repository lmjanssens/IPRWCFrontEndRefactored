import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../product/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  displayedColumns = ['price', 'name'];
  @Input() shoppingCart: Product[] = [
    new Product(14.99, 'Met deze gloednieuwe Texas Instruments ' +
      'wetenschappelijke rekenmachine staat u altijd klaar voor iedere berekening!',
      'https://i.imgur.com/CrqR9ok.png', 'Texas Instruments Rekenmachine')
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
