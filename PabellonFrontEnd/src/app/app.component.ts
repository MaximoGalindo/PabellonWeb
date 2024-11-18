import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavegationService } from './services/navegation.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'Catalogo';
  orderHasElements: boolean = false;
  footerConfig: any = {
    title: '',
    ShowIcon: true,
    ShowSpan: true,
    ShowFooter: true,
    ShowAddToOrder: false,
    NavegateTo: ''
  };
  constructor(
    private navegationService: NavegationService, 
    private router:Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderHasElements = this.navegationService.getOrderCount();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot.data['footer'] || null;
        })
      )
      .subscribe((footerConfig: any) => {
        this.footerConfig = footerConfig;
      });
  }

  actionFooter() {
    switch(this.footerConfig.NavegateTo) {
      /*case 'catalog':
        this.router.navigate(['catalogo']);
        break;
      case 'order':
        this.openOrder();
        break;
      case 'confirm':
        this.confirmOrder();
        break;*/
    }
  }

  openOrder() {
    this.router.navigate(['pedido']);
  }

  confirmOrder() {
    this.router.navigate(['confirmar-pedido']);
  }
}
