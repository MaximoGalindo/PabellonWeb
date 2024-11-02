import { Component } from '@angular/core';
import { CatalogComponent } from '../catalog/catalog.component';
import { NavbarComponent } from '../pageElements/navbar/navbar.component';
import { FooterComponent } from '../pageElements/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CatalogComponent,
    NavbarComponent,
    CommonModule,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  catalogs = [
    { name: "Promociones", img: "/assets/images/promociones.jpg" },
    { name: "Lomitos", img: "/assets/images/lomitos.jpg" },
    { name: "Hamburguesas", img: "/assets/images/hamburguesa.png" },
    { name: "Empanadas", img: "/assets/images/empanadas.webp" },
    { name: "Pizzas", img: "/assets/images/pizza.jpg" },
    { name: "Papas Fritas", img: "/assets/images/papas-fritas.webp" },
  ];

}
