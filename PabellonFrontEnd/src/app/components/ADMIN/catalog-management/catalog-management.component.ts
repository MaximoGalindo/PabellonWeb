import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/Helpers/BaseService';
import { Catalog } from 'src/app/models/Catalog';
import { AlertService } from 'src/app/services/alert.service';
import { CatalogService } from 'src/app/services/Entities/catalog.service';

@Component({
  selector: 'app-catalog-management',
  templateUrl: './catalog-management.component.html',
  styleUrls: ['./catalog-management.component.css']
})
export class CatalogManagementComponent {

  catalogs: Catalog[] = []
  loading: boolean = false

  constructor(
    private catalogService: CatalogService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.getCatalogs()
  }

  getCatalogs() {
    this.loading = true;
    this.catalogService.getAllCatalogs().subscribe({
      next: (data) => {
        this.catalogs = data;
        this.loading = false;
      },
      error: (error) => {

      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  addCatalog() {
    this.router.navigate(['admin/agregar-catalogo']);
  }

  editCatalog(catalog: Catalog) {
    this.router.navigate(['admin/agregar-catalogo', catalog.id]);
  }

  deleteCatalog(catalog: Catalog) {
    this.alertService.confirm("Eliminar Catalogo", "Estas seguro de eliminar este catalogo?").then((result) => {
      if (result) {
        this.catalogService.deleteCatalog(catalog.id).subscribe({
          next: (data) => {
            this.alertService.success("Catalogo Eliminado")
            this.getCatalogs()
          },
          error: (error) => {
            this.alertService.error("Error al eliminar el catalogo")
          },
          complete: () => {
            this.loading = false;
          }
        });
      }
    });
  }

  getImageUrl(imagePath: string): string {
    return `${BaseService.fileUrl}${imagePath}`;
  }
}
