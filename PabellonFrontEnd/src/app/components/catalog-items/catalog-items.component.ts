import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/Helpers/BaseService';
import { Utils } from 'src/app/Helpers/Utils';
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
  catalogId: string | null = '';

  /*products: Product[] = [
    { id: 2, description: "Re rica la burga tiene muchas cosas para dfjklsdf", name: "Hamburguesa Completa", image: "/assets/images/hamburguesa.png", price: 80000, catalogId: "1", options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
    { id: 1, description: "Re rica la burga tiene muchas cosas para dfjklsdf ", name: "Hamburguesa Doble Completa", image: "/assets/images/empanadas.webp", price: 60000, catalogId: "1", options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)]},
    { id: 3, description: "Re rica la burga tiene muchas cosas para dfjklsdf ", name: "Hamburguesa Veggie Completa", image: "/assets/images/pizza.jpg", price: 12000, catalogId: "1", options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
    { id: 4, description: "Re rica la burga tiene muchas cosas para dfjklsdf ", name: "Hamburguesa Roquefort Completa", image: "/assets/images/papas-fritas.webp", price: 23000, catalogId: "1", options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
    { id: 5, description: "Re rica la burga tiene muchas cosas para dfjklsdf", name: "Hamburguesa Simple", image: "/assets/images/hamburguesa.png", price: 8000, catalogId: "1", options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
    { id: 6, description: "Re rica la burga tiene muchas cosas para dfjklsdf ", name: "Hamburguesa Completa", image: "/assets/images/hamburguesa.png", price: 10000, catalogId: "1", options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)] },
  ];*/

  constructor(
    private router: Router,
    private navegationService: NavegationService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.catalogId = this.route.snapshot.paramMap.get('id');

    if (this.catalogId) {
      this.loading = true;
      this.navegationService.currentCatalog.subscribe(catalog => {
        this.catalog = catalog;
      })

      this.productService.getProductByCatalogId(this.catalogId, true).subscribe((data) => {
        this.products = data;
        this.loading = false;
      },
        (error) => {
          this.loading = false;
        });
      this.orderHasElements = this.navegationService.getOrderTotal();
    }
  }

  openProduct(product: any) {
    this.navegationService.setProduct(product);
    this.router.navigate(['catalogo', this.catalogId, product.name.toLowerCase()]);
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

  formatNumberWithCommas(number: number): string {
    return Utils.formatNumberWithCommas(number);
  }

  getImageUrl(imagePath: string): string {
    return `${BaseService.fileUrl}${imagePath}`;
  }


}
