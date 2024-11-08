import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothekEditComponent } from './bibliothek-edit.component';

describe('BibliothekEditComponent', () => {
  let component: BibliothekEditComponent;
  let fixture: ComponentFixture<BibliothekEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliothekEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BibliothekEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
