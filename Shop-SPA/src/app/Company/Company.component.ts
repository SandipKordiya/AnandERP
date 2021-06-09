import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { CityService } from '../_services/city.service';
import { ShopService } from '../_services/shop.service';

@Component({
  selector: 'app-Company',
  templateUrl: './Company.component.html',
  styleUrls: ['./Company.component.scss']
})
export class CompanyComponent implements OnInit {
  company: any = {};
  country: any[];
  selectedCountry: number;
  states: any[];
  cities: any[];
  constructor(private router: Router, private shopService: ShopService,private cityService: CityService, private alertify:
    AlertifyService, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getStates();
    this.getCompany();
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

  getCitiesSelected() {
    let stateId;
    this.cityService.getCities(this.company.stateId)
      .subscribe((res: any) => {
        this.cities = res;
      }, error => {
        this.alertify.error(error);
      });
  }

  getCompany() {
    this.shopService.getCompany(parseInt(localStorage.getItem("branchId")))
      .subscribe((res: any) => {
        console.log(res);
        this.company = res;
        this.getCitiesSelected();
      }, error => {
        console.log(error);
        this.alertify.error(error.error.title);
      });
  }
  onSubmit(form) {
    if (this.company.id == undefined) {
      form.value.branchId = parseInt(localStorage.getItem("branchId"));
      console.log(form.value)

      this.shopService.addCompany(form.value).subscribe(next => {
        this.alertify.success('company added successfully');
      }, error => {
        this.alertify.error(error.error);
      });
    } else {
      form.value.branchId = parseInt(localStorage.getItem("branchId"));
      console.log(form.value)

      this.shopService.updateCompany(this.company.id, form.value).subscribe(next => {
        this.alertify.success('company updated successfully');
      }, error => {
        this.alertify.error(error.error);
      });
    }

  }


}
