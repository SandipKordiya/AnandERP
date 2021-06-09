
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { AddPartyComponent } from '../party/add-party/add-party.component';
import { PartyService } from '../_services/party.service';

/**
 * Class for async validations communicating with the REST-API.
 */
export class gstAsyncValidators {

  /**
   * Checks if a given address has orders assigned with In Process status.
   * @param service - The order service.
   * @param component - The address form component.
   * @returns {(control:AbstractControl)=>Promise<T>}
   */
  public static orderInProcess(service: PartyService, component: AddPartyComponent): ValidatorFn {
    return (control: AbstractControl) => {
      return new Promise((resolve) => {
        if (control.value === false) { // on switching address closed : false
          return resolve(null);
        } else {                       // on switching address closed : false
          // gstin : From Component
          if (control.value != null) {
            service.getGST(control.value).subscribe((orders: any) => {
              console.log('gst', orders)
              if (!orders) {
                return resolve({ ordersInProcess: true });
              } else {
                return resolve(null);
              }
            });
          }

        }
      });
    };
  }
}
