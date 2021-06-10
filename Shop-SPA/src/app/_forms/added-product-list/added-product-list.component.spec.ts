/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddedProductListComponent } from './added-product-list.component';

describe('AddedProductListComponent', () => {
  let component: AddedProductListComponent;
  let fixture: ComponentFixture<AddedProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddedProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
