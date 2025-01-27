import { Component, Input, OnInit } from '@angular/core';
import { NavegationService } from 'src/app/services/navegation.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    @Input() title: string = '';
    @Input() ShowIcon: boolean = false;
    @Input() showSpan: boolean = true;
    total: number = 0;

    constructor(private navegationService: NavegationService) { }

    ngOnInit(): void {
        this.navegationService.currentOrder.subscribe(order => this.total = order.total);
    }
}
