/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MantemientoVentasComponent } from './MantemientoVentas.component';

describe('MantemientoVentasComponent', () => {
  let component: MantemientoVentasComponent;
  let fixture: ComponentFixture<MantemientoVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantemientoVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantemientoVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
