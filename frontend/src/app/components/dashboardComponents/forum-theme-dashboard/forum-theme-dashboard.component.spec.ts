import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumThemeDashboardComponent } from './forum-theme-dashboard.component';

describe('ForumThemeDashboardComponent', () => {
  let component: ForumThemeDashboardComponent;
  let fixture: ComponentFixture<ForumThemeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumThemeDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumThemeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
