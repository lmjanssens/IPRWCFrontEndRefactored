import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Consumer} from './consumer.model';
import {ConsumerService} from '../../services/consumer.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private consumerService: ConsumerService, private snackbar: MatSnackBar) {
  }

  ngOnInit() {

  }

  onPurchase(consumer: Consumer) {
    this.consumerService.add(consumer).subscribe(
      (add) => {
        this.snackbar.open(consumer.firstName + ' is toegevoegd!', undefined, {
          duration: 5000,
        });
      });
  }
}
