import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogItemsComponent } from './components/catalog-items/catalog-items.component';
import { ProductComponent } from './components/product/product.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { AddProductComponent } from './components/ADMIN/add-product/add-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { footer: { ShowFooter: true, title: 'Ver Pedido', ShowIcon: true, ShowSpan: true }} }, 
  { path: 'catalogo', redirectTo: '/home', pathMatch: 'full', data: { footer: { ShowFooter: true, title: 'Ver Pedido', ShowIcon: true, ShowSpan: true }} },
  
  { path: 'home', component: HomeComponent, data: { footer: { ShowFooter: true, title: 'Ver Pedido', ShowIcon: true, ShowSpan: true, NavegateTo: 'order'}} },
  { path: 'catalogo/:catalogName', component: CatalogItemsComponent , data: { footer: { ShowFooter: true, title: 'Ver Pedido', ShowIcon: true, ShowSpan: true, NavegateTo: 'order' }} },
  { path: 'catalogo/:catalogName/:productName', component: ProductComponent, data: { footer: { ShowFooter: false , ShowAddToOrder: true }} },
  { path: 'pedido' , component: OrderDetailComponent , data: { footer: { ShowFooter: true, title: 'Finalizar Pedido', ShowIcon: false, ShowSpan: false, NavegateTo: 'finish-order' }}},
  { path: 'admin/agregar-producto' , component: AddProductComponent , data: { footer: { ShowFooter: false }}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
