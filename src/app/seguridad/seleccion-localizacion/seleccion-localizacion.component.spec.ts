import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionLocalizacionComponent } from './seleccion-localizacion.component';

describe('SeleccionLocalizacionComponent', () => {
  let component: SeleccionLocalizacionComponent;
  let fixture: ComponentFixture<SeleccionLocalizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeleccionLocalizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionLocalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
