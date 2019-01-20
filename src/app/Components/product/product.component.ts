import {Component, OnInit} from '@angular/core';
import {Product} from './product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [
    new Product(14.99, 'Met deze gloednieuwe Texas Instruments ' +
      'wetenschappelijke rekenmachine staat u altijd klaar voor iedere berekening!',
      'https://static.webshopapp.com/shops/224579/files/178375874/200x200x2/texas-instruments-ti-nspire-cx-grafische-rekenmach.jpg',
      'Texas Instruments Rekenmachine'),
    new Product(13, 'Dit is een testrun',
      'https://images.agoramedia.com/everydayhealth/cms/What-Makes-Good-Cholesterol-Go-Bad-article.jpg', 'ei')
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
