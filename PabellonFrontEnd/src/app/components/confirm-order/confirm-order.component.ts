import { Component, OnInit } from '@angular/core';
import { DeliveryOption, Order, PaymentMethod } from 'src/app/models/Order';
import { Options, Product } from 'src/app/models/Product';
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
    /*this.order = {
      id: 1,
      orderNumber: '4540',
      address: 'Calle 123',
      moreInfo: 'Casa 1',
      phone: '123456789',
      name: 'Eduardo',
      deliveryOption: DeliveryOption.Delivery,
      paymentMethod: PaymentMethod.Cash,
      date: new Date(),
      total: 10000,
      products: []
    } 
    this.order.products = [{ id: 1, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)]}];
    this.navegationService.setOrder(this.order);*/
    this.navegationService.currentOrder.subscribe(order => this.order = order);
  }

  getOptionsPrice(product: Product): number {
    let total = 0;
    product.options.forEach(option => {
      if (option.isSelected && option.price > 0)
        total += option.price;
    });
    return total;
  }

  calculateTotal(): number {
    let total = 0;
    this.order.products.forEach(product => {
      total += product.price;
    });
    if(this.order.deliveryOption === DeliveryOption.Delivery) {
      total += 700;
    }
    this.order.total = total;
    this.navegationService.setOrder(this.order);
    return total;
  }


  orderOnChange() {
    console.log(this.order);
    
    this.navegationService.setOrder(this.order);
  }

}
