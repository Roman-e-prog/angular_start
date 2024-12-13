import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothekEditComponent } from './bibliothek-edit.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('BibliothekEditComponent', () => {
  let component: BibliothekEditComponent;
  let fixture: ComponentFixture<BibliothekEditComponent>;
  let mockStore: MockStore
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliothekEditComponent],
      providers:[
        provideMockStore()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BibliothekEditComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore)
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
