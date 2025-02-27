import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Consumer} from '../consumer.model';
import {ConsumerService} from '../../../services/consumer.service';
import {Product} from '../../product/product.model';

@Component({
  selector: 'app-checkout-stepper',
  templateUrl: './checkout-stepper.component.html',
  styleUrls: ['./checkout-stepper.component.css']
})
export class CheckoutStepperComponent implements OnInit {
  public consumersPersonalDetails: FormGroup;
  public consumersAddressDetails: FormGroup;
  public consumersFinancialDetails: FormGroup;
  public payingConsumer: Consumer = ConsumerService.createNew();
  @Output() public whenPayingConsumerCompletesPurchase: EventEmitter<Consumer> = new EventEmitter<Consumer>();
  @Input() public shoppingCart: Product[] = [];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.setFormGroups();
  }

  private setFormGroups() {
    this.consumersPersonalDetails = this.formBuilder.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.consumersAddressDetails = this.formBuilder.group({
      town: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required]
    });
    this.consumersFinancialDetails = this.formBuilder.group({
      creditCardNumber: ['', Validators.required],
      expiryDateMonth: [1, [Validators.required, Validators.min(1), Validators.max(12)]],
      expiryDateYear: [20, [Validators.required, Validators.min(19), Validators.max(99)]],
      cvv: ['', Validators.required]
    });
  }
}
