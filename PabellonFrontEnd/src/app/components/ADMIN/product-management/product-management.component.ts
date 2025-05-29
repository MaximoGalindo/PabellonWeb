import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Catalog } from 'src/app/models/Catalog';
import { Product } from 'src/app/models/Product';
import { AlertService } from 'src/app/services/alert.service';
import { CatalogService } from 'src/app/services/Entities/catalog.service';
import { ProductService } from 'src/app/services/Entities/product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  products: Product[] = [];
  loading: boolean = false
  showProducts: boolean = false
  catalogs: Catalog[] = []
  selectedCatalog: Catalog = new Catalog()
  
  constructor(
    private router: Router,
    private catalogService:CatalogService, 
    private productService: ProductService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    /*this.products = [
      { name: 'Product 1', price: 10, description: 'Description for Product 1' },
      { name: 'Product 2', price: 20, description: 'Description for Product 2' },
      { name: 'Product 3', price: 30, description: 'Description for Product 3' },
      { name: 'Product 4', price: 40, description: 'Description for Product 4' },
      { name: 'Product 5', price: 50, description: 'Description for Product 5' }
    ]*/
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
    this.selectedCatalog = catalog
    this.showProducts = true
    this.getProducts()
  }

  getProducts() {
    this.loading = true;
    this.productService.getProductByCatalogId(this.selectedCatalog.id).subscribe((data) => {
      this.products = data;
      this.loading = false;
    })
  }

  showCatalogs(){
    this.showProducts = false
    this.selectedCatalog = new Catalog()
  }

  editProduct(product:Product){
    this.router.navigate(['admin/agregar-producto', product.id]);
  }

  deleteProduct(product:Product){
    this.alertService.confirm("Eliminar Producto", "Estas seguro de eliminar este producto?").then((result) => {
      if (result) {
        this.productService.deleteProduct(product.id).subscribe({
          next: (data) => {
            this.alertService.success("Producto Eliminado")
            this.getProducts()
          },
          error: (error) => {
            this.alertService.error("Error al eliminar el producto")
          },
          complete: () => {
            this.loading = false;
          }
        }); 
      }
    });
  }

  disableProduct(product:Product){
    this.alertService.confirm("Deshabilitar Producto", "Estas seguro de deshabilitar este producto?").then((result) => {
      if (result) {
        this.productService.disableProduct(product.id).subscribe({
          next: (data) => {
            this.alertService.success("Producto Deshabilitado")
            this.getProducts()
          },
          error: (error) => {
            this.alertService.error("Error al deshabilitar el producto")
          },
          complete: () => {
            this.loading = false;
          }
        }); 
      }
    });
  }

}
