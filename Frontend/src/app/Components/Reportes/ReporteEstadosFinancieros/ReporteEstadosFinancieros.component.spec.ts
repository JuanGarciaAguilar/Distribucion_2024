/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ReporteEstadosFinancierosComponent } from './ReporteEstadosFinancieros.component';

describe('ReporteEstadosFinancierosComponent', () => {
  let component: ReporteEstadosFinancierosComponent;
  let fixture: ComponentFixture<ReporteEstadosFinancierosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteEstadosFinancierosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteEstadosFinancierosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
