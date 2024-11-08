import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothekDashboardComponent } from './bibliothek-dashboard.component';

describe('BibliothekDashboardComponent', () => {
  let component: BibliothekDashboardComponent;
  let fixture: ComponentFixture<BibliothekDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliothekDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BibliothekDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
