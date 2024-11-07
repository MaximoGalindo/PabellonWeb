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
import { CollapseComponent } from './components/pageElements/collapse/collapse.component';
import { FooterComponent } from './components/pageElements/footer/footer.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    NavbarComponent,
    HomeComponent,
    DropdownComponent,
    CatalogItemsComponent,
    ProductComponent,
    CollapseComponent,
    FooterComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
