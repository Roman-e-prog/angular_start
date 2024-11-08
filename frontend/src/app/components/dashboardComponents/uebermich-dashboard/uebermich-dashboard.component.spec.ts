import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebermichDashboardComponent } from './uebermich-dashboard.component';

describe('UebermichDashboardComponent', () => {
  let component: UebermichDashboardComponent;
  let fixture: ComponentFixture<UebermichDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UebermichDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UebermichDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
