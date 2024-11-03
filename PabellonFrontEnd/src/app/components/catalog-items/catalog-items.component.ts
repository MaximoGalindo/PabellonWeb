import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalog-items',
  templateUrl: './catalog-items.component.html',
  styleUrls: ['./catalog-items.component.css']
})
export class CatalogItemsComponent {
  id: string | null = null;
  catalogName: string | null = null;

  products = [
    { id: 1, name: "2 Hamburguesas Completas", price: 12000, img: "/assets/images/hamburguesa.png" },
    { id: 2, name: "2 Hamburguesas Simples", price: 10000, img: "/assets/images/hamburguesa.png" },
    { id: 3, name: "2 Hamburguesas Vegetarianas", price: 10000, img: "/assets/images/hamburguesa.png" },
    { id: 1, name: "2 Hamburguesas Completas", price: 12000, img: "/assets/images/hamburguesa.png" },
    { id: 2, name: "2 Hamburguesas Simples", price: 10000, img: "/assets/images/hamburguesa.png" },
    { id: 3, name: "2 Hamburguesas Vegetarianas", price: 10000, img: "/assets/images/hamburguesa.png" }
  ]

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.catalogName = params.get('name');
    });
  }




}
