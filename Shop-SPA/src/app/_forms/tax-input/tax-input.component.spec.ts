/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TaxInputComponent } from './tax-input.component';

describe('TaxInputComponent', () => {
  let component: TaxInputComponent;
  let fixture: ComponentFixture<TaxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
