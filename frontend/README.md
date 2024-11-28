# Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
it('should have a usermessage and set userdata on click in the form', (done) => {
  mockUsermessageSelector.setResult([
    {
      id: 1,
      created_at: new Date('2024-10-28T10:00:00Z'),
      user_id: 1,
      username: "TestUser",
      message: "Lorem Ipsum",
      is_answered: false,
    }
  ]);
  mockStore.refreshState();
  fixture.detectChanges();

  fixture.whenStable().then(() => {
    const fieldWrapper = fixture.debugElement.nativeElement.querySelector('.fieldWrapper');
    const date = fixture.debugElement.nativeElement.querySelector('.date');
    const user_id = fixture.debugElement.nativeElement.querySelector('.user_id');
    const username = fixture.debugElement.nativeElement.querySelector('.username');
    const message = fixture.debugElement.nativeElement.querySelector('.message');
    const is_answered = fixture.debugElement.nativeElement.querySelector('#is_answered');

    expect(fieldWrapper).toBeTruthy();
    expect(date).toBeTruthy();
    expect(user_id).toBeTruthy();
    expect(username).toBeTruthy();
    expect(message).toBeTruthy();
    expect(is_answered).toBeTruthy();
    expect(date.textContent.trim()).toEqual('10/28/24, 11:00 AM');
    expect(user_id.textContent.trim()).toEqual('1');
    expect(username.textContent.trim()).toEqual('TestUser');
    expect(message.textContent.trim()).toEqual('Lorem Ipsum');
    expect(is_answered).toHaveClass('icon');

    fieldWrapper.click();
    setTimeout(() => {
      const inputUsername = fixture.debugElement.nativeElement.querySelector('#username');
      const inputUserId = fixture.debugElement.nativeElement.querySelector('#user_id');
      const inputUsermessage_id = fixture.debugElement.nativeElement.querySelector('#usermessage_id');

      expect(inputUsername.value).toEqual('TestUser');
      expect(inputUserId.value).toEqual('1');
      expect(inputUsermessage_id.value).toEqual('1');
      done(); // Call done to signal Jasmine that the test is complete
    }, 500);
  });
});
let component: AdminmessagesComponent;
let fixture: ComponentFixture<AdminmessagesComponent>;
let authService: AuthService;
let toastr: ToastrService;
let mockStore: MockStore;
let mockUserSelector: MemoizedSelector<UsermessageState, Usermessage[]>;
let mockUserErrorSelector: MemoizedSelector<UsermessageState, boolean>;
let mockUserLoadingSelector: MemoizedSelector<UsermessageState, boolean>;
let mockUserMessageSelector: MemoizedSelector<UsermessageState, string>;
let mockBlogmemberSelector: MemoizedSelector<BlogmemberState, Blogmember[]>;
let mockBlogmemberErrorSelector: MemoizedSelector<BlogmemberState, boolean>;
let mockBlogmemberLoadingSelector: MemoizedSelector<BlogmemberState, boolean>;
let mockBlogmemberMessageSelector: MemoizedSelector<BlogmemberState, string>;
let mockAdminmessageSelector: MemoizedSelector<AdminmessageState, Adminmessage[]>;
let mockAdminmessageErrorSelector: MemoizedSelector<AdminmessageState, boolean>;
let mockAdminmessageLoadingSelector: MemoizedSelector<AdminmessageState, boolean>;
let mockAdminmessageMessageSelector: MemoizedSelector<AdminmessageState, string>;

