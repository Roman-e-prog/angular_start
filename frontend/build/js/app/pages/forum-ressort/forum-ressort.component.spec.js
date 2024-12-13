"use strict";var _testing=require("@angular/core/testing"),_forumRessort=require("./forum-ressort.component"),_core=require("@ng-icons/core"),_testing2=require("@ngrx/store/testing"),_ngxToastr=require("ngx-toastr"),_forum=require("../../store/selectors/forum.selectors"),_router=require("@angular/router"),_app=require("../../app.routes"),_testing3=require("@angular/common/http/testing"),_auth=require("../../services_interceptors/auth.service");describe("ForumRessortComponent",(()=>{let e,t,r,n,o,s,i,u,l,m,c;beforeEach((async()=>{const a={user$:{id:2,username:"TestMartin"},getUser:jasmine.createSpy("getUser").and.returnValue({id:2,username:"TestMartin"})};await _testing.TestBed.configureTestingModule({imports:[_forumRessort.ForumRessortComponent,_core.NgIconsModule,_testing3.HttpClientTestingModule],providers:[(0,_core.provideIcons)({}),(0,_testing2.provideMockStore)(),(0,_ngxToastr.provideToastr)(),(0,_router.provideRouter)(_app.routes),(0,_testing3.provideHttpClientTesting)(),{provide:_auth.AuthService,useValue:a}]}).compileComponents(),t=_testing.TestBed.createComponent(_forumRessort.ForumRessortComponent),e=t.componentInstance,r=_testing.TestBed.inject(_testing2.MockStore),n=r.overrideSelector(_forum.selectAllForumData,[]),o=r.overrideSelector(_forum.selectForumLoading,!1),s=r.overrideSelector(_forum.selectForumError,!1),i=r.overrideSelector(_forum.selectForumMessage,""),u=_testing.TestBed.inject(_ngxToastr.ToastrService),l=_testing.TestBed.inject(_router.ActivatedRoute),c=_testing.TestBed.inject(_auth.AuthService),m=_testing.TestBed.inject(_testing3.HttpTestingController),t.detectChanges()})),it("should create",(()=>{expect(e).toBeTruthy()})),it("should have all elements and values",(()=>{n.setResult([{id:1,username:"RomanArmin",user_id:1,is_admin:!0,question_ressort:"HTML",question_theme:"Eine Testfrage",question:"Lorem Ipsum ad Dolores",likes:0,dislikes:0,solved:!1,views:0}]),r.refreshState(),t.detectChanges(),t.whenStable().then((()=>{const e=t.debugElement.nativeElement.querySelector(".topicButton"),r=t.debugElement.nativeElement.querySelector(".username"),n=t.debugElement.nativeElement.querySelector(".theme"),o=t.debugElement.nativeElement.querySelector(".question"),s=t.debugElement.nativeElement.querySelector("#likes"),i=t.debugElement.nativeElement.querySelector("#dislikes"),u=t.debugElement.nativeElement.querySelector(".unsolved"),l=t.debugElement.nativeElement.querySelector("#views");expect(e).toBeTruthy(),expect(r.textContent.trim()).toEqual("RomanArmin"),expect(n.textContent.trim()).toEqual("Eine Testfrage"),expect(o.textContent.trim()).toEqual("Lorem Ipsum ad Dolores"),expect(s).toBeTruthy(),expect(i).toBeTruthy(),expect(u).toBeTruthy(),expect(l).toBeTruthy()}))})),it("test likes are displayed",(()=>{n.setResult([{id:1,username:"RomanArmin",user_id:1,is_admin:!0,question_ressort:"HTML",question_theme:"Eine Testfrage",question:"Lorem Ipsum ad Dolores",likes:10,dislikes:8,solved:!0,views:44}]),r.refreshState(),t.detectChanges(),t.whenStable().then((()=>{const e=t.debugElement.nativeElement.querySelector(".topicButton"),r=t.debugElement.nativeElement.querySelector(".username"),n=t.debugElement.nativeElement.querySelector(".theme"),o=t.debugElement.nativeElement.querySelector(".question"),s=t.debugElement.nativeElement.querySelector("#likes"),i=t.debugElement.nativeElement.querySelector("#dislikes"),u=t.debugElement.nativeElement.querySelector(".solved"),l=t.debugElement.nativeElement.querySelector("#views");expect(e).toBeTruthy(),expect(r.textContent.trim()).toEqual("RomanArmin"),expect(n.textContent.trim()).toEqual("Eine Testfrage"),expect(o.textContent.trim()).toEqual("Lorem Ipsum ad Dolores"),expect(s.textContent.trim()).toEqual("10"),expect(i.textContent.trim()).toEqual("8"),expect(u).toBeTruthy(),expect(l.textContent.trim()).toEqual("44")}))})),xit("test the topic error",(()=>{const e=t.debugElement.nativeElement.querySelector(".topicButton");expect(e).toBeTruthy(),e.click(),expect("Sie müssen sich einloggen, wenn Sie ein Thema eröffnen möchten").toBeTruthy()})),it("test the topic open",(()=>{const e=t.debugElement.nativeElement.querySelector(".topicButton");expect(e).toBeTruthy(),e.click(),t.detectChanges(),t.whenStable().then((()=>{const e=t.debugElement.nativeElement.querySelector(".questionModuleWrapper");expect(e).toBeTruthy()}))}))}));