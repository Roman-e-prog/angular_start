import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumThemeDashboardComponent } from './forum-theme-dashboard.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { ForumTheme, ForumThemeState } from '../../../store/reducers/forumTheme.reducer';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { selectAllForumThemeData, selectForumThemeError, selectForumThemeLoading, selectForumThemeMessage } from '../../../store/selectors/forumTheme.selectors';
import { createForumTheme, deleteForumTheme, updateForumTheme } from '../../../store/actions/forumtheme.actions';
import { matDeleteOutline, matEditOutline } from '@ng-icons/material-icons/outline';

describe('ForumThemeDashboardComponent', () => {
  let component: ForumThemeDashboardComponent;
  let fixture: ComponentFixture<ForumThemeDashboardComponent>;
  let mockStore: MockStore;
  let memoizedSelector: MemoizedSelector<ForumThemeState, ForumTheme[]>;
  let memoizedLoadingSelector: MemoizedSelector<ForumThemeState, boolean>;
  let memoizedErrorSelector: MemoizedSelector<ForumThemeState, boolean>;
  let memoizedMessageSelector: MemoizedSelector<ForumThemeState, string>;
  let toastr: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ForumThemeDashboardComponent,
        NgIconsModule,
      ],
      providers:[
        provideIcons({
          matEditOutline,
          matDeleteOutline
        }),
        provideMockStore(),
        provideToastr()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumThemeDashboardComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    memoizedSelector = mockStore.overrideSelector(selectAllForumThemeData,[]);
    memoizedLoadingSelector = mockStore.overrideSelector(selectForumThemeLoading, false);
    memoizedErrorSelector = mockStore.overrideSelector(selectForumThemeError, false);
    memoizedMessageSelector = mockStore.overrideSelector(selectForumThemeMessage, '');
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
        ressort :"HTML",
        title:"Lorem Ipsum",
        content:"Lorem Ipsum Ad Dolores"
      }
    ]);
    mockStore.refreshState();
      fixture.detectChanges();
      await fixture.whenStable();
      const forumThemeTitle = fixture.debugElement.nativeElement.querySelector('.forumThemeTitle');
      const content = fixture.debugElement.nativeElement.querySelector('.content');
      const forumThemeRessort = fixture.debugElement.nativeElement.querySelector('.forumThemeRessort');
      const title = fixture.debugElement.nativeElement.querySelector('.title');
      const forumThemeForm = fixture.debugElement.nativeElement.querySelector('.forumThemeForm');
      const titleInput = fixture.debugElement.nativeElement.querySelector('#title');
      const ressortInput = fixture.debugElement.nativeElement.querySelector('#ressort');
      const contentInput = fixture.debugElement.nativeElement.querySelector('#content');
      const mainButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
  
      expect(content).toBeTruthy();
      expect(forumThemeTitle).toBeTruthy();
      expect(forumThemeRessort).toBeTruthy();
      expect(title).toBeTruthy()
      expect(forumThemeForm).toBeTruthy()
      expect(titleInput).toBeTruthy()
      expect(ressortInput).toBeTruthy()
      expect(contentInput).toBeTruthy()
      expect(mainButton).toBeTruthy()
      expect(forumThemeTitle.textContent.trim()).toEqual('Lorem Ipsum');
      expect(forumThemeRessort.textContent.trim()).toEqual('HTML');
      expect(content.textContent.trim()).toEqual('Lorem Ipsum Ad Dolores');
      expect(title.textContent.trim()).toEqual('Forumthema einpflegen')
  }),
  it('form should get values and send them', ()=>{
    const spyDispatch = spyOn(mockStore, 'dispatch')
    const forumThemeForm = fixture.debugElement.nativeElement.querySelector('.forumThemeForm');
    const titleInput = fixture.debugElement.nativeElement.querySelector('#title');
    const ressortInput = fixture.debugElement.nativeElement.querySelector('#ressort');
    const contentInput = fixture.debugElement.nativeElement.querySelector('#content');
    const mainButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
    component.forumThemeForm.controls['title'].setValue('Lorem Ipsum');
    component.forumThemeForm.controls['ressort'].setValue('CSS');
    component.forumThemeForm.controls['content'].setValue('Testinhalt');
    expect(titleInput.value).toEqual('Lorem Ipsum');
    expect(ressortInput.value).toEqual('CSS');
    expect(contentInput.value).toEqual('Testinhalt');
    fixture.detectChanges();
    mainButton.click();
    
    expect(spyDispatch).toHaveBeenCalledWith(createForumTheme(
      {
        forumThemeData:{
                        title:"Lorem Ipsum", 
                        ressort:"CSS", 
                        content:"Testinhalt"
                      }
    }))
  })
  it('should open edit Form on click', async ()=>{
    const spyDispatch = spyOn(mockStore, 'dispatch');
    memoizedSelector.setResult([
      {
        id: 1,
        ressort :"HTML",
        title:"Lorem Ipsum",
        content:"Lorem Ipsum Ad Dolores"
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
      expect(title.textContent.trim()).toEqual('Forumthema updaten');
      const editForumThemeForm = fixture.debugElement.nativeElement.querySelector('.editForumThemeForm');
      expect(editForumThemeForm).toBeTruthy();
      const titleInput = fixture.debugElement.nativeElement.querySelector('#title');
      const ressortInput = fixture.debugElement.nativeElement.querySelector('#ressort');
      const contentInput = fixture.debugElement.nativeElement.querySelector('#content');
      expect(titleInput).toBeTruthy();
      expect(ressortInput).toBeTruthy();
      expect(contentInput).toBeTruthy();
      expect(titleInput.value).toEqual('Lorem Ipsum');
      expect(ressortInput.value).toEqual('HTML');
      expect(contentInput.value).toEqual('Lorem Ipsum Ad Dolores');
      const submitButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
      submitButton.click();
      fixture.detectChanges();
      expect(spyDispatch).toHaveBeenCalledWith(updateForumTheme({id: 1, forumThemeData:{
        ressort :"HTML",
        title:"Lorem Ipsum",
        content:"Lorem Ipsum Ad Dolores"
      
      }}))
    })
  });
  it('should delete on click', async ()=>{
    memoizedSelector.setResult([
      {
        id: 1,
        ressort :"HTML",
        title:"Lorem Ipsum",
        content:"Lorem Ipsum Ad Dolores"
      }
    ]);
    mockStore.refreshState();
    fixture.detectChanges();
    await fixture.whenStable();
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const deleteButton = fixture.debugElement.nativeElement.querySelector('#delete');
    expect(deleteButton).toBeTruthy();
    deleteButton.click();
    expect(dispatchSpy).toHaveBeenCalledWith(deleteForumTheme({id: 1}))
  })
});
