import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumRessortComponent } from './forum-ressort.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { Forum, ForumState } from '../../store/reducers/forum.reducer';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { selectAllForumData, selectForumError, selectForumLoading, selectForumMessage } from '../../store/selectors/forum.selectors';
import { ActivatedRoute, provideRouter, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../../services_interceptors/auth.service';

describe('ForumRessortComponent', () => {
  let component: ForumRessortComponent;
  let fixture: ComponentFixture<ForumRessortComponent>;
  let mockStore: MockStore;
  let mockedForumSelector: MemoizedSelector<ForumState, Forum[]>
  let mockedForumLoadingSelector: MemoizedSelector<ForumState, boolean>
  let mockedForumErrorSelector: MemoizedSelector<ForumState, boolean>
  let mockedForumMessageSelector: MemoizedSelector<ForumState, string>
  let toastr: ToastrService;
  let route: ActivatedRoute;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  beforeEach(async () => {
    const authMock = {
      user$:{id: 2, username:"TestMartin"},
      getUser: jasmine.createSpy('getUser').and.returnValue({id: 2, username:"TestMartin"}),
    }
    await TestBed.configureTestingModule({
      imports: [
        ForumRessortComponent,
        NgIconsModule,
        HttpClientTestingModule,
      ],
      providers:[
        provideIcons({}),
        provideMockStore(),
        provideToastr(),
        provideRouter(routes),
        provideHttpClientTesting(),
        {provide: AuthService, useValue: authMock}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumRessortComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockedForumSelector = mockStore.overrideSelector(selectAllForumData,[]);
    mockedForumLoadingSelector = mockStore.overrideSelector(selectForumLoading, false);
    mockedForumErrorSelector = mockStore.overrideSelector(selectForumError, false);
    mockedForumMessageSelector = mockStore.overrideSelector(selectForumMessage, "")
    toastr = TestBed.inject(ToastrService);
    route = TestBed.inject(ActivatedRoute);
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have all elements and values', ()=>{
    mockedForumSelector.setResult([
      {
        id:1,
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
      }
    ])
    mockStore.refreshState();
    fixture.detectChanges();

    fixture.whenStable().then(()=>{
      const topicButton = fixture.debugElement.nativeElement.querySelector('.topicButton');
      const username = fixture.debugElement.nativeElement.querySelector('.username');
      const theme = fixture.debugElement.nativeElement.querySelector('.theme');
      const question = fixture.debugElement.nativeElement.querySelector('.question');
      const likes = fixture.debugElement.nativeElement.querySelector('#likes');
      const dislikes = fixture.debugElement.nativeElement.querySelector('#dislikes');
      const unsolved = fixture.debugElement.nativeElement.querySelector('.unsolved');
      const views = fixture.debugElement.nativeElement.querySelector('#views');
      expect(topicButton).toBeTruthy();
      expect(username.textContent.trim()).toEqual("RomanArmin");
      expect(theme.textContent.trim()).toEqual("Eine Testfrage");
      expect(question.textContent.trim()).toEqual("Lorem Ipsum ad Dolores");
      expect(likes).toBeTruthy();
      expect(dislikes).toBeTruthy();
      expect(unsolved).toBeTruthy();
      expect(views).toBeTruthy();
    })
  })
  //end of test
  it("test likes are displayed", ()=>{
    mockedForumSelector.setResult([
      {
        id:1,
        username: "RomanArmin",
        user_id: 1,
        is_admin: true,
        question_ressort: "HTML",
        question_theme: "Eine Testfrage",
        question: "Lorem Ipsum ad Dolores",
        likes: 10,
        dislikes: 8,
        solved: true,
        views: 44,
      }
    ])
    mockStore.refreshState();
    fixture.detectChanges();

    fixture.whenStable().then(()=>{
      const topicButton = fixture.debugElement.nativeElement.querySelector('.topicButton');
      const username = fixture.debugElement.nativeElement.querySelector('.username');
      const theme = fixture.debugElement.nativeElement.querySelector('.theme');
      const question = fixture.debugElement.nativeElement.querySelector('.question');
      const likes = fixture.debugElement.nativeElement.querySelector('#likes');
      const dislikes = fixture.debugElement.nativeElement.querySelector('#dislikes');
      const solved = fixture.debugElement.nativeElement.querySelector('.solved');
      const views = fixture.debugElement.nativeElement.querySelector('#views');
      expect(topicButton).toBeTruthy();
      expect(username.textContent.trim()).toEqual("RomanArmin");
      expect(theme.textContent.trim()).toEqual("Eine Testfrage");
      expect(question.textContent.trim()).toEqual("Lorem Ipsum ad Dolores");
      expect(likes.textContent.trim()).toEqual("10");
      expect(dislikes.textContent.trim()).toEqual("8");
      expect(solved).toBeTruthy();
      expect(views.textContent.trim()).toEqual("44");
    })
  })
  xit("test the topic error", ()=>{
    const topicButton = fixture.debugElement.nativeElement.querySelector('.topicButton');
    expect(topicButton).toBeTruthy();
    topicButton.click();
    expect("Sie müssen sich einloggen, wenn Sie ein Thema eröffnen möchten").toBeTruthy()
  })
  fit("test the topic open", ()=>{
    const topicButton = fixture.debugElement.nativeElement.querySelector('.topicButton');
    expect(topicButton).toBeTruthy();
    topicButton.click();
    fixture.detectChanges();
    fixture.whenStable().then(()=>{
      const questionModuleWrapper = fixture.debugElement.nativeElement.querySelector('.questionModuleWrapper');
      expect(questionModuleWrapper).toBeTruthy();
    })
  })
});
