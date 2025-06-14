import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NavegationService } from '../services/navegation.service';
import { Product } from '../models/Product';
import { ProductComponent } from '../components/product/product.component';
import { CatalogItemsComponent } from '../components/catalog-items/catalog-items.component';
import { Catalog } from '../models/Catalog';

@Injectable({
    providedIn: 'root'
})
export class NavegationGuard implements CanActivate {

    currentProduct: Product = new Product();
    currentCatalog: Catalog = new Catalog();
    constructor(
        private router: Router,
        private navegationService: NavegationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const component = route.routeConfig?.component;

        if (component === ProductComponent) {
            const catalogId = route.paramMap.get('id');
            this.navegationService.currentProduct.subscribe(product => this.currentProduct = product);

            if (catalogId && this.currentProduct.id == 0) {
                this.router.navigate(['home']);
                return false;
            }
            return true;
        }

        if (component === CatalogItemsComponent) {
            this.navegationService.currentCatalog.subscribe(catalog => this.currentCatalog = catalog);
            
            if (this.currentCatalog.id === '') {
                this.router.navigate(['home']);
                return false;
            }
            return true;
        }

        return true;
    }
    
}
