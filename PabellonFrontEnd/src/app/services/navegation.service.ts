import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Catalog } from '../models/Catalog';
import { CustomizedProduct, Product } from '../models/Product';
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

  private sharedCustomizedProducts = new BehaviorSubject<CustomizedProduct[]>([]);
  currentCustomizedProducts = this.sharedCustomizedProducts.asObservable();

  private sharedOrderTotal = new BehaviorSubject<number>(0);
  currentOrderTotal = this.sharedOrderTotal.asObservable();

  private sharedFinalOrder = new BehaviorSubject<Order>(new Order());
  currentFinalOrder = this.sharedFinalOrder.asObservable();

  private storeAvaible = new BehaviorSubject<boolean>(false);
  currentStoreAvaible = this.storeAvaible.asObservable();

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

  setFinalOrder(order: Order) {
    this.sharedFinalOrder.next(order);
  }

  getOrderTotal(): boolean {
    const currentOrder = this.sharedOrder.getValue();
    return currentOrder.total > 0;
  }
  
  setProductsCount(count: number) {
    this.sharedProductsCount.next(count);
  }

  setCustomizedProductsCount(customizedProducts: CustomizedProduct[]) {
    this.sharedCustomizedProducts.next(customizedProducts);
  }

  setOrderTotal(total: number) {
    this.sharedOrderTotal.next(total);
  }

  setStoreAvaible(avaible: boolean) {
    this.storeAvaible.next(avaible);
  }

}
