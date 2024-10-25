import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDocumentsComponent } from './detail-documents.component';

describe('DetailDocumentsComponent', () => {
  let component: DetailDocumentsComponent;
  let fixture: ComponentFixture<DetailDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailDocumentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
