import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumThemesEditComponent } from './forum-themes-edit.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('ForumThemesEditComponent', () => {
  let component: ForumThemesEditComponent;
  let fixture: ComponentFixture<ForumThemesEditComponent>;
  let mockStore: MockStore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForumThemesEditComponent],
      providers:[
        provideMockStore()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumThemesEditComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore)
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
