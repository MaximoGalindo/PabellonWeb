import { Component, OnInit } from '@angular/core';
import { Catalog } from '../../models/Catalog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  catalogs: Catalog[] = []
  
  ngOnInit() {
    this.catalogs = [
      { id: 1, name: "Promociones", img: "/assets/images/promociones.jpg" },
      { id: 2, name: "Lomitos", img: "/assets/images/lomitos.jpg" },
      { id: 3, name: "Hamburguesas", img: "/assets/images/hamburguesa.png" },
      { id: 4, name: "Empanadas", img: "/assets/images/empanadas.webp" },
      { id: 5, name: "Pizzas", img: "/assets/images/pizza.jpg" },
      { id: 6, name: "Papas Fritas", img: "/assets/images/papas-fritas.webp" },
    ];
  }

  constructor(private router: Router) {}

  openCatalog(catalog: Catalog) {
    if (catalog) {
      this.router.navigate(['catalogo', catalog.name,catalog.id]);
    }
  }

}
