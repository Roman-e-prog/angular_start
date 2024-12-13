import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumComponent } from './forum.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { ForumTheme, ForumThemeState } from '../../store/reducers/forumTheme.reducer';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services_interceptors/auth.service';
import { ForumLinksService } from '../../services_interceptors/forumlinks.service';
import { selectAllForumThemeData } from '../../store/selectors/forumTheme.selectors';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, provideRouter, RouterModule } from '@angular/router';
import { routes } from '../../app.routes';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { By } from '@angular/platform-browser';
import { NavlinksService } from '../../services_interceptors/navlinks.service';
import { map } from 'rxjs';
describe('ForumComponent', () => {
  let component: ForumComponent;
  let fixture: ComponentFixture<ForumComponent>;
  let mockStore: MockStore;
  let mockedForumThemeSelector: MemoizedSelector<ForumThemeState, ForumTheme[]>;
  let toastr: ToastrService;
  let authService: AuthService;
  let forumLinksService: ForumLinksService;
  let router: Router;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    // const authMock = {
    //   user$: { id: 1, username: "RomanArmin", is_admin: true },
    //   getUser: jasmine.createSpy('getUser').and.returnValue({ id: 1, username: "RomanArmin", is_admin: true })
    // }
    await TestBed.configureTestingModule({
      imports: [
        ForumComponent,
        NgIconsModule,
        HttpClientTestingModule,
      ],
      providers:[
        // {provide: AuthService, useValue:authMock},
        provideIcons({}),
        provideMockStore(),
        provideToastr(),
        provideHttpClientTesting(),
        provideRouter(routes),
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForumComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockedForumThemeSelector = mockStore.overrideSelector(selectAllForumThemeData,[]);
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    toastr = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    forumLinksService = TestBed.inject(ForumLinksService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  xit('should have all elements', ()=>{
    const mockedForumlinks = [
      {name:"HTML"},
      {name:"CSS"},
      {name:"JavaScript"},
    ];
    mockedForumThemeSelector.setResult([
      {
        id:1,
        ressort: 'HTML',
        title:'Lorem Ipsum',
        content:'Ein Testbeitrag'
      },
      {
        id:2,
        ressort: 'CSS',
        title:'Lorem Ipsum',
        content:'Ein Testbeitrag'
      },
      {
        id:3,
        ressort: 'JavaScript',
        title:'Lorem Ipsum',
        content:'Ein Testbeitrag'
      },
    ])
    mockStore.refreshState();
    fixture.detectChanges();
      
    const reqForum = httpTestingController.match('assets/forumlinks.json')
    reqForum.forEach(req => { expect(req.request.method).toEqual('GET'); 
      req.flush(mockedForumlinks);
    })
    
    fixture.whenStable().then(()=>{
    const forumLinks = fixture.debugElement.nativeElement.querySelectorAll('.forumLinks');
    const forumLi = fixture.debugElement.nativeElement.querySelectorAll('.forumLi');
    const forumAnchor = fixture.debugElement.nativeElement.querySelectorAll('.forumAnchor');
    const forumTitle = fixture.debugElement.nativeElement.querySelectorAll('.forumTitle');
    const forumRessort = fixture.debugElement.nativeElement.querySelectorAll('.forumRessort');
    const content = fixture.debugElement.nativeElement.querySelectorAll('.content');
    const accountAnchor = fixture.debugElement.nativeElement.querySelector('#accountAnchor')
    expect(forumLinks).toBeTruthy();
    expect(forumLi).toBeTruthy();
    expect(forumAnchor).toBeTruthy();
    expect(forumTitle).toBeTruthy();
    expect(forumRessort).toBeTruthy();
    expect(content).toBeTruthy();
    expect(accountAnchor).toBeTruthy();

    expect(forumLi.length).toBe(mockedForumlinks.length);
    expect(forumAnchor.length).toBe(mockedForumlinks.length);
    expect(forumTitle.length).toBe(3);
    expect(forumRessort.length).toBe(3);
    expect(content.length).toBe(3);
    // expect(accountAnchor.textContent.trim()).toEqual('RomanArmin')
    forumAnchor.forEach((anchor:any, index:number)=>{
      expect(anchor.textContent.trim()).toEqual(mockedForumlinks[index].name)
    })
    const routerSpy = spyOn(router, 'navigate');
    
      forumAnchor.forEach((anchor:any, index:number)=>{
      anchor.click();
      fixture.detectChanges();
        expect(routerSpy).toHaveBeenCalledWith([mockedForumlinks[index].name])
        })
      })
  })
});
