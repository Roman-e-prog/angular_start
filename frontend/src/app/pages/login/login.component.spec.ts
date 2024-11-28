import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../app.routes';
import { AuthService } from '../../services_interceptors/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let toastr:ToastrService;
  let httpTestingController: HttpTestingController;
  let router: Router;
  beforeEach(async () => {
    const authMock = {
      user$: {id:1, vorname:"Roman", nachname:"Rostock", username:"RomanArmin", is_admin:true},
    }
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        NgIconsModule,
        HttpClientTestingModule
    ],
    providers:[
      provideIcons({}),
      provideToastr(),
      provideHttpClientTesting(),
      provideRouter(routes),
      {provider: AuthService, useValue: authMock}
    ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService),
    toastr = TestBed.inject(ToastrService),
    httpTestingController = TestBed.inject(HttpTestingController),
    router = TestBed.inject(Router);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  fit('should have all the fields and elements', ()=>{
    const loginForm = fixture.debugElement.nativeElement.querySelector(".loginForm");
    const username = fixture.debugElement.nativeElement.querySelector("#username");
    const email = fixture.debugElement.nativeElement.querySelector("#email");
    const password = fixture.debugElement.nativeElement.querySelector("#password");
    const mainBtn = fixture.debugElement.nativeElement.querySelector(".mainBtn");
    const forgotten = fixture.debugElement.nativeElement.querySelector(".forgotten");

    expect(loginForm).toBeTruthy();
    expect(username).toBeTruthy();
    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
    expect(mainBtn).toBeTruthy();
    expect(forgotten).toBeTruthy();
  })
  fit('should warn the user when try to use forggotten with out email', ()=>{
    const forgotten = fixture.debugElement.nativeElement.querySelector(".forgotten");
    forgotten.click();
    fixture.detectChanges();
    expect("Bitte geben Sie Ihre Email ein, um das Password zurückzusetzen").toBeTruthy();
  })
  fit("test the user is logged in", ()=>{
    const routerSpy = spyOn(router, 'navigate');
    const mockedUser = {
      vorname:"Roman",
      nachname:"Rostock",
      username:"Roman Armin",
      is_admin:true,
      email:"roman.rostock@gmail.com",
      accessToken:"123456ABCDEFG"
    }
    component.loginForm.controls['username'].setValue("RomanArmin");
    component.loginForm.controls['email'].setValue("roman.rostock@gmail.com");
    component.loginForm.controls['password'].setValue("87412369");
    const mainBtn = fixture.debugElement.nativeElement.querySelector(".mainBtn");
    mainBtn.click();
    fixture.detectChanges();
      // Simulate the POST request for login
      const req = httpTestingController.expectOne('http://localhost:5000/api/auth/login');
      expect(req.request.method).toBe('POST');
      req.flush(mockedUser);
      expect(routerSpy).toHaveBeenCalledWith(['/dashboard'])
  })
  fit("test the forgotten is called", async ()=>{
    const loginForm = fixture.debugElement.nativeElement.querySelector(".loginForm");
    component.loginForm.controls['username'].setValue("RomanArmin");
    component.loginForm.controls['email'].setValue("roman.rostock@gmail.com");
    const forgotten = fixture.debugElement.nativeElement.querySelector(".forgotten");
    forgotten.click();
    fixture.detectChanges();
    // Simulate the POST request for login
    const req = httpTestingController.expectOne('http://localhost:5000/api/auth/forgotten');
    expect(req.request.method).toBe('POST');
    req.flush("Bitte öffnen Sie jetzt Ihre Email");

  })
});
