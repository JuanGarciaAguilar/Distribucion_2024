import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarComprasComponent } from './confirmar-compras.component';

describe('ConfirmarComprasComponent', () => {
  let component: ConfirmarComprasComponent;
  let fixture: ComponentFixture<ConfirmarComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
