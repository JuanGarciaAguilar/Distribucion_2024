import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorSummaryComponent } from './mantenedor-summary.component';

describe('MantenedorSummaryComponent', () => {
  let component: MantenedorSummaryComponent;
  let fixture: ComponentFixture<MantenedorSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
