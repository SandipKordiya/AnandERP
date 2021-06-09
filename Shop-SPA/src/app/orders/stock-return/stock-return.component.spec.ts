/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StockReturnComponent } from './stock-return.component';

describe('StockReturnComponent', () => {
  let component: StockReturnComponent;
  let fixture: ComponentFixture<StockReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
