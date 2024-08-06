import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorClienteComponent } from './mantenedor-cliente.component';

describe('MantenedorClienteComponent', () => {
  let component: MantenedorClienteComponent;
  let fixture: ComponentFixture<MantenedorClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
