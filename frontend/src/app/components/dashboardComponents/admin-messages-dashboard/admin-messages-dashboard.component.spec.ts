import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagesDashboardComponent } from './admin-messages-dashboard.component';

describe('AdminMessagesDashboardComponent', () => {
  let component: AdminMessagesDashboardComponent;
  let fixture: ComponentFixture<AdminMessagesDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMessagesDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMessagesDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
