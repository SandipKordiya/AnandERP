import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {
  product: Product;
  id: number;
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(' this.id', this.id);
    if (this.id != undefined) {
      this.productService.viewProduct(this.id).subscribe(data => {
        this.product = data;
        console.log('model question', data);
      });
    }
  }

}
