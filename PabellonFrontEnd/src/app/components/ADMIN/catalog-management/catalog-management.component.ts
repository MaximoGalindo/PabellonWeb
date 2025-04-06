import { Component } from '@angular/core';
import { Catalog } from 'src/app/models/Catalog';
import { CatalogService } from 'src/app/services/Entities/catalog.service';

@Component({
  selector: 'app-catalog-management',
  templateUrl: './catalog-management.component.html',
  styleUrls: ['./catalog-management.component.css']
})
export class CatalogManagementComponent {

  catalogs: Catalog[] = []

  constructor(private catalogService:CatalogService) {}

  ngOnInit(): void {
    this.catalogs = [
      { id: '1', name: 'Catalog 1', img: 'assets/images/hamburguesa.png' },
      { id: '1', name: 'Catalog 1', img: 'assets/images/hamburguesa.png' },
      { id: '1', name: 'Catalog 1', img: 'assets/images/hamburguesa.png' },
      { id: '1', name: 'Catalog 1', img: 'assets/images/hamburguesa.png' }
    ]
  }

  addCatalog() {
    
  }
}
