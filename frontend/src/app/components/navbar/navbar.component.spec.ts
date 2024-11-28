import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services_interceptors/auth.service';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, RouterLink } from '@angular/router';
import { routes } from '../../app.routes';
import { By } from '@angular/platform-browser';
import { NavlinksService } from '../../services_interceptors/navlinks.service';
import { Router } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: AuthService;
  let navlinksService: NavlinksService;
  let toastr: ToastrService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let router: Router;
  beforeEach(async () => {
    // const authMock = {
    //   user$: { id: 2, username: "TestMartin"},
    //   getUser: jasmine.createSpy('getUser').and.returnValue({ id: 2, username: "TestMartin"})
    // };
 
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        NgIconsModule,
        HttpClientTestingModule,
      ],
      providers:[
        // {provide: AuthService, useValue: authMock},
        provideIcons({}),
        provideHttpClientTesting(),
        provideRouter(routes),
        provideToastr(),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    authService = TestBed.inject(AuthService);
    navlinksService = TestBed.inject(NavlinksService);
    router = TestBed.inject(Router);
    toastr = TestBed.inject(ToastrService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it('should load and display navlinks', async () => {
    const mockedNavlinks = [
      { name: 'Über mich', url: '/uebermich' },
      { name: 'Blog', url: '/blog' },
      { name: 'Forum', url: '/forum' },
      { name: 'Bibliothek', url: '/bibliothek' },
      { name: 'Register', url: '/register' },
    ];

    // Simulate the GET request for navlinks
    const req = httpTestingController.expectOne('assets/navlinks.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockedNavlinks);

    // Wait for async updates
    await fixture.whenStable();
    fixture.detectChanges();

    const navItems = fixture.debugElement.queryAll(By.css('.navli'));
    expect(navItems.length).toBe(mockedNavlinks.length);
    navItems.forEach((nav, index) => {
      expect(nav.nativeElement.innerText.trim()).toEqual(mockedNavlinks[index].name);
    });
  });
});
