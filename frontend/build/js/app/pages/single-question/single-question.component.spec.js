"use strict";var _testing=require("@angular/core/testing"),_singleQuestion=require("./single-question.component"),_testing2=require("@ngrx/store/testing"),_ngxToastr=require("ngx-toastr"),_router=require("@angular/router"),_testing3=require("@angular/common/http/testing"),_auth=require("../../services_interceptors/auth.service"),_core=require("@ng-icons/core"),_outline=require("@ng-icons/material-icons/outline"),_forum=require("../../store/actions/forum.actions"),_forumAnswers=require("../../store/actions/forumAnswers.actions"),_forum2=require("../../store/selectors/forum.selectors"),_forumAnswers2=require("../../store/selectors/forumAnswers.selector"),_http=require("@angular/common/http");describe("SingleQuestionComponent",(()=>{let e,t,r,s,o;const n={id:1,username:"RomanArmin",user_id:1,is_admin:!0,question_ressort:"HTML",question_theme:"Eine Testfrage",question:"Lorem Ipsum ad Dolores",likes:0,dislikes:0,solved:!1,views:0},i=[{id:1,username:"TesterMartin",user_id:2,is_admin:!1,question_id:1,answer:"Lorem Ipsum",likes:0,dislikes:0,has_solved:!1}];beforeEach((async()=>{const u={user$:{id:1,username:"TesterMartin"},getUser:jasmine.createSpy("getUser").and.returnValue({id:1,username:"TesterMartin"})},a=jasmine.createSpyObj("ToastrService",["error"]),l=jasmine.createSpyObj("HttpClient",["post","get"]),c={snapshot:{paramMap:{get:jasmine.createSpy().and.returnValue("1")}}};await _testing.TestBed.configureTestingModule({imports:[_singleQuestion.SingleQuestionComponent,_core.NgIconsModule,_testing3.HttpClientTestingModule],providers:[(0,_core.provideIcons)({matThumbUpOutline:_outline.matThumbUpOutline,matThumbDownOutline:_outline.matThumbDownOutline,matCheckBoxOutline:_outline.matCheckBoxOutline,matReplyOutline:_outline.matReplyOutline,matEditOutline:_outline.matEditOutline}),(0,_testing2.provideMockStore)({selectors:[{selector:_forum2.selectForumData,value:n},{selector:_forum2.selectForumError,value:!1},{selector:_forum2.selectForumMessage,value:"Not found"},{selector:_forumAnswers2.selectAllAnswerToQuestion,value:i},{selector:_forumAnswers2.selectForumAnswerError,value:!1},{selector:_forumAnswers2.selectForumAnswerMessage,value:"Not found"}]}),{provide:_auth.AuthService,useValue:u},{provide:_ngxToastr.ToastrService,useValue:a},{provide:_http.HttpClient,useValue:l},{provide:_router.ActivatedRoute,useValue:c}]}).compileComponents(),t=_testing.TestBed.createComponent(_singleQuestion.SingleQuestionComponent),e=t.componentInstance,r=_testing.TestBed.inject(_testing2.MockStore),o=_testing.TestBed.inject(_auth.AuthService),s=_testing.TestBed.inject(_ngxToastr.ToastrService),spyOn(r,"dispatch"),t.detectChanges()})),it("should create",(()=>{expect(e).toBeTruthy()})),it("should dispatch actions on ngOnInit and handle selectors correctly",(()=>{const t=parseInt(e.id);e.ngOnInit(),expect(r.dispatch).toHaveBeenCalledWith((0,_forum.getForum)({id:t})),expect(r.dispatch).toHaveBeenCalledWith((0,_forumAnswers.getAllAnswersToQuestion)({id:t}))})),it("should render the question and its details correctly",(async()=>{t.detectChanges(),await t.whenStable();const e=t.debugElement.nativeElement.querySelector(".username"),r=t.debugElement.nativeElement.querySelector(".theme"),s=t.debugElement.nativeElement.querySelector(".question");expect(e.textContent.trim()).toBe(n.username),expect(r.textContent.trim()).toBe(n.question_theme),expect(s.textContent.trim()).toBe(n.question)})),it("should handle errors and show toastr messages",(()=>{r.overrideSelector(_forum2.selectForumError,!0),r.overrideSelector(_forum2.selectForumMessage,"Error message"),r.overrideSelector(_forumAnswers2.selectForumAnswerError,!0),r.overrideSelector(_forumAnswers2.selectForumAnswerMessage,"Answer error message"),t.detectChanges(),e.ngOnInit(),t.detectChanges(),expect(s.error).toHaveBeenCalledWith("Error message"),expect(s.error).toHaveBeenCalledWith("Answer error message")}))}));