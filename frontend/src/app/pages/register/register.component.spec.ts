import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { routes } from '../../app.routes';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { By } from '@angular/platform-browser';
import { UsernameValidator } from '../../validators/uniqueUsername';
import { matMenuOutline } from '@ng-icons/material-icons/outline';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { EmailValidator } from '../../validators/uniqueEmail';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';


describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpClient: HttpClient;
  let toastr: ToastrService;
  let activatedRoute:ActivatedRoute;
  let toastrSpy: jasmine.SpyObj<ToastrService>;
  let httpTestingController: HttpTestingController;
  let router: Router;
  let usernameValidator: UsernameValidator;
  let mockedUsernameValidator: any;
  let emailValidator: EmailValidator;
  let mockedEmailValidator:any;
  beforeEach(async () => {
      toastrSpy = jasmine.createSpyObj('ToastrService', ['error']);
      mockedUsernameValidator = {
        uniqueUsernameValidator: jasmine.createSpy('uniqueUsernameValidator').and.callFake(() => {
          return (control: AbstractControl) => {
            const value = control.value;
            if (value === 'takenUsername') {
              return of({ usernameTaken: true }); // Simulate a taken username
            }
            return of(null); // Simulate a free username
          };
        })
      };
      mockedEmailValidator = {
        uniqueEmailValidator: jasmine.createSpy('uniqueEmailValidator').and.callFake(() => {
          return (control: AbstractControl) => {
            const value = control.value;
            if (value === 'takenemail@test.de') {
              return of({ emailTaken: true }); // Simulate a taken email
            }
            return of(null); // Simulate a free email
          };
        })
      };
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        NgIconsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule, 
      ],
      providers:[
        provideIcons({
          matMenuOutline,
        }),
        provideHttpClientTesting(),
        provideRouter(routes),
        provideAnimations(),
        {provide: ToastrService, useValue: toastrSpy},
        {provide: UsernameValidator, useValue: mockedUsernameValidator},
        {provide: EmailValidator, useValue: mockedEmailValidator},
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    toastr = TestBed.inject(ToastrService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    usernameValidator = TestBed.inject(UsernameValidator);
    emailValidator = TestBed.inject(EmailValidator);
    fixture.detectChanges();
  });
  afterEach(() => {
    httpTestingController.verify(); 
  });
  
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render all elements', async ()=>{
      // Wait for Navbar's HTTP request to complete
    const req = httpTestingController.expectOne('assets/navlinks.json');
    req.flush([]); // Mocked response
    await fixture.whenStable();
    const registerTitle = fixture.debugElement.nativeElement.querySelector('.registerTitle');
    const vorname = fixture.debugElement.nativeElement.querySelector('#vorname');
    const nachname = fixture.debugElement.nativeElement.querySelector('#nachname');
    const username = fixture.debugElement.nativeElement.querySelector('#username');
    const email = fixture.debugElement.nativeElement.querySelector('#email');
    const password = fixture.debugElement.nativeElement.querySelector('#password');
    const passwordConfirm = fixture.debugElement.nativeElement.querySelector('#passwordConfirm');
    const mainBtn = fixture.debugElement.nativeElement.querySelector('.mainBtn');
    const loginLink = fixture.debugElement.nativeElement.querySelector('.loginLink');

    expect(registerTitle).toBeTruthy();
    expect(vorname).toBeTruthy();
    expect(nachname).toBeTruthy();
    expect(username).toBeTruthy();
    expect(email).toBeTruthy();
    expect(password).toBeTruthy();
    expect(passwordConfirm).toBeTruthy();
    expect(mainBtn).toBeTruthy();
    expect(loginLink).toBeTruthy();
  });
  it('should show validation errors for empty required fields', async () => {
    const req = httpTestingController.expectOne('assets/navlinks.json');
    req.flush([]); // Mocked response
    await fixture.whenStable();
    const form = component.registerForm;
  
    // Simulate user touching fields without filling them
    form.controls['vorname'].markAsTouched();
    form.controls['nachname'].markAsTouched();
    form.controls['username'].markAsTouched();
    form.controls['email'].markAsTouched();
    form.controls['password'].markAsTouched();
    form.controls['passwordConfirm'].markAsTouched();
  
    fixture.detectChanges();
  
    // Check error messages
    const errors = fixture.debugElement.nativeElement.querySelectorAll('.error');
    expect(errors.length).toBeGreaterThan(0);
  });
  
  it('should show error if username is already taken', () => {
    const req = httpTestingController.expectOne('assets/navlinks.json');
    req.flush([]); // Mocked response
    const usernameControl = component.registerForm.controls['username'];
    usernameControl.setAsyncValidators(mockedUsernameValidator.uniqueUsernameValidator());
    usernameControl.setValue('takenUsername');
    fixture.detectChanges();
    expect(mockedUsernameValidator.uniqueUsernameValidator).toHaveBeenCalled();

        fixture.detectChanges();
        expect(usernameControl.errors).toEqual({ usernameTaken: true })
  });
  
  it('should show error if email is already taken', async () => {
    const req = httpTestingController.expectOne('assets/navlinks.json');
    req.flush([]); // Mocked response
    await fixture.whenStable();
    const emailControl = component.registerForm.controls['email'];
    emailControl.setAsyncValidators(mockedEmailValidator.uniqueEmailValidator());
    emailControl.setValue('takenemail@test.de');
    fixture.detectChanges();
    expect(mockedEmailValidator.uniqueEmailValidator).toHaveBeenCalled();

    fixture.detectChanges();
    expect(emailControl.errors).toEqual({ emailTaken: true });
  });
  
  it('should show error if passwords do not match', async () => {
    const req = httpTestingController.expectOne('assets/navlinks.json');
    req.flush([]); // Mocked response
    await fixture.whenStable();
    component.registerForm.controls['password'].setValue('password123');
    component.registerForm.controls['passwordConfirm'].setValue('differentPassword');
  
    fixture.detectChanges();
  
    expect(component.registerForm.errors).toEqual({ passwordsMismatch: true });
  });

  it('should handle form submission successfully and trigger validators', async () => {
    const reqNav = httpTestingController.expectOne('assets/navlinks.json');
    reqNav.flush([]); // Mocked response
    await fixture.whenStable();
    const mockedUser = {
      vorname: "John",
      nachname: "Doe",
      username:"validUsername",
      email:"valid@example.com",
    }
    // Spy on navigation
    const routerSpy = spyOn(router, 'navigate');
  
    // Attach mocked async validators
    const usernameControl = component.registerForm.controls['username'];
    const emailControl = component.registerForm.controls['email'];
  
    usernameControl.setAsyncValidators(mockedUsernameValidator.uniqueUsernameValidator());
    emailControl.setAsyncValidators(mockedEmailValidator.uniqueEmailValidator());
  
    // Update values to trigger validation
    usernameControl.setValue('validUsername');
    emailControl.setValue('valid@example.com');
  
    usernameControl.updateValueAndValidity();
    emailControl.updateValueAndValidity();
  
    // Wait for async validators to complete
    await fixture.whenStable();
    fixture.detectChanges();
  
    // Verify async validators were triggered
    expect(mockedUsernameValidator.uniqueUsernameValidator).toHaveBeenCalled();
    expect(mockedEmailValidator.uniqueEmailValidator).toHaveBeenCalled();
  
    // Check validator results
    expect(usernameControl.errors).toBeNull();
    expect(emailControl.errors).toBeNull();
    expect(component.registerForm.valid).toBeFalse(); // Still invalid as other controls are empty
  
    // Fill remaining form fields
    component.registerForm.controls['vorname'].setValue('John');
    component.registerForm.controls['nachname'].setValue('Doe');
    component.registerForm.controls['password'].setValue('password123');
    component.registerForm.controls['passwordConfirm'].setValue('password123');
  
    component.registerForm.updateValueAndValidity();
    await fixture.whenStable();
    fixture.detectChanges();
  
    // Ensure form is now valid
    expect(component.registerForm.valid).toBeTrue();
  
    // Simulate form submission
    const submitButton = fixture.debugElement.nativeElement.querySelector('.mainBtn');
    expect(submitButton).toBeTruthy();
    submitButton.click();
    fixture.detectChanges();
   
    const req = httpTestingController.expectOne('http://localhost:5000/api/auth/register');
    expect(req.request.method).toBe('POST');
    req.flush(mockedUser);
    expect(routerSpy).toHaveBeenCalledWith(['/login'])
  });
});
