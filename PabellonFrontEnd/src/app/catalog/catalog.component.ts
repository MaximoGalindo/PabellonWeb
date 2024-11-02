import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  @Input() title: string = ''; // Propiedad para recibir el título
  @Input() img: string = ''; 
}
