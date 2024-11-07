import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Catalog } from 'src/app/models/Catalog';
import { Options, Product } from 'src/app/models/Product';
import { EventBusService } from 'src/app/services/event-bus.service';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-catalog-items',
  templateUrl: './catalog-items.component.html',
  styleUrls: ['./catalog-items.component.css']
})
export class CatalogItemsComponent implements OnInit {
  catalog: Catalog = new Catalog();
  orderHasElements: boolean = false;

  products: Product[] = [
    { id: 1, name: "2 Hamburguesas Completas", imageUrl: "/assets/images/hamburguesa.png", price: 12000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)]},
    { id: 2, name: "2 Hamburguesas Completas", imageUrl: "/assets/images/hamburguesa.png", price: 12000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
    { id: 3, name: "2 Hamburguesas Completas", imageUrl: "/assets/images/hamburguesa.png", price: 12000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
    { id: 4, name: "2 Hamburguesas Completas", imageUrl: "/assets/images/hamburguesa.png", price: 12000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
    { id: 5, name: "2 Hamburguesas Completas", imageUrl: "/assets/images/hamburguesa.png", price: 12000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
    { id: 6, name: "2 Hamburguesas Completas", imageUrl: "/assets/images/hamburguesa.png", price: 12000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
  ];

  constructor(private router: Router, private navegationService: NavegationService) { }

  ngOnInit() : void {
    this.navegationService.currentCatalog.subscribe(catalog => this.catalog = catalog);
    this.orderHasElements = this.navegationService.getOrderCount();
  }

  openProduct(product: any) {
    this.navegationService.setProduct(product);
    this.router.navigate(['catalogo', this.catalog.name.toLowerCase(), product.name.toLowerCase()]);
  }

  formatTextAvoidOrphans(text: string): string {
    const words = text.split(' ');
    if (words.length < 2) return text;
  
    for (let i = 0; i < words.length - 1; i++) {
      if (words[i].length <= 2) {
        words[i] = `${words[i]}\u00A0${words[i + 1]}`;
        words.splice(i + 1, 1); 
      }
    }
  
    return words.join(' ');
  }

  seeOrder() {
    this.router.navigate(['pedido']);
  }

}
