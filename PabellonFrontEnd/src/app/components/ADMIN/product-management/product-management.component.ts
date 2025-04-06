import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Catalog } from 'src/app/models/Catalog';
import { CatalogService } from 'src/app/services/Entities/catalog.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  products: any[] = [];
  loading: boolean = false
  showProducts: boolean = false
  catalogs: Catalog[] = []
  
  constructor(private router: Router, private catalogService:CatalogService) { }

  ngOnInit(): void {
    this.products = [
      { name: 'Product 1', price: 10, description: 'Description for Product 1' },
      { name: 'Product 2', price: 20, description: 'Description for Product 2' },
      { name: 'Product 3', price: 30, description: 'Description for Product 3' },
      { name: 'Product 4', price: 40, description: 'Description for Product 4' },
      { name: 'Product 5', price: 50, description: 'Description for Product 5' }
    ]
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
  }

  addProduct(){
    this.router.navigate(['admin/agregar-producto']);
  }

  openCatalog(catalog: Catalog) {
    //Aca se debe hacer la logica de traer los productos segun el catalogID con sus loadings y todo
    this.showProducts = true
  }

}
