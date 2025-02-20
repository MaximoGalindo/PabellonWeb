import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Catalog } from 'src/app/models/Catalog';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/Entities/product.service';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-catalog-items',
  templateUrl: './catalog-items.component.html',
  styleUrls: ['./catalog-items.component.css']
})
export class CatalogItemsComponent implements OnInit {

  loading: boolean = false;
  catalog: Catalog = new Catalog();
  orderHasElements: boolean = false;
  products: Product[] = [];

  /*products: Product[] = [
    { id: 2, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
    { id: 1, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)]},
    { id: 3, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
    { id: 4, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
    { id: 5, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
    { id: 6, name: "Hamburguesa Completa", imageUrl: "/assets/images/hamburguesa.png", price: 8000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
  ];*/

  constructor(private router: Router, private navegationService: NavegationService, private productService: ProductService) { }


  ngOnInit() : void {
    this.navegationService.currentCatalog.subscribe(catalog => this.catalog = catalog);

    this.loading = true;
    this.productService.getProductByCatalogId(this.catalog.id).subscribe((data) => {
      this.products = data;     
      this.loading = false;
    },
    (error) => {
      this.loading = false;
    });
    this.orderHasElements = this.navegationService.getOrderTotal();
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
