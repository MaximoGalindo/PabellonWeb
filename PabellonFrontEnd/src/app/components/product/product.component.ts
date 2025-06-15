import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/Helpers/BaseService';
import { Utils } from 'src/app/Helpers/Utils';
import { Catalog } from 'src/app/models/Catalog';
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
  catalogId: string | null = '';
  totalPrice: number = 0;
  customizedProducts: CustomizedProduct[] = [new CustomizedProduct(new Product())];
  constructor(
    private router: Router,
    private navegationService: NavegationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.navegationService.currentProduct.subscribe(product => this.product = product);
    this.catalogId = this.route.snapshot.paramMap.get('id');
    console.log(this.product);

    this.navegationService.currentProductsCount.subscribe(count => {
      setTimeout(() => {
        this.customizedProducts = [];
        for (let i = 0; i < count; i++) {
          this.customizedProducts.push(new CustomizedProduct(this.product));
        }
        this.navegationService.setCustomizedProductsCount(this.customizedProducts);
      });
    });

  }

  goBack() {
    this.router.navigateByUrl('catalogo/' + this.catalogId);
  }

  toggleOption(itemIndex: number, option: Options) {
    const customizedProduct = this.customizedProducts[itemIndex];
    const idx = customizedProduct.selectedOptions.findIndex(o => o.id === option.id);

    if (idx > -1) {
      // Si está seleccionado, lo saco y limpio cantidad
      customizedProduct.selectedOptions.splice(idx, 1);
      option.quantity = 1;
    } else {
      // Si no está, lo agrego con cantidad 1 por defecto
      option.quantity = option.quantity || 1;
      customizedProduct.selectedOptions.push(option);
    }

    this.navegationService.setCustomizedProductsCount(this.customizedProducts);
  }


  getTotalPrice() {
    return Utils.formatNumberWithCommas(this.customizedProducts.reduce((acc, cp) => acc + cp.getTotalPrice(), 0))
  }

  isOptionSelected(customizedProduct: CustomizedProduct, option: Options): boolean {
    return customizedProduct.selectedOptions.some(o => o.id === option.id);
  }

  getImageUrl(imagePath: string): string {
    return `${BaseService.fileUrl}${imagePath}`;
  }

  increaseQuantity(customizedProduct: CustomizedProduct, option: Options): void {
    customizedProduct.selectedOptions.find(o => o.id === option.id)!.quantity++;
  }

  decreaseQuantity(customizedProduct: CustomizedProduct, option: Options): void {
    customizedProduct.selectedOptions.find(o => o.id === option.id)!.quantity--;
  }

}
