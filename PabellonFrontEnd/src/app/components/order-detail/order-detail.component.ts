import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseService } from 'src/app/Helpers/BaseService';
import { Options } from 'src/app/models/Options';
import { Order } from 'src/app/models/Order';
import { CustomizedProduct, Product } from 'src/app/models/Product';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  customizedProducts: CustomizedProduct[] = [];
  total: number = 0;
  private subscription: Subscription | undefined;
  order: Order = new Order();

  constructor(private navegationService: NavegationService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.navegationService.currentOrder.subscribe(order => {
      this.order = order;
      for(var orderDetail of order.orderDetail) {
        this.customizedProducts = this.customizedProducts.concat(orderDetail.customizedProducts);
        console.log(this.customizedProducts);
        
      }
      this.calculateTotal();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  getFinalProductPrice(product: Product, selectedOptions: Options[]): number {
    return product.price + selectedOptions.reduce((sum, option) => sum + option.price, 0);
  }

  removeDetail(index: number, uuid:string): void {
    this.customizedProducts.splice(index, 1);
    for(var orderDetail of this.order.orderDetail) {
      for(var customizedProduct of orderDetail.customizedProducts) {
        if(customizedProduct.id == uuid) {
          orderDetail.customizedProducts.splice(orderDetail.customizedProducts.indexOf(customizedProduct), 1);
        }
      }
    }
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.customizedProducts.reduce((sum, item) => {
      return sum + this.getFinalProductPrice(item.product, item.selectedOptions);
    }, 0);
    this.order.total = this.total;
    this.navegationService.setOrderTotal(this.total);
  }

  goBack(): void {
    this.router.navigateByUrl('/home');
  }

  getImageUrl(imagePath: string): string {
    return `${BaseService.fileUrl}${imagePath}`;
  }
}
