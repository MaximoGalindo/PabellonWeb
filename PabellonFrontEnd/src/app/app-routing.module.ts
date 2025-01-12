import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogItemsComponent } from './components/catalog-items/catalog-items.component';
import { ProductComponent } from './components/product/product.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { footer: { ShowFooter: true, title: 'Ver Pedido', ShowIcon: true, ShowSpan: true }} }, 
  { path: 'catalogo', redirectTo: '/home', pathMatch: 'full', data: { footer: { ShowFooter: true, title: 'Ver Pedido', ShowIcon: true, ShowSpan: true }} },
  
  { path: 'home', component: HomeComponent, data: { footer: { ShowFooter: true, title: 'Ver Pedido', ShowIcon: true, ShowSpan: true, NavegateTo: 'order'}} },
  { path: 'catalogo/:catalogName', component: CatalogItemsComponent , data: { footer: { ShowFooter: true, title: 'Ver Pedido', ShowIcon: true, ShowSpan: true, NavegateTo: 'order' }} },
  { path: 'catalogo/:catalogName/:productName', component: ProductComponent, data: { footer: { ShowFooter: false , ShowAddToOrder: true }} },
  { path: 'pedido' , component: OrderDetailComponent , data: { footer: { ShowFooter: true, title: 'Confirmar Pedido', ShowIcon: false, ShowSpan: false, NavegateTo: 'confirm' }}},
  { path: 'confirmar-pedido', component: ConfirmOrderComponent , data: { footer: { ShowFooter: true, title: 'Finalizar Pedido', ShowIcon: false, ShowSpan: false, NavegateTo: 'finish-order' }}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
