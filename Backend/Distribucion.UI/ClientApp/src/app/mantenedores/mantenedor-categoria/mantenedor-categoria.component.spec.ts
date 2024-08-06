import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenedorCategoriaComponent } from './mantenedor-categoria.component';

describe('MantenedorCategoriaComponent', () => {
  let component: MantenedorCategoriaComponent;
  let fixture: ComponentFixture<MantenedorCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenedorCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenedorCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
