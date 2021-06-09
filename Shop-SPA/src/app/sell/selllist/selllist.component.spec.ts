/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelllistComponent } from './selllist.component';

describe('SelllistComponent', () => {
  let component: SelllistComponent;
  let fixture: ComponentFixture<SelllistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelllistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelllistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
