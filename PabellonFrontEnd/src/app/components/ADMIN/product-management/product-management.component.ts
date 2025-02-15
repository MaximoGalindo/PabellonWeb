import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  products: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.products = [
      { name: 'Product 1', price: 10, description: 'Description for Product 1' },
      { name: 'Product 2', price: 20, description: 'Description for Product 2' },
      { name: 'Product 3', price: 30, description: 'Description for Product 3' },
      { name: 'Product 4', price: 40, description: 'Description for Product 4' },
      { name: 'Product 5', price: 50, description: 'Description for Product 5' }

    ]
  }

  addProduct(){
    this.router.navigate(['admin/agregar-producto']);
  }
}
