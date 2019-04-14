import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Consumer} from '../consumer.model';
import {ConsumerService} from '../../../services/consumer.service';

@Component({
  selector: 'app-checkout-stepper',
  templateUrl: './checkout-stepper.component.html',
  styleUrls: ['./checkout-stepper.component.css']
})
export class CheckoutStepperComponent implements OnInit {
  personalDetails: FormGroup;
  addressDetails: FormGroup;
  financialDetails: FormGroup;
  consumer: Consumer = ConsumerService.createNew();
  @Output() bought: EventEmitter<Consumer> = new EventEmitter<Consumer>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.personalDetails = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.addressDetails = this.formBuilder.group({
      town: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
    this.financialDetails = this.formBuilder.group({
      creditCardNumber: ['', Validators.required],
      expiryDateMonth: [1, [Validators.required, Validators.min(1), Validators.max(12)]],
      expiryDateYear: [20, [Validators.required, Validators.min(19), Validators.max(99)]],
      cvv: ['', Validators.required]
    });
  }

}
