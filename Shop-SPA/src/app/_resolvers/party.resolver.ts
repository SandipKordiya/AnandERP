import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertifyService } from '../_services/alertify.service';
import { PartyService } from '../_services/party.service';
import { ProductService } from '../_services/product.service';

@Injectable()
export class PartyResolver implements Resolve<any> {
  constructor(private router: Router, private alertify: AlertifyService, private partyService: PartyService) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.partyService.getParty(route.params.id).pipe(
      catchError(error => {
        this.alertify.error('Problem retriving product data');
        this.router.navigate(['/party/list']);
        return of(null);
      })
    );
  }
}
