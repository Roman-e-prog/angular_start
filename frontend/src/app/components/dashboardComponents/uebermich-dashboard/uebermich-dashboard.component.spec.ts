import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UebermichDashboardComponent } from './uebermich-dashboard.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { Uebermich, UebermichState } from '../../../store/reducers/uebermich.reducer';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { selectAllUebermichData, selectUebermichError, selectUebermichLoading, selectUebermichMessage } from '../../../store/selectors/uebermich.selectors';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { createUebermich, deleteUebermich, updateUebermich } from '../../../store/actions/uebermich.actions';
import { matDeleteOutline, matEditOutline } from '@ng-icons/material-icons/outline';

describe('UebermichDashboardComponent', () => {
  let component: UebermichDashboardComponent;
  let fixture: ComponentFixture<UebermichDashboardComponent>;
  let mockStore: MockStore;
  let memoizedSelector: MemoizedSelector<UebermichState, Uebermich[]>;
  let memoizedLoadingSelector: MemoizedSelector<UebermichState, boolean>;
  let memoizedErrorSelector: MemoizedSelector<UebermichState, boolean>;
  let memoizedMessageSelector: MemoizedSelector<UebermichState, string>;
  let toastr: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UebermichDashboardComponent,
        NgIconsModule
      ],
      providers:[
        provideIcons({
          matEditOutline,
          matDeleteOutline
        }),
        provideMockStore(),
        provideToastr(),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UebermichDashboardComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    memoizedSelector = mockStore.overrideSelector(selectAllUebermichData,[]);
    memoizedLoadingSelector = mockStore.overrideSelector(selectUebermichLoading, false);
    memoizedErrorSelector = mockStore.overrideSelector(selectUebermichError, false);
    memoizedMessageSelector = mockStore.overrideSelector(selectUebermichMessage, '');
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  fit('should have all its components', async ()=>{
    memoizedSelector.setResult([
      {
        id: 1,
        my_person:"Lorem Ipsum"
      }
    ]);
    mockStore.refreshState();
    fixture.detectChanges();
    await fixture.whenStable();
    const content = fixture.debugElement.nativeElement.querySelector('.content');
    const title = fixture.debugElement.nativeElement.querySelector('.title');
    const uebermichForm = fixture.debugElement.nativeElement.querySelector('.uebermichForm');
    const my_person = fixture.debugElement.nativeElement.querySelector('#my_person');
    const mainButton = fixture.debugElement.nativeElement.querySelector('.mainButton');

    expect(content).toBeTruthy()
    expect(title).toBeTruthy()
    expect(uebermichForm).toBeTruthy()
    expect(my_person).toBeTruthy()
    expect(mainButton).toBeTruthy()
    expect(content.textContent.trim()).toEqual('Lorem Ipsum');
    expect(title.textContent.trim()).toEqual('Uebermich Daten einpflegen')
  })
  fit('form should get values and send them', ()=>{
    const spyDispatch = spyOn(mockStore, 'dispatch')
    const uebermichForm = fixture.debugElement.nativeElement.querySelector('.uebermichForm');
    const my_person = fixture.debugElement.nativeElement.querySelector('#my_person');
    const mainButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
    component.uebermichForm.controls['my_person'].setValue('Lorem Ipsum Ad Dolores');
    expect(my_person.value).toEqual('Lorem Ipsum Ad Dolores');
    fixture.detectChanges();
    mainButton.click();
    
    expect(spyDispatch).toHaveBeenCalledWith(createUebermich({uebermichData:{my_person:"Lorem Ipsum Ad Dolores"}}))
  })
  fit('should open edit Form on click', async ()=>{
    const spyDispatch = spyOn(mockStore, 'dispatch')
    memoizedSelector.setResult([
      {
        id: 1,
        my_person:"Lorem Ipsum"
      }
    ]);
    mockStore.refreshState();
    fixture.detectChanges();
    await fixture.whenStable();
    const editButton = fixture.debugElement.nativeElement.querySelector('#edit');
    expect(editButton).toBeTruthy();
    editButton.click();
    fixture.detectChanges();
    await fixture.whenStable().then(()=>{
      const title = fixture.debugElement.nativeElement.querySelector('.title');
      expect(title.textContent.trim()).toEqual('Uebermich Daten updaten');
      const editUebermichForm = fixture.debugElement.nativeElement.querySelector('.editUebermichForm');
      expect(editUebermichForm).toBeTruthy();
      const input = fixture.debugElement.nativeElement.querySelector('.input');
      expect(input).toBeTruthy();
      expect(input.value).toEqual('Lorem Ipsum');
      const submitButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
      submitButton.click();
      fixture.detectChanges();
      expect(spyDispatch).toHaveBeenCalledWith(updateUebermich({uebermichData:{id:1, my_person: 'Lorem Ipsum'} }))

    })
  });
  fit('should delete on click', async ()=>{
    memoizedSelector.setResult([
      {
        id: 1,
        my_person:"Lorem Ipsum"
      }
    ]);
    mockStore.refreshState();
    fixture.detectChanges();
    await fixture.whenStable();
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const deleteButton = fixture.debugElement.nativeElement.querySelector('#delete');
    expect(deleteButton).toBeTruthy();
    deleteButton.click();
    expect(dispatchSpy).toHaveBeenCalledWith(deleteUebermich({id: 1}))
  })
});
