import { Component, OnInit } from '@angular/core';
import { Catalog } from '../../models/Catalog';
import { Router } from '@angular/router';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  catalogs: Catalog[] = []
  orderHasElements: boolean = false;
  
  ngOnInit() {
    this.catalogs = [
      { id: 1, name: "Promociones", img: "/assets/images/promociones.jpg" },
      { id: 2, name: "Lomitos", img: "/assets/images/lomitos.jpg" },
      { id: 3, name: "Hamburguesas", img: "/assets/images/hamburguesa.png" },
      { id: 4, name: "Empanadas", img: "/assets/images/empanadas.webp" },
      { id: 5, name: "Pizzas", img: "/assets/images/pizza.jpg" },
      { id: 6, name: "Papas Fritas", img: "/assets/images/papas-fritas.webp" },
    ];

    this.orderHasElements = this.navegationService.getOrderCount();
  }
  
  constructor(private router: Router, private navegationService: NavegationService) {}

  openCatalog(catalog: Catalog) {
    if (catalog) {
      this.navegationService.setCatalog(catalog);
      this.router.navigate(['catalogo', catalog.name.toLowerCase()]);      
    }
  }



}
