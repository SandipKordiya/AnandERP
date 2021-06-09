import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { ShopService } from '../_services/shop.service';


@Injectable()
export class OrderResolver implements Resolve<any> {
    constructor(private shopService: ShopService, private authService: AuthService,
        private router: Router, private alertify: AlertifyService) { }
    resolve(route: ActivatedRouteSnapshot): Observable<any> {
        return this.shopService.getOrder(route.params['id'], route.params['type']).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving brand data');
                //  this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
