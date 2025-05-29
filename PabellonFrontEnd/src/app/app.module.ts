import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { NavbarComponent } from './components/pageElements/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DropdownComponent } from './components/pageElements/navbar/dropdown/dropdown.component';
import { CatalogItemsComponent } from './components/catalog-items/catalog-items.component';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { FooterComponent } from './components/pageElements/footer/footer.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { AddToOrderComponent } from './components/add-to-order/add-to-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { AddProductComponent } from './components/ADMIN/add-product/add-product.component';
import { LoginComponent } from './components/ADMIN/login/login.component';
import { AdminNavbarComponent } from './components/ADMIN/admin-navbar/admin-navbar.component';
import { AdminDropdownComponent } from './components/ADMIN/admin-navbar/admin-dropdown/admin-dropdown.component';
import { ProductManagementComponent } from './components/ADMIN/product-management/product-management.component';
import { CatalogManagementComponent } from './components/ADMIN/catalog-management/catalog-management.component';
import { AuthInterceptor } from './services/interceptors/authInterceptor.service';
import { AddCatalogComponent } from './components/ADMIN/add-catalog/add-catalog.component';


@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    NavbarComponent,
    HomeComponent,
    DropdownComponent,
    CatalogItemsComponent,
    ProductComponent,
    FooterComponent,
    OrderDetailComponent,
    ConfirmOrderComponent,
    AddToOrderComponent,
    LoadingComponent,
    AddProductComponent,
    LoginComponent,
    AdminNavbarComponent,
    AdminDropdownComponent,
    ProductManagementComponent,
    CatalogManagementComponent,
    AddCatalogComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
