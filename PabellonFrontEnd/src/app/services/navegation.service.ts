import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Catalog } from '../models/Catalog';
import { Product } from '../models/Product';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class NavegationService {
  
  private sharedCatalog = new BehaviorSubject<Catalog>(new Catalog());
  currentCatalog = this.sharedCatalog.asObservable();

  private sharedProduct = new BehaviorSubject<Product>(new Product());
  currentProduct = this.sharedProduct.asObservable(); 

  private sharedOrder = new BehaviorSubject<Order>(new Order());
  currentOrder = this.sharedOrder.asObservable();

  private sharedProductsCount = new BehaviorSubject<number>(0);
  currentProductsCount = this.sharedProductsCount.asObservable();

  constructor() { }

  setCatalog(catalog: Catalog) {
    this.sharedCatalog.next(catalog);
  }

  setProduct(product: Product) {
    this.sharedProduct.next(product);
  }

  setOrder(order: Order) {
    this.sharedOrder.next(order);
  }
  getOrderCount(): boolean {
    const currentOrder = this.sharedOrder.getValue();
    return currentOrder.products && currentOrder.products.length > 0; 
  }
  
  setProductsCount(count: number) {
    this.sharedProductsCount.next(count);
  }

}
