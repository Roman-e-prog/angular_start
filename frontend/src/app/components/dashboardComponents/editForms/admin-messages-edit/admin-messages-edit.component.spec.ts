import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagesEditComponent } from './admin-messages-edit.component';

describe('AdminMessagesEditComponent', () => {
  let component: AdminMessagesEditComponent;
  let fixture: ComponentFixture<AdminMessagesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMessagesEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMessagesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
