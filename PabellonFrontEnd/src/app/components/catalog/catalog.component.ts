import { Component, Input } from '@angular/core';
import { Catalog } from '../../models/Catalog';
import { BaseService } from 'src/app/Helpers/BaseService';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  @Input() catalog: Catalog = new Catalog();

  getImageUrl(imagePath: string): string {
    return `${BaseService.fileUrl}${imagePath}`;
  }
}
