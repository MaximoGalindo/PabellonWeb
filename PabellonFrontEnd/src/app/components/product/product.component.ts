import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { Options, Product } from 'src/app/models/Product';
import { EventBusService } from 'src/app/services/event-bus.service';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  product: Product = new Product(); //{ id: 1, description: "Una hamburguesa con carne y una banda de cosas re ricas y que no te la podes perder", name: "2 Hamburguesas Completas", image: "/assets/images/hamburguesa.png", price: 12000, catalogId: "1", options: [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)]};
  catalogName: string = '';
  cartElements: number = 0;
  constructor(private router: Router, private navegationService: NavegationService, private eventBus:EventBusService) { }
  
  ngOnInit() : void {
    /*DESCOMENTAR ESTO DESPUES*/
    this.navegationService.currentProduct.subscribe(product => this.product = product);
    this.navegationService.currentCatalog.subscribe(catalog => {
      this.catalogName = catalog.name;
    })
    
  }

  goBack() {
    this.router.navigateByUrl('/catalogo/' + this.catalogName.toLowerCase());
  }

  updateOption(option: Options) {
    option.isSelected = !option.isSelected;    
    
    var optionSelected = this.product.options.findIndex(x => x.id == option.id);
    this.product.options[optionSelected] = option;
    
    if(option.isSelected) {
      this.product.price += option.price;
    } else {
      this.product.price -= option.price;
    }

    this.navegationService.setProduct(this.product);
  }
}
