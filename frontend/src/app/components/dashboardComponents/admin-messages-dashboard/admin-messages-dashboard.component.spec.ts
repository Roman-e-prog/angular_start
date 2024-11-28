import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMessagesDashboardComponent } from './admin-messages-dashboard.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { AdminMessage, AdminMessageState } from '../../../store/reducers/adminMessage.reducer';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { matDeleteOutline, matEditOutline } from '@ng-icons/material-icons/outline';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { selectAdminMessageError, selectAdminMessageLoading, selectAdminMessageMessage, selectAllAdminMessageData } from '../../../store/selectors/adminMessage.selector';
import { UserMessage, UserMessageState } from '../../../store/reducers/userMessage.reducer';
import { Blogmember, BlogmemberState } from '../../../store/reducers/blogMember.reducer';
import { createAdminMessage, deleteAdminMessage, updateAdminMessage } from '../../../store/actions/adminmessage.actions';
import { AuthService } from '../../../services_interceptors/auth.service';
import { selectAllUserMessageData, selectUserMessageError, selectUserMessageLoading, selectUserMessageMessage } from '../../../store/selectors/userMessage.selector';
import { selectAllBlogmemberData, selectBlogmemberError, selectBlogmemberLoading, selectBlogmemberMessage } from '../../../store/selectors/blogmember.selector';

