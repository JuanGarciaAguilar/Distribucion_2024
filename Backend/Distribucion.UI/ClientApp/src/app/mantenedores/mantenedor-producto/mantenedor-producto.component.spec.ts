import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorProductoComponent } from './mantenedor-producto.component';

describe('MantenedorProductoComponent', () => {
  let component: MantenedorProductoComponent;
  let fixture: ComponentFixture<MantenedorProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
