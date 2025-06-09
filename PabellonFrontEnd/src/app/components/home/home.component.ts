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

  constructor(private router: Router, private navegationService: NavegationService, private catalogService: CatalogService) { }

  ngOnInit() {
    this.loading = true;
    this.catalogService.getAllCatalogs().subscribe({
      next: (data) => {
        this.catalogs = data;
      },
      error: (error) => {
        // Manejo de error opcional
      },
      complete: () => {
        this.loading = false;
      }
    });

    this.orderHasElements = this.navegationService.getOrderTotal();
  }

  openCatalog(catalog: Catalog) {
    if (catalog) {
      this.navegationService.setCatalog(catalog);
      this.router.navigate(['catalogo', catalog.id]);
    }
  }




}
