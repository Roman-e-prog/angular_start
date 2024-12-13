import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogEditComponent } from './blog-edit.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('BlogEditComponent', () => {
  let component: BlogEditComponent;
  let fixture: ComponentFixture<BlogEditComponent>;
  let mockStore: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogEditComponent],
      providers:[
        provideMockStore()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogEditComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore)
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
