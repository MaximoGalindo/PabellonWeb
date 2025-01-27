import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { Options, Product } from 'src/app/models/Product';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: Order = new Order();
  orderNumber: string = '4540';
  orderListSimplify: Order[] = [];

  constructor(private navegationService: NavegationService, private router: Router) { }

  ngOnInit(): void {
    this.navegationService.currentOrder.subscribe(order => this.order = order);

   /* this.order.orderDetail = [{ product: { id: 1, name: "Hamburguesa Completa Con Papas Fritas", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0, true), new Options(2, "Sin Tomate", 0, true), new Options(3, "Medallon Extra", 1200, true)] }, quantity: 3, totalPrice: 20000 },
    { product: { id: 1, name: "Hamburguesa Completa Con Papas Fritas", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0, true), new Options(2, "Sin Tomate", 0, true), new Options(3, "Medallon Extra", 1200, true)] }, quantity: 3, totalPrice: 20000 }];*/
  }

  getOptionsPrice(product: Product): number {
    let total = 0;
    product.options.forEach(option => {
      if (option.isSelected && option.price > 0)
        total += option.price;
    });
    return total;
  }

  removeDetail(detail: any) {
    {
      this.order.orderDetail.splice(this.order.orderDetail.indexOf(detail), 1);
      if(this.order.orderDetail.length === 0)
        this.order.total = 0;
      this.navegationService.setOrder(this.order);
    }
  }
}
