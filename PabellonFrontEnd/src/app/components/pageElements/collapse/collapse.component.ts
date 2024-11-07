import { Component, Input } from '@angular/core';
import { Options, Product } from 'src/app/models/Product';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.css']
})
export class CollapseComponent {

  @Input() title = 'Opcion 1';
  @Input() options: Options[] = [new Options(1, "Sin lechuga", 0), new Options(2, "Sin Tomate", 0), new Options(3, "Medallon Extra", 1200)];

  isCollapsed = false;

  constructor(private navegationService: NavegationService) { }

  toggleCollapse(collapseContainer: HTMLElement) {
    this.isCollapsed = !this.isCollapsed;

    if (this.isCollapsed) {
      // Desplaza la pantalla hacia el elemento cuando el colapso esté abierto
      setTimeout(() => {
        collapseContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // Agrega un ligero retardo para permitir que la animación de despliegue ocurra
    }
  }

  updateOption(option: Options) {
    option.isSelected = !option.isSelected;
    let product:Product = new Product();
    this.navegationService.currentProduct.subscribe(p => {
      product = p;
    });
    
    product.options = this.options;

    this.navegationService.setProduct(product);
  }

}
