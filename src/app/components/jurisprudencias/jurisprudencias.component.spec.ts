import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurisprudenciasComponent } from './jurisprudencias.component';

describe('JurisprudenciasComponent', () => {
  let component: JurisprudenciasComponent;
  let fixture: ComponentFixture<JurisprudenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JurisprudenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JurisprudenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
