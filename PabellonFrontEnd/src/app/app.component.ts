import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NavegationService } from './services/navegation.service';
import { filter, map } from 'rxjs';
import { Order } from './models/Order';
import { OrderTemplate } from './components/templates/OrderTemplate';
import { AuthService } from './services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isAdminRoute: boolean = false;
  orderHasElements: boolean = false;
  footerConfig: any = {
    title: '',
    ShowIcon: true,
    ShowSpan: true,
    ShowFooter: true,
    ShowAddToOrder: false,
    NavegateTo: ''
  };
  isLoggedUser: boolean = false;
  isLoginRoute: boolean = true;
  isMobile:boolean = false;

  constructor(
    private navegationService: NavegationService, 
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {   
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
        this.isAdminRoute = this.router.url.startsWith('/admin');
        this.isLoginRoute = this.router.url.startsWith('/admin/login');

        if (this.isAdminRoute) {
          document.documentElement.style.setProperty('--background-color', 'var(--admin-background-color)');
        } else {
          document.documentElement.style.setProperty('--background-color', '#1b1122');
          this.footerConfig = footerConfig;
        
          this.navegationService.currentOrder.subscribe(order => {
          this.orderHasElements = order.total > 0;
          this.footerConfig.ShowFooter = this.orderHasElements && !this.footerConfig.ShowAddToOrder;        
          });
        }
      });
      
      this.authService.isLoggedUser$.subscribe(status => {
        this.isLoggedUser = status;
      });

      this.breakpointObserver
        .observe(['(max-width: 1000px)'])
        .subscribe(result => {
          this.isMobile = result.matches;
        });
  }

  actionFooter() {
    switch(this.footerConfig.NavegateTo) {
      case 'catalog':
        this.router.navigate(['catalogo']);
        break;
      case 'order':
        this.openOrder();
        break;
      case 'finish-order':
        this.finishOrder();
        break;
      case 'add-product':
        //this.router.navigate(['admin/agregar-producto']);
        break;
    }
  }

  openOrder() {
    this.router.navigate(['pedido']);
  }

  finishOrder() {
    let order:Order = new Order();
    this.navegationService.currentOrder.subscribe(o => {
      order = o;
    })
    order.date = new Date();
    const message = OrderTemplate.generateMessage(order);
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/3516430938?text=${encodedMessage}`;

    const whatsappWindow = window.open(whatsappUrl, '_blank');
    if (whatsappWindow) {
      const checkWindowFocus = setInterval(() => {
        if (whatsappWindow.document.hasFocus()) {
          this.navegationService.setOrder(new Order());
          clearInterval(checkWindowFocus); 
        }
      }, 500);
    }

    this.router.navigate(['catalogo']);
  }
}
