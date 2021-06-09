import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { ProductService } from '../_services/product.service';

@Injectable()
export class ProductViewResolver implements Resolve<any> {
  constructor(private productService: ProductService,
              private router: Router, private alertify: AlertifyService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.productService.viewProduct(route.params.id).pipe(
      catchError(error => {
        this.alertify.error('Problem retriving product data');
        this.router.navigate(['/test/list']);
        return of(null);
      })
    );
  }
}
