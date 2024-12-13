import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliothekDashboardComponent } from './bibliothek-dashboard.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { Bibliothek, BibliothekState } from '../../../store/reducers/bibliothek.reducer';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { matDeleteOutline, matEditOutline } from '@ng-icons/material-icons/outline';
import { selectAllBibliothekData, selectBibliothekError, selectBibliothekLoading, selectBibliothekMessage } from '../../../store/selectors/bibliothek.selector';
import { createBibliothek, deleteBibliothek, updateBibliothek } from '../../../store/actions/bibliothek.actions';

describe('BibliothekDashboardComponent', () => {
  let component: BibliothekDashboardComponent;
  let fixture: ComponentFixture<BibliothekDashboardComponent>;
  let mockStore: MockStore;
  let memoizedSelector: MemoizedSelector<BibliothekState, Bibliothek[]>;
  let memoizedLoadingSelector: MemoizedSelector<BibliothekState, boolean>;
  let memoizedErrorSelector: MemoizedSelector<BibliothekState, boolean>;
  let memoizedMessageSelector: MemoizedSelector<BibliothekState, string>;
  let toastr: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BibliothekDashboardComponent,
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
    
    fixture = TestBed.createComponent(BibliothekDashboardComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    memoizedSelector = mockStore.overrideSelector(selectAllBibliothekData,[]);
    memoizedLoadingSelector = mockStore.overrideSelector(selectBibliothekLoading, false);
    memoizedErrorSelector = mockStore.overrideSelector(selectBibliothekError, false);
    memoizedMessageSelector = mockStore.overrideSelector(selectBibliothekMessage, '');
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have all its elements', async ()=>{
    memoizedSelector.setResult([
      {
        id: 1,
        bibliothek_title :"Ein Bibliothek Titel",
        bibliothek_ressort:"HTML",
        bibliothek_url:"https://www.youtube.com/watch?v=NpEaa2P7qZI",

      }
    ]);
      mockStore.refreshState();
      fixture.detectChanges();
      await fixture.whenStable();
      const bibliothekTitle = fixture.debugElement.nativeElement.querySelector('.bibliothek_title');
      const bibliothekRessort = fixture.debugElement.nativeElement.querySelector('.bibliothek_ressort');
      const bibliothekUrl = fixture.debugElement.nativeElement.querySelector('.link');

      const title = fixture.debugElement.nativeElement.querySelector('.title');
      const bibliothekForm = fixture.debugElement.nativeElement.querySelector('.bibliothekForm');
      const bibliothek_title = fixture.debugElement.nativeElement.querySelector('#bibliothek_title');
      const bibliothek_ressort = fixture.debugElement.nativeElement.querySelector('#bibliothek_ressort');
      const bibliothek_url = fixture.debugElement.nativeElement.querySelector('#bibliothek_url');
      const mainButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
  
      expect(bibliothekTitle).toBeTruthy();
      expect(bibliothekRessort).toBeTruthy();
      expect(bibliothekUrl).toBeTruthy();
      expect(title).toBeTruthy()
      expect(bibliothekForm).toBeTruthy()
      expect(bibliothek_title).toBeTruthy()
      expect(bibliothek_ressort).toBeTruthy()
      expect(bibliothek_url).toBeTruthy()
      expect(mainButton).toBeTruthy()
      expect(bibliothekTitle.textContent.trim()).toEqual('Ein Bibliothek Titel');
      expect(bibliothekRessort.textContent.trim()).toEqual('HTML');
      expect(bibliothekUrl.href).toEqual('https://www.youtube.com/watch?v=NpEaa2P7qZI');
      expect(title.textContent.trim()).toEqual('Bibliothek einpflegen')
  }),
  it('form should get values and send them', ()=>{
    const spyDispatch = spyOn(mockStore, 'dispatch')
    const title = fixture.debugElement.nativeElement.querySelector('.title');
    const bibliothekForm = fixture.debugElement.nativeElement.querySelector('.bibliothekForm');
    const bibliothek_title = fixture.debugElement.nativeElement.querySelector('#bibliothek_title');
    const bibliothek_ressort = fixture.debugElement.nativeElement.querySelector('#bibliothek_ressort');
    const bibliothek_url = fixture.debugElement.nativeElement.querySelector('#bibliothek_url');
    const mainButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
    component.bibliothekForm.controls['bibliothek_title'].setValue('Ein Bibliothek Titel');
    component.bibliothekForm.controls['bibliothek_ressort'].setValue('CSS');
    component.bibliothekForm.controls['bibliothek_url'].setValue('https://www.youtube.com/watch?v=NpEaa2P7qZI');
    expect(bibliothek_title.value).toEqual('Ein Bibliothek Titel');
    expect(bibliothek_ressort.value).toEqual('CSS');
    expect(bibliothek_url.value).toEqual('https://www.youtube.com/watch?v=NpEaa2P7qZI');
    fixture.detectChanges();
    mainButton.click();
    
    expect(spyDispatch).toHaveBeenCalledWith(createBibliothek(
      {
        bibliothekData:{
                        bibliothek_title:"Ein Bibliothek Titel", 
                        bibliothek_ressort:"CSS", 
                        bibliothek_url:"https://www.youtube.com/watch?v=NpEaa2P7qZI",
                      }
    }))
  })
  it('should open edit Form on click', async ()=>{
    const spyDispatch = spyOn(mockStore, 'dispatch');
    memoizedSelector.setResult([
      {
        id: 1,
        bibliothek_title :"Ein Bibliothek Titel",
        bibliothek_ressort:"HTML",
        bibliothek_url:"https://www.youtube.com/watch?v=NpEaa2P7qZI",

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
      expect(title.textContent.trim()).toEqual('Bibliothek updaten');
      const bibliothekEditForm = fixture.debugElement.nativeElement.querySelector('.bibliothekEditForm');
      expect(bibliothekEditForm).toBeTruthy();
      const bibliothek_title = fixture.debugElement.nativeElement.querySelector('#bibliothek_title');
      const bibliothek_ressort = fixture.debugElement.nativeElement.querySelector('#bibliothek_ressort');
      const bibliothek_url = fixture.debugElement.nativeElement.querySelector('#bibliothek_url');
      expect(bibliothek_title).toBeTruthy();
      expect(bibliothek_ressort).toBeTruthy();
      expect(bibliothek_url).toBeTruthy();
      expect(bibliothek_title.value).toEqual('Ein Bibliothek Titel');
      expect(bibliothek_ressort.value).toEqual('HTML');
      expect(bibliothek_url.value).toEqual('https://www.youtube.com/watch?v=NpEaa2P7qZI');
      const submitButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
      submitButton.click();
      fixture.detectChanges();
      expect(spyDispatch).toHaveBeenCalledWith(updateBibliothek({id: 1, bibliothekData:{
        bibliothek_title :"Ein Bibliothek Titel",
        bibliothek_ressort:"HTML",
        bibliothek_url:"https://www.youtube.com/watch?v=NpEaa2P7qZI"
      }}))
    })
  });
  it('should delete on click', async ()=>{
    memoizedSelector.setResult([
      {
        id: 1,
        bibliothek_title :"Ein Bibliothek Titel",
        bibliothek_ressort:"HTML",
        bibliothek_url:"https://www.youtube.com/watch?v=NpEaa2P7qZI",

      }
    ]);
    mockStore.refreshState();
    fixture.detectChanges();
    await fixture.whenStable();
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const deleteButton = fixture.debugElement.nativeElement.querySelector('#delete');
    expect(deleteButton).toBeTruthy();
    deleteButton.click();
    expect(dispatchSpy).toHaveBeenCalledWith(deleteBibliothek({id: 1}))
  })
});
