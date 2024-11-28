import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountComponent } from './account.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services_interceptors/auth.service';
import { MemoizedSelector } from '@ngrx/store';
import { UserMessage, UserMessageState } from '../../store/reducers/userMessage.reducer';
import { AdminMessage, AdminMessageState } from '../../store/reducers/adminMessage.reducer';
import { Forum, ForumState } from '../../store/reducers/forum.reducer';
import { selectAllUserMessageData, selectUserMessageError, selectUserMessageLoading, selectUserMessageMessage } from '../../store/selectors/userMessage.selector';
import { selectAdminMessageError, selectAdminMessageLoading, selectAdminMessageMessage, selectAllAdminMessageData, selectUserAdminMessage } from '../../store/selectors/adminMessage.selector';
import { selectAllUserQuestions, selectForumError, selectForumLoading, selectForumMessage } from '../../store/selectors/forum.selectors';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { createUserMessage } from '../../store/actions/usermessage.actions';
import { deleteBlogmember, updateBlogmember } from '../../store/actions/blogmember.actions';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let authService: AuthService;
  let location: Location;
  let toastr: ToastrService;
  let mockStore: MockStore;
  let memoizedSelector: MemoizedSelector<UserMessageState, UserMessage[]>;
  let memoizedLoadingSelector: MemoizedSelector<UserMessageState, boolean>;
  let memoizedErrorSelector: MemoizedSelector<UserMessageState, boolean>;
  let memoizedMessageSelector: MemoizedSelector<UserMessageState, string>;

  let memoizedUserAdminMessageSelector: MemoizedSelector<AdminMessageState, AdminMessage[]>;
  let memoizedAdminMessageLoadingSelector: MemoizedSelector<AdminMessageState, boolean>;
  let memoizedAdminMessageErrorSelector: MemoizedSelector<AdminMessageState, boolean>;
  let memoizedAdminMessageMessageSelector: MemoizedSelector<AdminMessageState, string>;

  let memoizedUserQuestionSelector: MemoizedSelector<ForumState, Forum[]>;
  let memoizedUserQuestionLoadingSelector: MemoizedSelector<ForumState, boolean>;
  let memoizedUserQuestionErrorSelector: MemoizedSelector<ForumState, boolean>;
  let memoizedUserQuestionMessageSelector: MemoizedSelector<ForumState, string>;
  beforeEach(async () => {
    const authMock = {
      user$: {id: 1, username:"RomanArmin", vorname:"Roman", nachname:"Rostock", is_admin:true},
      getUser: jasmine.createSpy('getUser').and.returnValue({id: 1, username:"RomanArmin", vorname:"Roman", nachname:"Rostock", is_admin:true})
    }
    const activatedRoute = {snapshot:{paramMap: {get: jasmine.createSpy().and.returnValue('1')}}} as any;
    await TestBed.configureTestingModule({
      imports: [
        AccountComponent,
        NgIconsModule
      ],
      providers:[
        provideIcons({}),
        provideMockStore(),
        provideToastr(),
        {provide: AuthService, useValue: authMock},
        {provide: ActivatedRoute, useValue: activatedRoute},
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    location = TestBed.inject(Location);
    mockStore = TestBed.inject(MockStore);
    toastr = TestBed.inject(ToastrService);
    memoizedSelector = mockStore.overrideSelector(selectAllUserMessageData,[]);
    memoizedLoadingSelector = mockStore.overrideSelector(selectUserMessageLoading, false);
    memoizedErrorSelector = mockStore.overrideSelector(selectUserMessageError, false);
    memoizedMessageSelector = mockStore.overrideSelector(selectUserMessageMessage,'');

    memoizedUserAdminMessageSelector = mockStore.overrideSelector(selectUserAdminMessage,[]);
    memoizedAdminMessageLoadingSelector = mockStore.overrideSelector(selectAdminMessageLoading, false);
    memoizedAdminMessageErrorSelector = mockStore.overrideSelector(selectAdminMessageError, false);
    memoizedAdminMessageMessageSelector = mockStore.overrideSelector(selectAdminMessageMessage,'');

    memoizedUserQuestionSelector = mockStore.overrideSelector(selectAllUserQuestions,[]);
    memoizedUserQuestionLoadingSelector = mockStore.overrideSelector(selectForumLoading, false);
    memoizedUserQuestionErrorSelector = mockStore.overrideSelector(selectForumError, false);
    memoizedUserQuestionMessageSelector = mockStore.overrideSelector(selectForumMessage,'');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  fit('should greet the user', ()=>{
    const greeting = fixture.debugElement.nativeElement.querySelector('.greeting');
    const hallo = fixture.debugElement.nativeElement.querySelector('.hallo');

    expect(greeting).toBeTruthy();
    expect(hallo.textContent.trim()).toEqual('Hallo RomanArmin')
  });
  fit('backButton should work', ()=>{
    const goBackSpy = spyOn(location, 'back')
    const goBack = fixture.debugElement.nativeElement.querySelector('.goBack');
    expect(goBack).toBeTruthy();
    goBack.click();
    fixture.detectChanges();
    expect(goBackSpy).toHaveBeenCalled();
  });
  fit('should have adminMessages', async ()=>{
    memoizedUserAdminMessageSelector.setResult([
      {
        id: 1,
        adminname:"RomanArmin",
        admin_id: 1,
        message: "Lorem Ipsum Ad Dolores",
        username:"RomanArmin",
        user_id: 1,
        usermessage_id:1,
        created_at: new Date('2023-11-27T10:00:00Z')
      }
    ]);
    mockStore.refreshState();
    fixture.detectChanges();
    await fixture.whenStable().then(()=>{
      const adminMessages = fixture.debugElement.nativeElement.querySelector('.adminMessages');
      const userGreeting = fixture.debugElement.nativeElement.querySelector('.userGreeting');
      const nachricht = fixture.debugElement.nativeElement.querySelector('.nachricht');
      const adminname = fixture.debugElement.nativeElement.querySelector('.adminname');
      expect(adminMessages).toBeTruthy();
      expect(userGreeting.textContent.trim()).toEqual('Hallo RomanArmin,');
      expect(nachricht.textContent.trim()).toEqual('Lorem Ipsum Ad Dolores');
      expect(adminname.textContent.trim()).toEqual('Gruß RomanArmin');
    })
  });
  fit('should have no adminMessages', ()=>{
    const noMessage = fixture.debugElement.nativeElement.querySelector('.noMessage');
    expect(noMessage).toBeTruthy();
    expect(noMessage.textContent.trim()).toEqual('Sie haben derzeit keine Nachrichten')
  });
  fit('userQuestion should work on button click', async ()=>{
    const spyDispatch = spyOn(mockStore, 'dispatch')
    const accountManagement = fixture.debugElement.nativeElement.querySelector('.accountManagement');
    expect(accountManagement).toBeTruthy();
    expect(accountManagement.textContent.trim()).toEqual('Nachrichten an den Admin & Delete')
    accountManagement.click();
    fixture.detectChanges();
    await fixture.whenStable().then(async ()=>{
      const accountModule = fixture.debugElement.nativeElement.querySelector('.accountModule');
      const accountButtons = fixture.debugElement.nativeElement.querySelector('.accountButtons');
      const message = fixture.debugElement.nativeElement.querySelector('.message');
      const closeModule = fixture.debugElement.nativeElement.querySelector('.closeModule');
      const warn = fixture.debugElement.nativeElement.querySelector('.warn');
      expect(accountModule).toBeTruthy();
      expect(accountButtons).toBeTruthy();
      expect(message).toBeTruthy();
      expect(closeModule).toBeTruthy();
      expect(warn).toBeTruthy();
      //messageModule works
      message.click();
      fixture.detectChanges();
      await fixture.whenStable().then(()=>{
        const messageModule = fixture.debugElement.nativeElement.querySelector('.messageModule');
        expect(messageModule).toBeTruthy();
        const userMessageForm = fixture.debugElement.nativeElement.querySelector('.userMessageForm');
        const message = fixture.debugElement.nativeElement.querySelector('#message');
        const submitBtn = fixture.debugElement.nativeElement.querySelector('.mainButton');
        component.usermessageForm.controls['message'].setValue('Eine Nachricht an den Admin');
        submitBtn.click();
        fixture.detectChanges();
        expect(spyDispatch).toHaveBeenCalledWith(createUserMessage({userMessageData:{
          username: "RomanArmin",
          user_id: parseInt(component.id!),
          message: "Eine Nachricht an den Admin",
        }}))
      })
    })
  });
  fit('test the closeModule',async ()=>{
      const accountManagement = fixture.debugElement.nativeElement.querySelector('.accountManagement');
    expect(accountManagement).toBeTruthy();
      //closeModule works
      accountManagement.click();
      fixture.detectChanges();
      await fixture.whenStable();
      const closeModule = fixture.debugElement.nativeElement.querySelector('.closeModule');
      expect(closeModule).toBeTruthy();
      closeModule.click();
      fixture.detectChanges();
      await fixture.whenStable().then(()=>{
      const accountModule = fixture.debugElement.nativeElement.querySelector('.accountModule');
      const accountButtons = fixture.debugElement.nativeElement.querySelector('.accountButtons');
      const message = fixture.debugElement.nativeElement.querySelector('.message');
      const closeModule = fixture.debugElement.nativeElement.querySelector('.closeModule');
      const warn = fixture.debugElement.nativeElement.querySelector('.warn');
      expect(accountModule).toBeFalsy();
      expect(accountButtons).toBeFalsy();
      expect(message).toBeFalsy();
      expect(closeModule).toBeFalsy();
      expect(warn).toBeFalsy();
      })
  });
  fit('user should be able to delete his account', async ()=>{
    const spyDispatch = spyOn(mockStore, 'dispatch')
    const accountManagement = fixture.debugElement.nativeElement.querySelector('.accountManagement');
    expect(accountManagement).toBeTruthy();
    expect(accountManagement.textContent.trim()).toEqual('Nachrichten an den Admin & Delete')
    accountManagement.click();
    fixture.detectChanges();
    await fixture.whenStable().then(async ()=>{
      const accountModule = fixture.debugElement.nativeElement.querySelector('.accountModule');
      const accountButtons = fixture.debugElement.nativeElement.querySelector('.accountButtons');
      const warn = fixture.debugElement.nativeElement.querySelector('.warn');
      expect(accountModule).toBeTruthy();
      expect(accountButtons).toBeTruthy();
      expect(warn).toBeTruthy();
      //messageModule works
      warn.click();
      fixture.detectChanges();
      await fixture.whenStable().then(()=>{
        const warning = fixture.debugElement.nativeElement.querySelector('.warning');
        expect(warning).toBeTruthy();
        const deleteBtn = fixture.debugElement.nativeElement.querySelector('.delete');
        deleteBtn.click();
        fixture.detectChanges();
        expect(spyDispatch).toHaveBeenCalledWith(deleteBlogmember({id: parseInt(component.id!)}))
      })
    })
  });
  fit('should see his questions', async ()=>{
    memoizedUserQuestionSelector.setResult([
      {
        id: 1,
        username: "RomanArmin",
        user_id: 1,
        is_admin: true,
        question_ressort: "HTML",
        question_theme: "Irgendein Thema",
        question: "Lorem Ipsum Ad Dolores",
        likes: 0 ,
        dislikes: 0 ,
        solved: false,
        views: 0,
      }
    ])
    mockStore.refreshState();
    fixture.detectChanges();
    await fixture.whenStable().then(()=>{
      const theme = fixture.debugElement.nativeElement.querySelector('.theme');
      const question = fixture.debugElement.nativeElement.querySelector('.question');
      const counter = fixture.debugElement.nativeElement.querySelector('.counter');
      expect(theme).toBeTruthy();
      expect(question).toBeTruthy();
      expect(counter).toBeTruthy();
      expect(theme.textContent.trim()).toEqual('Irgendein Thema');
      expect(question.textContent.trim()).toEqual('Lorem Ipsum Ad Dolores');
      expect(counter.textContent.trim()).toEqual('0');
    })
  });
  fit('should be able to update his data', async ()=>{
    const spyDispatch = spyOn(mockStore, 'dispatch')
    const updateUserForm = fixture.debugElement.nativeElement.querySelector('.updateUserForm');
    const vorname = fixture.debugElement.nativeElement.querySelector('#vorname');
    const nachname = fixture.debugElement.nativeElement.querySelector('#nachname');
    const updateButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
    expect(updateUserForm).toBeTruthy();
    component.updateUserForm.controls['vorname'].setValue('Roman Armin')
    updateButton.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spyDispatch).toHaveBeenCalledWith(updateBlogmember({id:parseInt(component.id!), blogmemberData:{
      vorname: "Roman Armin",
      nachname: "Rostock"
    }}))
  })
});
