import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepCierreDiarioComponent } from './rep-cierre-diario.component';

describe('RepCierreDiarioComponent', () => {
  let component: RepCierreDiarioComponent;
  let fixture: ComponentFixture<RepCierreDiarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepCierreDiarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepCierreDiarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
