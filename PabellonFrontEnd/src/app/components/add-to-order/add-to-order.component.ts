import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderDetail } from 'src/app/models/Order';
import { CustomizedProduct, Product } from 'src/app/models/Product';
import { AlertService } from 'src/app/services/alert.service';
import { EventBusService } from 'src/app/services/event-bus.service';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-add-to-order',
  templateUrl: './add-to-order.component.html',
  styleUrls: ['./add-to-order.component.css']
})
export class AddToOrderComponent implements OnInit {
  counter: number = 1;
  product: Product = new Product();
  catalogId: string = '';
  customizedProducts: CustomizedProduct[] = [];
  storeOpen: boolean = false;

  constructor(
    private navegationService: NavegationService,
    private router: Router,
    private alertService: AlertService 
  ) { }

  ngOnInit(): void {
    this.navegationService.currentCustomizedProducts.subscribe((customizedProducts) => {
      this.customizedProducts = customizedProducts;
      this.getTotalPrice();
    });

    this.navegationService.setProductsCount(this.counter);
    this.navegationService.currentStoreAvaible.subscribe((avaible) => {
      this.storeOpen = avaible;
    })
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
    const isValid = this.customizedProducts.every(cp => {
      if (cp.product.quantity > 1) {
        const total = cp.selectedOptions.reduce((sum, o) => sum + (o.quantity || 1), 0);
        return total === cp.product.quantity;
      }
      return true;
    });

    if (!isValid) {
      this.alertService.warning('Seleccione la cantidad requerida de productos');
      return;
    }

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

    this.router.navigateByUrl('/home');
  }

}
