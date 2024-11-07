import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { Options, Product } from 'src/app/models/Product';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = new Product(); // { id: 1, name: "2 Hamburguesas Completas", imageUrl: "/assets/images/hamburguesa.png", price: 12000, catalogId: 1, options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)]};

  catalogName: string = '';
  cartElements: number = 0;
  constructor(private router: Router, private navegationService: NavegationService) { }
  
  ngOnInit() : void {
    this.navegationService.currentProduct.subscribe(product => this.product = product);
    this.navegationService.currentCatalog.subscribe(catalog => {
      this.catalogName = catalog.name;
    })
  }

  goBack() {
    this.router.navigateByUrl('/catalogo/' + this.catalogName.toLowerCase());
  }

  addToOrder() {
    let order: Order = new Order();
    this.navegationService.currentOrder.subscribe(o => {
      order = o;
    });
        
    order.products.push(this.product);
    this.navegationService.setOrder(order);

    console.log(this.product);
    console.log(order);
    

    this.router.navigateByUrl('/catalogo/' + this.catalogName.toLowerCase());
  }
}
