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

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    NavbarComponent,
    HomeComponent,
    DropdownComponent,
    CatalogItemsComponent,
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
