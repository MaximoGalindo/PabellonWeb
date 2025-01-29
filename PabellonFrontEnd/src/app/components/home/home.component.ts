import { Component, OnInit } from '@angular/core';
import { Catalog } from '../../models/Catalog';
import { Router } from '@angular/router';
import { NavegationService } from 'src/app/services/navegation.service';
import { CatalogService } from 'src/app/services/Entities/catalog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading: boolean = false
  catalogs: Catalog[] = []
  orderHasElements: boolean = false;
  
  constructor(private router: Router, private navegationService: NavegationService, private catalogService: CatalogService) {}

  ngOnInit() {
    const storedCatalogs = sessionStorage.getItem('catalogs');

    this.loading = true;
    if (storedCatalogs !== null) {
      this.catalogs = JSON.parse(storedCatalogs);
      this.loading = false;
    } else {
      this.catalogService.getAllCatalogs().subscribe((data) => {
        this.catalogs = data;
        sessionStorage.setItem('catalogs', JSON.stringify(this.catalogs));
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      });  
    }

    this.orderHasElements = this.navegationService.getOrderTotal();
  }

  openCatalog(catalog: Catalog) {
    if (catalog) {
      this.navegationService.setCatalog(catalog);
      this.router.navigate(['catalogo', catalog.name.toLowerCase()]);      
    }
  }




}
