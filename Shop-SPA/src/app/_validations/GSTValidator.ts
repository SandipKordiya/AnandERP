// import {AbstractControl, AsyncValidatorFn} from '@angular/forms';
// import { map } from 'rxjs/operators';
// import { PartyService } from '../_services/party.service';

// export function GSTValidator(user: PartyService):AsyncValidatorFn  {
//     return (control: AbstractControl) => {
//         return user.getGST(control.value)
//             .pipe(
//                 map(user => user ? {isValid:true} : null)
//             );
//     }
// }


import { AbstractControl, ValidationErrors } from '@angular/forms'
import { Observable, pipe } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { environment } from '../../environments/environment';
 
export function GSTValidator(control: AbstractControl): Observable<ValidationErrors> | null {
//   let baseUrl: string = environment.apiUrl;
  const value: string = control.value;
 
  return this.http.get(environment.apiUrl + 'party/gstinvalidate/' + value)
    .pipe(
      debounceTime(500),
      map( (data:any) =>  {
          if (!data.isValid) return ({ 'InValid': true })
      })
    )
  
}