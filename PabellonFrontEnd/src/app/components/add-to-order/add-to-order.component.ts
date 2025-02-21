import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderDetail } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { EventBusService } from 'src/app/services/event-bus.service';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-add-to-order',
  templateUrl: './add-to-order.component.html',
  styleUrls: ['./add-to-order.component.css']
})
export class AddToOrderComponent implements OnInit {
  counter: number = 1; 
  product:Product = new Product();
  catalogName: string = '';

  constructor(private navegationService: NavegationService, private router:Router) { }

  ngOnInit(): void {
    this.navegationService.currentProduct.subscribe((product) => {
      this.product = product;
      this.getTotalPrice();
    });

    this.navegationService.currentCatalog.subscribe(catalog => {
      this.catalogName = catalog.name;
    })

    this.navegationService.setProductsCount(this.counter);

  }

  increment(): void {
    if (this.counter < 15) {
      this.counter++;
    }
    this.navegationService.setProductsCount(this.counter);
  }

  decrement(): void {
    if (this.counter > 1) {
      this.counter--;
    }
    this.navegationService.setProductsCount(this.counter);
  }

  getTotalPrice(): number {
    return this.product.price * this.counter;
  }

  addToOrder() {
    let order: Order = new Order();
    this.navegationService.currentOrder.subscribe(o => {
      order = o;
    });

    order.orderDetail.push({
      product: this.product,
      quantity: this.counter,
      totalPrice: this.product.price * this.counter
    });
    
    order.total = order.total + this.getTotalPrice();
    
    this.navegationService.setOrder(order);
    this.router.navigateByUrl('/catalogo/' + this.catalogName.toLowerCase());
  }

}
