import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Options } from 'src/app/models/Options';
import { Order } from 'src/app/models/Order';
import { CustomizedProduct, Product } from 'src/app/models/Product';
import { EventBusService } from 'src/app/services/event-bus.service';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = { id: 1, description: "Una hamburguesa con carne y una banda de cosas re ricas y que no te la podes perder", name: "2 Hamburguesas Completas", image: "/assets/images/hamburguesa.png", price: 12000, catalogId: "1", options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)], disabled: false };
  catalogName: string = '';
  totalPrice: number = 0;
  customizedProducts: CustomizedProduct[] = [new CustomizedProduct(new Product())];
  constructor(private router: Router, private navegationService: NavegationService, private eventBus: EventBusService) { }

  ngOnInit(): void {
    /*DESCOMENTAR ESTO DESPUES*/
    this.navegationService.currentProduct.subscribe(product => this.product = product);
    this.navegationService.currentCatalog.subscribe(catalog => {
      this.catalogName = catalog.name;
    })
    this.navegationService.currentProductsCount.subscribe(count => {
      setTimeout(() => {
        this.customizedProducts = [];
        for (let i = 0; i < count; i++) {
          this.customizedProducts.push(new CustomizedProduct(this.product));
        }
        //this.totalPrice = this.customizedProducts.reduce((acc, cp) => acc + cp.getTotalPrice(), 0);
        this.navegationService.setCustomizedProductsCount(this.customizedProducts);
      });
    });

  }

  goBack() {
    this.router.navigateByUrl('/catalogo/' + this.catalogName.toLowerCase());
  }

  toggleOption(itemIndex: number, option: Options) {
    const customizedProduct = this.customizedProducts[itemIndex];
    const idx = customizedProduct.selectedOptions.findIndex(o => o.id === option.id);

    if (idx > -1) {
      // Si está seleccionado, lo saco
      customizedProduct.selectedOptions.splice(idx, 1);
    } else {
      // Si no está, lo agrego
      customizedProduct.selectedOptions.push(option);
    }

    this.navegationService.setCustomizedProductsCount(this.customizedProducts);
  }

  getTotalPrice(){
    return this.customizedProducts.reduce((acc, cp) => acc + cp.getTotalPrice(), 0);
  }

  isOptionSelected(customizedProduct: CustomizedProduct, option: Options): boolean {
    return customizedProduct.selectedOptions.some(o => o.id === option.id);
  }

}
