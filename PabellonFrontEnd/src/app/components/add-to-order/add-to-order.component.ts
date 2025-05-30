import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderDetail } from 'src/app/models/Order';
import { CustomizedProduct, Product } from 'src/app/models/Product';
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
  customizedProducts: CustomizedProduct[] = [];

  constructor(
    private navegationService: NavegationService, 
    private router:Router,
    private eventBus: EventBusService
  ) { }

  ngOnInit(): void {
    this.navegationService.currentCustomizedProducts.subscribe((customizedProducts) => {
      this.customizedProducts = customizedProducts;
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
    return this.customizedProducts.reduce((acc, cp) => acc + cp.getTotalPrice(), 0);
  }

  addToOrder() {
    let order: Order = new Order();
    this.navegationService.currentOrder.subscribe(o => {
      order = o;
    });

    let orderDetail = new OrderDetail();
    orderDetail.customizedProducts = this.customizedProducts;
    orderDetail.productName = this.product.name;
    orderDetail.totalDetail = this.getTotalPrice();
    order.orderDetail.push(orderDetail);
   
    order.total = order.total + this.getTotalPrice();
    
    this.navegationService.setOrder(order);
    this.navegationService.setOrderTotal(order.total);
    
    this.router.navigateByUrl('/catalogo/' + this.catalogName.toLowerCase());
  }

}
