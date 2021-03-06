/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PurchaseReturnComponent } from './purchase-return.component';

describe('PurchaseReturnComponent', () => {
  let component: PurchaseReturnComponent;
  let fixture: ComponentFixture<PurchaseReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
