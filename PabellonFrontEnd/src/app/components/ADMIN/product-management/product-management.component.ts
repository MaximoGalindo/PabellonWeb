import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { BaseService } from 'src/app/Helpers/BaseService';
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
  searchTerm: string = ''
  searchTermChanged: Subject<string> = new Subject<string>();

  constructor(
    private router: Router,
    private catalogService: CatalogService,
    private productService: ProductService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.searchTermChanged
      .pipe(debounceTime(500))
      .subscribe(searchText => {
        this.searchProduct(searchText);
      });

    this.loading = true;
    this.catalogService.getAllCatalogs().subscribe((data) => {
      this.catalogs = data;
      this.loading = false;
    },
      (error) => {
        this.loading = false;
      });
  }

  addProduct() {
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
    this.productService.getProductByCatalogId(this.selectedCatalog.id, false).subscribe((data) => {
      this.products = data;
      this.loading = false;
    })
  }

  showCatalogs() {
    this.showProducts = false
    this.selectedCatalog = new Catalog()
  }

  editProduct(product: Product) {
    this.router.navigate(['admin/agregar-producto', product.id]);
  }

  deleteProduct(product: Product) {
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

  disableProduct(product: Product) {
    const accion = product.disabled ? 'habilitar' : 'deshabilitar';
    const titulo = product.disabled ? 'Habilitar Producto' : 'Deshabilitar Producto';
    const mensaje = `¿Estás seguro de que deseas ${accion} este producto?`;
    const mensajeExito = `Producto ${product.disabled ? 'Habilitado' : 'Deshabilitado'}`;
    const mensajeError = `Error al ${accion} el producto`;

    this.alertService.confirm(titulo, mensaje).then((result) => {
      if (result) {
        this.productService.disableProduct(product.id).subscribe({
          next: () => {
            this.alertService.success(mensajeExito);
            this.getProducts();
          },
          error: () => {
            this.alertService.error(mensajeError);
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
    });
  }


  onSearchInput() {
    this.searchTermChanged.next(this.searchTerm);
  }

  searchProduct(searchTerm: string) {
    if (searchTerm == '') {
      this.getProducts();
      return
    }
    this.loading = true;
    this.productService.getProductByName(this.selectedCatalog.id, searchTerm)
      .subscribe((data) => {
        const idsFiltrados = data.map(p => p.id);

        this.products = this.products.filter(product =>
          idsFiltrados.includes(product.id)
        );

        this.loading = false;
      });
  }

  getImageUrl(imagePath: string): string {
    return `${BaseService.fileUrl}${imagePath}`;
  }
}
