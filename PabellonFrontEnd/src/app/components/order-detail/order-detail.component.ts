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

  total: number = 0;
  order: Order = new Order();
  orderNumber: string = '4540';

  constructor(private navegationService: NavegationService, private router: Router) { }

  ngOnInit(): void {  
    //this.order.products = [{ id: 1, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)]}];
   // { id: 1, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Medallon Extra", 1200)]},
    /*{ id: 1, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Medallon Extra", 1200)]},
    { id: 1, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Medallon Extra", 1200)]},
    { id: 1, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Medallon Extra", 1200)]},
    { id: 1, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Medallon Extra", 1200)]}]*/;
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

  removeProduct(product: Product) {
    this.order.products.splice(this.order.products.indexOf(product), 1);
    this.navegationService.setOrder(this.order);
  }
}
