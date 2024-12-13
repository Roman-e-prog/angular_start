import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagesEditComponent } from './admin-messages-edit.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('AdminMessagesEditComponent', () => {
  let component: AdminMessagesEditComponent;
  let fixture: ComponentFixture<AdminMessagesEditComponent>;
  let mockStore: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMessagesEditComponent],
      providers:[
        provideMockStore(),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMessagesEditComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore)
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
