import { AlertifyService } from './../../_services/alertify.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import csc from 'country-state-city';
import { PartyService } from 'src/app/_services/party.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { CityService } from '../../_services/city.service';

@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.scss']
})
export class AddPartyComponent implements OnInit {
  model: any = {};
  partyTypes: any[];
  country: any[];
  selectedCountry: number;
  states: any[];
  cities: any[];
  id: number;
  breadCrumbItems: Array<{}>;
  validationform: FormGroup; // bootstrap validation form
  submit: boolean;
  branchId: number = parseInt(localStorage.getItem('branchId'));

  constructor(private partyService: PartyService, private cityService: CityService,
    private router: Router, private route: ActivatedRoute,
    private alertify: AlertifyService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Parties' }, { label: 'Add Party', active: true }];

    this.getPartyTypeList();
    // countryid = 101
    this.getStates();
    this.id = this.route.snapshot.params.id;
    if (this.id != undefined) {
      this.partyService.getParty(this.id)
        .pipe(first())
        .subscribe(x => {
          this.validationform.patchValue(x);
          this.getCitiesPreSelected(x.stateId);
        });
       
    }
    this.validationform = this.formBuilder.group({
      partyTypeId: ['', [Validators.required]],
      partyCode: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      invoiceName: [''],
      telephone: [''],
      mobile: ['', [Validators.required]],
      address: [''],
      countryId: [101, [Validators.required]],
      stateId: ['', [Validators.required]],
      cityId: ['', [Validators.required]],
      area: [''],
      postcode: [''],
      email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      website: [''],
      gSTIN: [''],
      panNo: [''],
      adharNo: [''],
      openingBalance: [0, [Validators.pattern('[0-9]+')]],
      balanceSign: [''],
      currentBalance: [0, [Validators.pattern('[0-9]+')]],
      creditDays: [15, [Validators.pattern('[0-9]+')]],
      creditAmount: [0, [Validators.pattern('[0-9]+')]],
      referance: [''],
      note: [''],
      branchId: [this.branchId]
    });
  }


  get form() {
    return this.validationform.controls;
  }

  validSubmit() {
    console.log(this.validationform.value)
    this.submit = true;
  }

  onStateChange() {
    this.validationform.get('state').valueChanges.subscribe(val => {
      this.cities = csc.getCitiesOfState(val);
    });

  }

  getCountries() {
    this.cityService.getCountry()
      .subscribe((res: any) => {
        this.country = res;
      }, error => {
        this.alertify.error(error);
      });
  }

  getStates() {
    this.cityService.getStates(101)
      .subscribe((res: any) => {
        this.states = res;
      }, error => {
        this.alertify.error(error);
      });
  }

  getCities(e) {
    let stateId;
    console.log(e)
    let t = e.split(":")
    this.cityService.getCities(parseInt(t[1]))
      .subscribe((res: any) => {
        this.cities = res;
      }, error => {
        this.alertify.error(error);
      });
  }
  getCitiesPreSelected(e) {
    let stateId;
    this.cityService.getCities(e)
      .subscribe((res: any) => {
        this.cities = res;
      }, error => {
        this.alertify.error(error);
      });
  }

  getPartyTypeList() {
    this.partyService.getPartyTypes()
      .subscribe((res: any) => {
        console.log(res);
        this.partyTypes = res;
      }, error => {
        this.alertify.error(error);
      });
  }

  resetParty(): void {
    this.validationform.reset(this.validationform.value);
  }


  AddParty() {
    console.log(this.validationform.value)
    this.submit = true;
    if (this.validationform.valid) {
      if (this.id == undefined) {
        this.partyService.addParty(this.validationform.value).subscribe(next => {
          this.alertify.success('New Party Added.');
          this.router.navigate(['/party']);
        }, error => {
          // console.log(error)
          this.alertify.error(error.error);
        });
      }
      else {
        if (this.id != undefined) {
          this.partyService.updateParty(this.id, this.validationform.value).subscribe(next => {
            this.alertify.success('Party Updated.');
            this.router.navigate(['/party']);
          }, error => {
            // console.log(error)
            this.alertify.error(error.error);
          });
        }

      }
    }
    else {
      this.alertify.error('Please all fields!');
    }
  }

}
