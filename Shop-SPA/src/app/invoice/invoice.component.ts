import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../_services/shop.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  orderId: number;
  order: any;
  constructor(private route: ActivatedRoute, private shopService: ShopService) { }

  ngOnInit() {
    // this.orderId = this.route.snapshot.params.id;
    // this.shopService.getOrder(this.orderId).subscribe(data => {
    //   this.order = data;
    //   console.log('order', data);
    // });
  }

}
