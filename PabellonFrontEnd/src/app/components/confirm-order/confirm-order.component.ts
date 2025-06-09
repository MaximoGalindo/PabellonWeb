import { Component, OnInit } from '@angular/core';
import { DeliveryOption, Order, PaymentMethod } from 'src/app/models/Order';
import { EventBusService } from 'src/app/services/event-bus.service';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.css']
})
export class ConfirmOrderComponent implements OnInit {

  order: Order = new Order();
  PaymentMethod = PaymentMethod;
  DeliveryOption = DeliveryOption;
  submitted = false;

  constructor(
    private navegationService: NavegationService,
    private eventBus: EventBusService
  ) { }

  ngOnInit(): void {
    this.navegationService.currentOrder.subscribe(order => this.order = order);

    this.eventBus.onEvent().subscribe(event => {
      if (event?.key === 'chekFinishOrder') {
        this.submitted = true;
        if (this.isOrderValid()) {
          this.eventBus.emitEvent('finishOrder', null);
        }
      }
    });
  }

  orderOnChange() {
    this.navegationService.setFinalOrder(this.order);
  }

  isOrderValid(): boolean {
    if (!this.order.name?.trim()) return false;
    if (!this.order.phone) return false;
    if (!this.order.paymentMethod) return false;
    if (!this.order.deliveryOption) return false;

    if (this.order.deliveryOption === DeliveryOption.Delivery) {
      if (!this.order.address?.trim()) return false;
    }

    return true;
  }

}