beforeEach(waitForAsync(() => {
  const authMock = {
    user$: { id: 1, username: "RomanArmin", is_admin: true },
    getUser: jasmine.createSpy('getUser').and.returnValue({ id: 1, username: "RomanArmin", is_admin: true })
  };

  TestBed.configureTestingModule({
    imports: [
      AdminmessagesComponent,
      NgIconsModule,
    ],
    providers: [
      { provide: AuthService, useValue: authMock },
      provideMockStore(),
      provideToastr(),
      provideIcons({
        matDeleteOutline,
        matEditOutline,
      })
    ]
  });

  mockStore = TestBed.inject(MockStore);

  // Override selectors for user messages
  mockUserSelector = mockStore.overrideSelector(selectAllUsermessageData, []);
  mockUserErrorSelector = mockStore.overrideSelector(selectUsermessageFailure, false);
  mockUserLoadingSelector = mockStore.overrideSelector(selectUsermessageLoading, false);
  mockUserMessageSelector = mockStore.overrideSelector(selectUsermessageMessage, '');

  // Override selectors for blog members
  mockBlogmemberSelector = mockStore.overrideSelector(selectAllBlogmemberData, []);
  mockBlogmemberErrorSelector = mockStore.overrideSelector(selectBlogmemberError, false);
  mockBlogmemberLoadingSelector = mockStore.overrideSelector(selectBlogmemberLoading, false);
  mockBlogmemberMessageSelector = mockStore.overrideSelector(selectBlogmemberMessage, '');

  // Override selectors for admin messages
  mockAdminmessageSelector = mockStore.overrideSelector(selectAllAdminmessageData, []);
  mockAdminmessageErrorSelector = mockStore.overrideSelector(selectAdminmessageFailure, false);
  mockAdminmessageLoadingSelector = mockStore.overrideSelector(selectAdminmessageLoading, false);
  mockAdminmessageMessageSelector = mockStore.overrideSelector(selectAdminmessageMessage, '');

  fixture = TestBed.createComponent(AdminmessagesComponent);
  authService = TestBed.inject(AuthService);
  toastr = TestBed.inject(ToastrService);
  component = fixture.componentInstance;
  fixture.detectChanges();
}));

it('should create', () => {
  expect(component).toBeTruthy();
});
mockUserSelector.setResult([
  {
    id: 1,
    created_at: new Date('2024-10-28T10:00:00Z'), // Example date
    user_id: 1,
    message: "Lorem Ipsum"
  }
]);it('should have a usermessage and set userdata on click in the form', (done) => {
  mockUsermessageSelector.setResult([
    {
      id: 1,
      created_at: new Date('2024-10-28T10:00:00Z'),
      user_id: 1,
      username: "TestUser",
      message: "Lorem Ipsum",
      is_answered: false,
    }
  ]);
  mockStore.refreshState();
  fixture.detectChanges();

  fixture.whenStable().then(() => {
    const fieldWrapper = fixture.debugElement.nativeElement.querySelector('.fieldWrapper');
    const date = fixture.debugElement.nativeElement.querySelector('.date');
    const user_id = fixture.debugElement.nativeElement.querySelector('.user_id');
    const username = fixture.debugElement.nativeElement.querySelector('.username');
    const message = fixture.debugElement.nativeElement.querySelector('.message');
    const is_answered = fixture.debugElement.nativeElement.querySelector('#is_answered');

    expect(fieldWrapper).toBeTruthy();
    expect(date).toBeTruthy();
    expect(user_id).toBeTruthy();
    expect(username).toBeTruthy();
    expect(message).toBeTruthy();
    expect(is_answered).toBeTruthy();
    expect(date.textContent.trim()).toEqual('10/28/24, 11:00 AM');
    expect(user_id.textContent.trim()).toEqual('1');
    expect(username.textContent.trim()).toEqual('TestUser');
    expect(message.textContent.trim()).toEqual('Lorem Ipsum');
    expect(is_answered).toHaveClass('icon');

    fieldWrapper.click();
    setTimeout(() => {
      const inputUsername = fixture.debugElement.nativeElement.querySelector('#username');
      const inputUserId = fixture.debugElement.nativeElement.querySelector('#user_id');
      const inputUsermessage_id = fixture.debugElement.nativeElement.querySelector('#usermessage_id');

      expect(inputUsername.value).toContain('TestUser');
      expect(inputUserId.value).toContain('1');
      expect(inputUsermessage_id.value).toContain('1');
      done(); // Call done to signal Jasmine that the test is complete
    }, 500);
  });
});

