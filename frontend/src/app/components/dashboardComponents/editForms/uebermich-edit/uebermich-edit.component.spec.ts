import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebermichEditComponent } from './uebermich-edit.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('UebermichEditComponent', () => {
  let component: UebermichEditComponent;
  let fixture: ComponentFixture<UebermichEditComponent>;
  let mockStore: MockStore;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UebermichEditComponent,
        NgIconsModule,
      ],
      providers:[
        provideIcons({}),
        provideMockStore()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UebermichEditComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // fit('should send the editData', ()=>{
  //   const editUebermichForm = fixture.debugElement.nativeElement.querySelector('.editUebermichForm');
  //   const my_person = fixture.debugElement.nativeElement.querySelector('#my_person');
  //   const mainButton = fixture.debugElement.nativeElement.querySelector('#mainButton');
  // })
});
