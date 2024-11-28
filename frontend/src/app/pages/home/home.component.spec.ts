import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { By } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services_interceptors/auth.service';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let authService: AuthService;
  let toastr: ToastrService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        NavbarComponent, 
        NgIconsModule,
        HttpClientModule,
      ],
      providers:[
        provideIcons({}),
        provideHttpClient(withFetch(), withInterceptorsFromDi()),
        provideToastr(),
        provideRouter(routes)
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    authService = TestBed.inject(AuthService);
    toastr = TestBed.inject(ToastrService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have all components', ()=>{
    const picture = fixture.debugElement.nativeElement.querySelector('.picture');
    const logoImage = fixture.debugElement.nativeElement.querySelector('#logoImage');
    const mainImage = fixture.debugElement.nativeElement.querySelector('#mainImage');
    const title = fixture.debugElement.nativeElement.querySelector('.title');
    const navbar = fixture.debugElement.query(By.css('.navbar'));

    expect(picture).toBeTruthy();
    expect(logoImage).toBeTruthy();
    expect(mainImage).toBeTruthy();
    expect(title).toBeTruthy();
    expect(navbar).toBeTruthy();
    expect(logoImage.src).toContain('assets/img/roman.jpg')
    expect(mainImage.src).toContain('assets/img/programming.jpeg')
  })
});