it('should have a usermessage and set userdata on click in the form', (done) => {
  mockUsermessageSelector.setResult([
    {
      id: 1,
      created_at: new Date('2024-10-28T10:00:00Z'),
      user_id: 1,
      username: "TestUser",
      message: "Lorem Ipsum",
      is_answered: false,
    }
  ]);
  mockStore.refreshState();
  fixture.detectChanges();

  fixture.whenStable().then(() => {
    const fieldWrapper = fixture.debugElement.nativeElement.querySelector('.fieldWrapper');
    const date = fixture.debugElement.nativeElement.querySelector('.date');
    const user_id = fixture.debugElement.nativeElement.querySelector('.user_id');
    const username = fixture.debugElement.nativeElement.querySelector('.username');
    const message = fixture.debugElement.nativeElement.querySelector('.message');
    const is_answered = fixture.debugElement.nativeElement.querySelector('#is_answered');

    expect(fieldWrapper).toBeTruthy();
    expect(date).toBeTruthy();
    expect(user_id).toBeTruthy();
    expect(username).toBeTruthy();
    expect(message).toBeTruthy();
    expect(is_answered).toBeTruthy();
    expect(date.textContent.trim()).toEqual('10/28/24, 11:00 AM');
    expect(user_id.textContent.trim()).toEqual('1');
    expect(username.textContent.trim()).toEqual('TestUser');
    expect(message.textContent.trim()).toEqual('Lorem Ipsum');
    expect(is_answered).toHaveClass('icon');

    fieldWrapper.click();
    setTimeout(() => {
      const inputUsername = fixture.debugElement.nativeElement.querySelector('#username');
      const inputUserId = fixture.debugElement.nativeElement.querySelector('#user_id');
      const inputUsermessage_id = fixture.debugElement.nativeElement.querySelector('#usermessage_id');

      expect(inputUsername.value).toEqual('TestUser');
      expect(inputUserId.value).toEqual('1');
      expect(inputUsermessage_id.value).toEqual('1');
      done(); // Call done to signal Jasmine that the test is complete
    }, 500);
  });
});
it('should have a usermessage and set userdata on click in the form', (done) => {
  mockUsermessageSelector.setResult([
    {
      id: 1,
      created_at: new Date('2024-10-28T10:00:00Z'),
      user_id: 1,
      username: "TestUser",
      message: "Lorem Ipsum",
      is_answered: false,
    }
  ]);
  mockStore.refreshState();
  fixture.detectChanges();

  fixture.whenStable().then(() => {
    const fieldWrapper = fixture.debugElement.nativeElement.querySelector('.fieldWrapper');
    const date = fixture.debugElement.nativeElement.querySelector('.date');
    const user_id = fixture.debugElement.nativeElement.querySelector('.user_id');
    const username = fixture.debugElement.nativeElement.querySelector('.username');
    const message = fixture.debugElement.nativeElement.querySelector('.message');
    const is_answered = fixture.debugElement.nativeElement.querySelector('#is_answered');

    expect(fieldWrapper).toBeTruthy();
    expect(date).toBeTruthy();
    expect(user_id).toBeTruthy();
    expect(username).toBeTruthy();
    expect(message).toBeTruthy();
    expect(is_answered).toBeTruthy();
    expect(date.textContent.trim()).toEqual('10/28/24, 11:00 AM');
    expect(user_id.textContent.trim()).toEqual('1');
    expect(username.textContent.trim()).toEqual('TestUser');
    expect(message.textContent.trim()).toEqual('Lorem Ipsum');
    expect(is_answered).toHaveClass('icon');

    fieldWrapper.click();
    setTimeout(() => {
      const inputUsername = fixture.debugElement.nativeElement.querySelector('#username');
      const inputUserId = fixture.debugElement.nativeElement.querySelector('#user_id');
      const inputUsermessage_id = fixture.debugElement.nativeElement.querySelector('#usermessage_id');

      expect(inputUsername.value).toEqual('TestUser');
      expect(inputUserId.value).toEqual('1');
      expect(inputUsermessage_id.value).toEqual('1');
      done(); // Call done to signal Jasmine that the test is complete
    }, 500);
  });
});
it('should have all Elements in the TopWrapper', () => { const greeting = fixture.debugElement.nativeElement.querySelector('.hallo'); expect(greeting).toBeTruthy(); expect(greeting.textContent.trim()).toEqual('RomanArmin'); const back = fixture.debugElement.nativeElement.querySelector('.back'); expect(back).toBeTruthy(); const locationSpy = spyOn(location, 'back'); back.click(); expect(locationSpy).toHaveBeenCalled(); });