describe('AdminMessagesDashboardComponent', () => {
  let component: AdminMessagesDashboardComponent;
  let fixture: ComponentFixture<AdminMessagesDashboardComponent>;
  let authService: AuthService;
  let mockStore: MockStore;
  let memoizedSelector: MemoizedSelector<AdminMessageState, AdminMessage[]>;
  let memoizedLoadingSelector: MemoizedSelector<AdminMessageState, boolean>;
  let memoizedErrorSelector: MemoizedSelector<AdminMessageState, boolean>;
  let memoizedMessageSelector: MemoizedSelector<AdminMessageState, string>;

  let memoizedUsermessageSelector: MemoizedSelector<UserMessageState, UserMessage[]>;
  let memoizedUsermessageLoadingSelector: MemoizedSelector<UserMessageState, boolean>;
  let memoizedUsermessageErrorSelector: MemoizedSelector<UserMessageState, boolean>;
  let memoizedUsermessageMessageSelector: MemoizedSelector<UserMessageState, string>;

  let memoizedBlogmemberSelector: MemoizedSelector<BlogmemberState, Blogmember[]>;
  let memoizedBlogmemberLoadingSelector: MemoizedSelector<BlogmemberState, boolean>;
  let memoizedBlogmemberErrorSelector: MemoizedSelector<BlogmemberState, boolean>;
  let memoizedBlogmemberMessageSelector: MemoizedSelector<BlogmemberState, string>;
  let toastr: ToastrService;
  beforeEach(async () => {
    const authMock = {
      user$: {username:"RomanArmin", id:1, is_admin:true},
      getUser: jasmine.createSpy('getUser').and.returnValue({id: 1, username:"RomanArmin", is_admin:true}),
    }
    await TestBed.configureTestingModule({
      imports: [
        AdminMessagesDashboardComponent,
        NgIconsModule,
      ],
      providers:[
        provideIcons({
          matEditOutline,
          matDeleteOutline
        }),
        provideMockStore(),
        provideToastr(),
        {provide: AuthService, useValue:authMock}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMessagesDashboardComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    mockStore = TestBed.inject(MockStore);
    memoizedSelector = mockStore.overrideSelector(selectAllAdminMessageData,[]);
    memoizedLoadingSelector = mockStore.overrideSelector(selectAdminMessageLoading, false);
    memoizedErrorSelector = mockStore.overrideSelector(selectAdminMessageError, false);
    memoizedMessageSelector = mockStore.overrideSelector(selectAdminMessageMessage, '');

    memoizedUsermessageSelector = mockStore.overrideSelector(selectAllUserMessageData,[]);
    memoizedUsermessageLoadingSelector = mockStore.overrideSelector(selectUserMessageLoading, false);
    memoizedUsermessageErrorSelector = mockStore.overrideSelector(selectUserMessageError, false);
    memoizedUsermessageMessageSelector = mockStore.overrideSelector(selectUserMessageMessage, '');

    memoizedBlogmemberSelector = mockStore.overrideSelector(selectAllBlogmemberData,[]);
    memoizedBlogmemberLoadingSelector = mockStore.overrideSelector(selectBlogmemberLoading, false);
    memoizedBlogmemberErrorSelector = mockStore.overrideSelector(selectBlogmemberError, false);
    memoizedBlogmemberMessageSelector = mockStore.overrideSelector(selectBlogmemberMessage, '');
    toastr = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  fit('should have all its elements', async ()=>{
    memoizedSelector.setResult([
      {
        id: 1,
        adminname:"Roman",
        admin_id: 1,
        message: "Lorem Ipsum Ad Dolores",
        username:"TestMartin",
        user_id: 2,
        usermessage_id:1,
        created_at: new Date('2023-11-27T10:00:00Z')

      }
    ]);
    memoizedUsermessageSelector.setResult([
      {
        id: 1,
        username:"TestMartin",
        user_id: 2,
        message: "Eine Testnachricht",
        is_answered: false,
        created_at: new Date('2023-11-27T10:00:00Z')

      }
    ]);
    memoizedBlogmemberSelector.setResult([
      {
        id: 1,
        username: "TestMartin",
        vorname: "Martin",
        nachname: "Tester",
        email: "martin@test.de",
        profile_picture:"",
        is_admin: false,
      }
    ]);
      mockStore.refreshState();
      fixture.detectChanges();
      await fixture.whenStable();
      //display usermessages
      const userName = fixture.debugElement.nativeElement.querySelector('.userName');
      const userMessageId = fixture.debugElement.nativeElement.querySelector('.userMessageid');
      const userId = fixture.debugElement.nativeElement.querySelector('.userid');
      const date = fixture.debugElement.nativeElement.querySelector('.date');
      const message = fixture.debugElement.nativeElement.querySelector('.message');
      const answered = fixture.debugElement.nativeElement.querySelector('.answered');
      const usermessageDelete = fixture.debugElement.nativeElement.querySelector('#usermessageDelete');
      const noMessages = fixture.debugElement.nativeElement.querySelector('.noMessages');
      //blogmember
      const show = fixture.debugElement.nativeElement.querySelector('#show');
      const noUser = fixture.debugElement.nativeElement.querySelector('.noUser');
      //form
      const adminMessageForm = fixture.debugElement.nativeElement.querySelector('.adminMessageForm');
      const username = fixture.debugElement.nativeElement.querySelector('#username');
      const user_id = fixture.debugElement.nativeElement.querySelector('#user_id');
      const usermessage_id = fixture.debugElement.nativeElement.querySelector('#usermessage_id');
      const messageInput = fixture.debugElement.nativeElement.querySelector('#message');
      const mainButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
      
      //adminMessages
      const adminName = fixture.debugElement.nativeElement.querySelector('.adminName');
      const adminMessageDate = fixture.debugElement.nativeElement.querySelector('#adminMessageDate');
      const adminMessage = fixture.debugElement.nativeElement.querySelector('#adminMessage');
      const toUser = fixture.debugElement.nativeElement.querySelector('.toUser');
      const toUserId = fixture.debugElement.nativeElement.querySelector('.toUserId');
      const userQuestion = fixture.debugElement.nativeElement.querySelector('.userQuestion');
      //assertions usermessage
      expect(userMessageId).toBeTruthy();
      expect(userMessageId.textContent.trim()).toEqual('1');
      expect(userName).toBeTruthy();
      expect(userName.textContent.trim()).toEqual('TestMartin');
      expect(userId).toBeTruthy();
      expect(userId.textContent.trim()).toEqual('2');
      expect(date).toBeTruthy();
      expect(date.textContent.trim()).toContain('Monday, November 27, 2023');
      expect(message).toBeTruthy();
      expect(message.textContent.trim()).toEqual('Eine Testnachricht')
      expect(answered).toBeFalsy();
      expect(usermessageDelete).toBeTruthy()
      expect(noMessages).toBeFalsy()
      //assertions blogmemer
      expect(show).toBeTruthy()
      expect(noUser).toBeFalsy()
      //assertions form
      expect(adminMessageForm).toBeTruthy();
      expect(username).toBeTruthy();
      expect(user_id).toBeTruthy();
      expect(usermessage_id).toBeTruthy();
      expect(messageInput).toBeTruthy();
      expect(mainButton).toBeTruthy();
      //assertions adminMessage
      expect(adminName).toBeTruthy();
      expect(adminName.textContent.trim()).toEqual('Roman');
      expect(adminMessageDate).toBeTruthy();
      expect(adminMessageDate.textContent.trim()).toContain('Monday, November 27, 2023');
      expect(adminMessage).toBeTruthy();
      expect(adminMessage.textContent.trim()).toEqual('Lorem Ipsum Ad Dolores');
      expect(toUser).toBeTruthy();
      expect(toUser.textContent.trim()).toEqual('Nachricht an: TestMartin');
      expect(toUserId).toBeTruthy();
      expect(toUserId.textContent.trim()).toEqual('Nachricht an: 2');
      expect(userQuestion).toBeTruthy();
      expect(userQuestion.textContent.trim()).toEqual('Die Frage 1');
  }),
  fit('form should get values and send them', ()=>{
    memoizedUsermessageSelector.setResult([
      {
        id: 1,
        username:"TestMartin",
        user_id: 2,
        message: "Eine Testnachricht",
        is_answered: false,
        created_at: new Date('2023-11-27T10:00:00Z')
      }
    ]);
    const spyDispatch = spyOn(mockStore, 'dispatch')
    const adminMessageForm = fixture.debugElement.nativeElement.querySelector('.adminMessageForm');
      const username = fixture.debugElement.nativeElement.querySelector('#username');
      const user_id = fixture.debugElement.nativeElement.querySelector('#user_id');
      const usermessage_id = fixture.debugElement.nativeElement.querySelector('#usermessage_id');
      const messageInput = fixture.debugElement.nativeElement.querySelector('#message');
      const mainButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
    component.adminMessageForm.controls['username'].setValue('TestMartin');
    component.adminMessageForm.controls['user_id'].setValue(2);
    component.adminMessageForm.controls['usermessage_id'].setValue(1);
    component.adminMessageForm.controls['message'].setValue('Eine Nachricht an den user');
    expect(username.value).toEqual('TestMartin');
    expect(user_id.value).toEqual('2');
    expect(usermessage_id.value).toEqual('1');
    expect(messageInput.value).toEqual('Eine Nachricht an den user');
    fixture.detectChanges();
    mainButton.click();
    
    expect(spyDispatch).toHaveBeenCalledWith(createAdminMessage(
      {
        adminMessageData:{
                        adminname:"RomanArmin",
                        admin_id:1,
                        username:"TestMartin", 
                        user_id: 2, 
                        usermessage_id: 1, 
                        message: 'Eine Nachricht an den user', 
                      }
    }))
  })
  fit('should open edit Form on click', async ()=>{
    const spyDispatch = spyOn(mockStore, 'dispatch');
    memoizedSelector.setResult([
      {
        id: 1,
        adminname:"Roman",
        admin_id: 1,
        message: "Lorem Ipsum Ad Dolores",
        username:"TestMartin",
        user_id: 2,
        usermessage_id:1,
        created_at: new Date('2023-11-27T10:00:00Z')
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
      const editAdminMessageForm = fixture.debugElement.nativeElement.querySelector('.editAdminMessageForm');
      expect(editAdminMessageForm).toBeTruthy();
      const message = fixture.debugElement.nativeElement.querySelector('#message');

      expect(message).toBeTruthy();
      expect(message.value).toEqual('Lorem Ipsum Ad Dolores');
      const submitButton = fixture.debugElement.nativeElement.querySelector('.mainButton');
      submitButton.click();
      fixture.detectChanges();
      expect(spyDispatch).toHaveBeenCalledWith(updateAdminMessage({id: 1, adminMessageData:{
        message: "Lorem Ipsum Ad Dolores",
      }}))
    })
  });
  fit('should delete on click', async ()=>{
    memoizedSelector.setResult([
      {
        id: 1,
        adminname:"Roman",
        admin_id: 1,
        message: "Lorem Ipsum Ad Dolores",
        username:"TestMartin",
        user_id: 2,
        usermessage_id:1,
        created_at: new Date('2023-11-27T10:00:00Z')
      }
    ]);
    mockStore.refreshState();
    fixture.detectChanges();
    await fixture.whenStable();
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const deleteButton = fixture.debugElement.nativeElement.querySelector('#delete');
    expect(deleteButton).toBeTruthy();
    deleteButton.click();
    expect(dispatchSpy).toHaveBeenCalledWith(deleteAdminMessage({id: 1}))
  })
  fit('should displayUser on button click', async ()=>{
    memoizedBlogmemberSelector.setResult([
      {
        id: 2,
        username: "TestMartin",
        vorname: "Martin",
        nachname: "Tester",
        email: "martin@test.de",
        profile_picture:"",
        is_admin: false,
        created_at: new Date('2023-11-27T10:00:00Z')
      }
    ]);
    mockStore.refreshState();
    fixture.detectChanges();
    //blogmember
    const show = fixture.debugElement.nativeElement.querySelector('#show');
    const hide = fixture.debugElement.nativeElement.querySelector('#hide');
    const noUser = fixture.debugElement.nativeElement.querySelector('.noUser');
   ;
    expect(show).toBeTruthy();
    expect(hide).toBeFalsy();
    expect(noUser).toBeFalsy();
    show.click();
    fixture.detectChanges();
    await fixture.whenStable().then(()=>{
      const show = fixture.debugElement.nativeElement.querySelector('#show');
      const hide = fixture.debugElement.nativeElement.querySelector('#hide');
      const userTable = fixture.debugElement.nativeElement.querySelector('.userTable');
      const blogmemberName = fixture.debugElement.nativeElement.querySelector('#blogmemberName');
      const blogmemberId = fixture.debugElement.nativeElement.querySelector('#blogmemberId');
      const blogmemberDate = fixture.debugElement.nativeElement.querySelector('#blogmemberDate');
      const blogmemberVorname = fixture.debugElement.nativeElement.querySelector('#blogmemberVorname');
      const blogmemberNachname = fixture.debugElement.nativeElement.querySelector('#blogmemberNachname');
      const blogmemberEmail = fixture.debugElement.nativeElement.querySelector('#blogmemberEmail')
      expect(show).toBeFalsy();
      expect(hide).toBeTruthy();
      expect(userTable).toBeTruthy();
      expect(blogmemberName.textContent.trim()).toEqual('TestMartin');
      expect(blogmemberId.textContent.trim()).toEqual('2');
      expect(blogmemberDate.textContent.trim()).toContain('Monday, November 27, 2023');
      expect(blogmemberVorname.textContent.trim()).toEqual('Martin');
      expect(blogmemberNachname.textContent.trim()).toEqual('Tester');
      expect(blogmemberEmail.textContent.trim()).toEqual('martin@test.de');
    
      })
  })
});
