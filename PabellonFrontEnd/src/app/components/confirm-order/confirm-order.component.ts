import { Component, OnInit } from '@angular/core';
import { DeliveryOption, Order, PaymentMethod } from 'src/app/models/Order';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  order:Order = new Order();
  PaymentMethod = PaymentMethod;
  DeliveryOption = DeliveryOption;
  
  constructor(
    private navegationService: NavegationService
  ) { }

  ngOnInit(): void {
    this.navegationService.currentOrder.subscribe(order => this.order = order);
  }
  
  orderOnChange() {
    this.navegationService.setFinalOrder(this.order);
  }

}
