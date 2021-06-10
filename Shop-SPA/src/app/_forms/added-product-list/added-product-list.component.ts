import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-added-product-list',
  templateUrl: './added-product-list.component.html',
  styleUrls: ['./added-product-list.component.scss'],
})
export class AddedProductListComponent implements OnInit {
  @Input() products;
  constructor() {}

  ngOnInit() {}
}
