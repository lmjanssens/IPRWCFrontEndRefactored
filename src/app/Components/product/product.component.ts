import {Component, Input, OnInit} from '@angular/core';
import {Product} from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() products: Product[] = [
    new Product(14.99, 'Met deze gloednieuwe Texas Instruments ' +
      'wetenschappelijke rekenmachine staat u altijd klaar voor iedere berekening!',
      '../../../src/assets/img/rekenmachine.jpg', 'Texas Instruments Rekenmachine')
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
