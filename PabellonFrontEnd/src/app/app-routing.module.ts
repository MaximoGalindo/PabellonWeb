import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CatalogItemsComponent } from './components/catalog-items/catalog-items.component';
import { ProductComponent } from './components/product/product.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { AddProductComponent } from './components/ADMIN/add-product/add-product.component';
import { LoginComponent } from './components/ADMIN/login/login.component';
import { ProductManagementComponent } from './components/ADMIN/product-management/product-management.component';
import { CatalogManagementComponent } from './components/ADMIN/catalog-management/catalog-management.component';
import { authGuard } from './Guards/auth.guard';

const routes: Routes = [ 
  { path: '', redirectTo: '/home', pathMatch: 'full', data: { footer: { ShowFooter: true, title: 'Ver Pedido', ShowIcon: true, ShowSpan: true }} }, 
  { path: 'catalogo', redirectTo: '/home', pathMatch: 'full', data: { footer: { ShowFooter: true, title: 'Ver Pedido', ShowIcon: true, ShowSpan: true }} },
  
  { path: 'home', component: HomeComponent, data: { footer: { ShowFooter: true, title: 'Ver Pedido', ShowIcon: true, ShowSpan: true, NavegateTo: 'order'}} },
  { path: 'catalogo/:catalogName', component: CatalogItemsComponent , data: { footer: { ShowFooter: true, title: 'Ver Pedido', ShowIcon: true, ShowSpan: true, NavegateTo: 'order' }} },
  { path: 'catalogo/:catalogName/:productName', component: ProductComponent, data: { footer: { ShowFooter: false , ShowAddToOrder: true }} },
  { path: 'pedido' , component: OrderDetailComponent , data: { footer: { ShowFooter: true, title: 'Finalizar Pedido', ShowIcon: false, ShowSpan: false, NavegateTo: 'finish-order' }}},
  { path: 'admin/login' , component: LoginComponent },
  { path: 'admin/agregar-producto' , component: AddProductComponent, canActivate: [authGuard] },
  { path: 'admin/catalogo' , component: CatalogManagementComponent, canActivate: [authGuard] },
  { path: 'admin/login' , component: LoginComponent, canActivate: [authGuard]},
  { path: 'admin/productos/:catalogId' , component: ProductManagementComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
