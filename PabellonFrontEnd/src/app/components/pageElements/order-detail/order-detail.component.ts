import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Options } from 'src/app/models/Product';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: Order = new Order();
  orderNumber: string = '1234567890';

  constructor(private navegationService: NavegationService) { }

  ngOnInit(): void {  
    this.order.products = [{ id: 1, unit: 2, name: "2 Hamburguesas Completas", imageUrl: "/assets/images/hamburguesa.png", price: 12000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)]},
    { id: 1, unit: 2, name: "2 Hamburguesas Completas", imageUrl: "/assets/images/hamburguesa.png", price: 12000, catalogId: 1, options: [new Options(1, "Medallon Extra", 0)]}];
    //this.navegationService.currentOrder.subscribe(order => this.order = order);
  }
}
