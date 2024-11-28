import { TestBed, ComponentFixture } from '@angular/core/testing';
import { SingleQuestionComponent } from './single-question.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../../services_interceptors/auth.service'; 
import { provideIcons, NgIconsModule } from '@ng-icons/core';
import { matThumbUpOutline, matThumbDownOutline, matCheckBoxOutline, matReplyOutline, matEditOutline } from '@ng-icons/material-icons/outline';
import { getForum } from '../../store/actions/forum.actions';
import { getAllAnswersToQuestion } from '../../store/actions/forumAnswers.actions';
import { selectForumData, selectForumError, selectForumLoading, selectForumMessage } from '../../store/selectors/forum.selectors'; 
import { selectAllAnswerToQuestion, selectForumAnswerError, selectForumAnswerLoading, selectForumAnswerMessage } from '../../store/selectors/forumAnswers.selector';
import { of } from 'rxjs';
import { routes } from '../../app.routes';
import { Forum } from '../../store/reducers/forum.reducer';
import { ForumAnswer } from '../../store/reducers/forumAnswer.reducer';
import { HttpClient } from '@angular/common/http';

describe('SingleQuestionComponent', () => {
  let component: SingleQuestionComponent;
  let fixture: ComponentFixture<SingleQuestionComponent>;
  let mockStore: MockStore;
  let toastr: ToastrService;
  let route: ActivatedRoute;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let httpClient: HttpClient;
  //I write an initialstate to have both observables
  const mockForumData: Forum = {
    id: 1,
    username: "RomanArmin",
    user_id: 1,
    is_admin: true,
    question_ressort: "HTML",
    question_theme: "Eine Testfrage",
    question: "Lorem Ipsum ad Dolores",
    likes: 0,
    dislikes: 0,
    solved: false,
    views: 0,
  };

  const mockAnswers: ForumAnswer[] = [
    {
      id: 1,
      username: "TesterMartin",
      user_id: 2,
      is_admin: false,
      question_id: 1,
      answer: "Lorem Ipsum",
      likes: 0,
      dislikes: 0,
      has_solved: false,
    },
  ];

  beforeEach(async () => {
    const authMock = {
      user$: { id: 1, username: "TesterMartin" },
      getUser: jasmine.createSpy('getUser').and.returnValue({ id: 1, username: "TesterMartin" })
    };
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);
    const httpSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    const activatedRoute = { snapshot: { paramMap: { get: jasmine.createSpy().and.returnValue('1') } } } as any;
    
    await TestBed.configureTestingModule({
      imports: [
        SingleQuestionComponent,
        NgIconsModule,
        HttpClientTestingModule,
      ],
      providers: [
        provideIcons({
          matThumbUpOutline,
          matThumbDownOutline,
          matCheckBoxOutline,
          matReplyOutline,
          matEditOutline,
        }),
        provideMockStore({
          selectors: [
            { selector: selectForumData, value: mockForumData },
            { selector: selectForumError, value: false },
            { selector: selectForumMessage, value: "Not found" },
            { selector: selectAllAnswerToQuestion, value: mockAnswers },
            { selector: selectForumAnswerError, value: false },
            { selector: selectForumAnswerMessage, value: "Not found" },
          ],
        }),
        // provideToastr(),
        { provide: AuthService, useValue: authMock },
        { provide: ToastrService, useValue: toastrSpy },
        { provide: HttpClient, useValue: httpSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
        // provideRouter(routes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleQuestionComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    authService = TestBed.inject(AuthService);
    toastr = TestBed.inject(ToastrService);
    spyOn(mockStore, 'dispatch');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should dispatch actions on ngOnInit and handle selectors correctly', () => {
    const id = parseInt(component.id!); // component.id is set via the mocked ActivatedRoute
    component.ngOnInit();

    // Ensure actions are dispatched
    expect(mockStore.dispatch).toHaveBeenCalledWith(getForum({ id }));
    expect(mockStore.dispatch).toHaveBeenCalledWith(getAllAnswersToQuestion({ id }));
  });

  it('should render the question and its details correctly', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const usernameEl = fixture.debugElement.nativeElement.querySelector('.username');
    const themeEl = fixture.debugElement.nativeElement.querySelector('.theme');
    const questionEl = fixture.debugElement.nativeElement.querySelector('.question');

    expect(usernameEl.textContent.trim()).toBe(mockForumData.username);
    expect(themeEl.textContent.trim()).toBe(mockForumData.question_theme);
    expect(questionEl.textContent.trim()).toBe(mockForumData.question);
  });
  it('should handle errors and show toastr messages', () => {
    // Simulate error state for forum
    mockStore.overrideSelector(selectForumError, true);
    mockStore.overrideSelector(selectForumMessage, "Error message");
    mockStore.overrideSelector(selectForumAnswerError, true);
    mockStore.overrideSelector(selectForumAnswerMessage, "Answer error message");
    fixture.detectChanges();

    component.ngOnInit();
    fixture.detectChanges();
  expect(toastr.error).toHaveBeenCalledWith('Error message');
  expect(toastr.error).toHaveBeenCalledWith('Answer error message')
  });

});
