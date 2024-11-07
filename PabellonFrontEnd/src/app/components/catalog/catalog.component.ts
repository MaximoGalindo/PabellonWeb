import { Component, Input } from '@angular/core';
import { Catalog } from '../../models/Catalog';
import { EventBusService } from 'src/app/services/event-bus.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  @Input() catalog:Catalog = new Catalog(); 
}
