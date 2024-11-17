import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogItemsComponent } from './components/catalog-items/catalog-items.component';
import { ProductComponent } from './components/product/product.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: 'catalogo', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'catalogo/:catalogName', component: CatalogItemsComponent },
  { path: 'catalogo/:catalogName/:productName', component: ProductComponent },
  { path: 'pedido' , component: OrderDetailComponent },
  { path: 'confirmar-pedido', component: ConfirmOrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
