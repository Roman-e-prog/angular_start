import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { HttpClient } from '@angular/common/http';
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
      ],
      providers:[
        provideIcons({
          matMenuOutline,
        }),
        provideHttpClientTesting(),
        provideRouter(routes),
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
    httpClient = TestBed.inject(HttpClient)
    router = TestBed.inject(Router);
    usernameValidator = TestBed.inject(UsernameValidator);
    emailValidator = TestBed.inject(EmailValidator);
    fixture.detectChanges();
  });
  afterEach(() => {
    httpTestingController.verify(); 
  });
  
  it('should create', () => {
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

  fit('should handle form submission successfully', async () => {
    // Mock the HTTP call for navlinks.json
    const req = httpTestingController.expectOne('assets/navlinks.json');
    req.flush([]); // Mocked response
    fixture.detectChanges();
    await fixture.whenStable();
     // Spy on the group-level validator
     const passwordMatchSpy = spyOn(component, 'passwordMatchValidator').and.callThrough();
     //set the asyncValidators
     const usernameControl = component.registerForm.controls['username'];
     usernameControl.setAsyncValidators(mockedUsernameValidator.uniqueUsernameValidator());
    const emailControl = component.registerForm.controls['email'];
    emailControl.setAsyncValidators(mockedEmailValidator.uniqueEmailValidator());
    component.ngOnInit();
    fixture.detectChanges();
    await fixture.whenStable();
  
    // Fill the form with valid values
    component.registerForm.setValue({
      vorname: 'John',
      nachname: 'Doe',
      username: 'validUsername',
      email: 'valid@example.com',
      password: 'password123',
      passwordConfirm: 'password123',
    });
    fixture.detectChanges();
      // Mock HTTP requests for async validators
      const usernameReq = httpTestingController.expectOne('http://localhost:5000/api/auth/uniqueUsername');
      usernameReq.flush(null); // Mock successful response (no error)
       fixture.detectChanges();
       await fixture.whenStable();
      const emailReq = httpTestingController.expectOne('http://localhost:5000/api/auth/uniqueEmail');
      emailReq.flush(null); // Mock successful response (no error)
    // Verify the validators are triggered
    expect(passwordMatchSpy).toHaveBeenCalled();
     // Trigger validation and wait for async validators
     expect(mockedUsernameValidator.uniqueUsernameValidator).toHaveBeenCalled();
     expect(mockedEmailValidator.uniqueEmailValidator).toHaveBeenCalled();
  
    fixture.detectChanges();
    await fixture.whenStable();
    // Verify form input values
    const vorname = fixture.debugElement.nativeElement.querySelector('#vorname');
    const nachname = fixture.debugElement.nativeElement.querySelector('#nachname');
    const username = fixture.debugElement.nativeElement.querySelector('#username');
    const email = fixture.debugElement.nativeElement.querySelector('#email');
    const password = fixture.debugElement.nativeElement.querySelector('#password');
    const passwordConfirm = fixture.debugElement.nativeElement.querySelector('#passwordConfirm');
  
    expect(vorname.value).toEqual('John');
    expect(nachname.value).toEqual('Doe');
    expect(username.value).toEqual('validUsername');
    expect(email.value).toEqual('valid@example.com');
    expect(password.value).toEqual('password123');
    expect(passwordConfirm.value).toEqual('password123');
   
     fixture.detectChanges();
      await fixture.whenStable();
    //tip updateValueAndValidity
    await component.registerForm.controls['username'].updateValueAndValidity();
    await component.registerForm.controls['email'].updateValueAndValidity();
    await component.registerForm.updateValueAndValidity();
    // Verify the async validators
    expect(component.registerForm.controls['username'].errors).toBeNull();
    expect(component.registerForm.controls['email'].errors).toBeNull();
    expect(component.registerForm.errors).toBeNull(); // No group-level errors
    //flush microtasts
    
   

    await fixture.whenStable()
     //logging
    console.log('Form Valid After Validation:', component.registerForm.valid);
    console.log('Form Errors:', component.registerForm.errors);
    console.log('Username Control Errors:', component.registerForm.controls['username'].errors);
    console.log('Email Control Errors:', component.registerForm.controls['email'].errors)
    console.log('Form Status:', component.registerForm.status);
    console.log('Username Status:', component.registerForm.controls['username'].status);
    console.log('Email Status:', component.registerForm.controls['email'].status);

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.registerForm.valid).toBeTrue();
  
    // Spy on navigation
    const routerSpy = spyOn(router, 'navigate');
  
    // Simulate button click for form submission
    const mainBtn = fixture.debugElement.nativeElement.querySelector('.mainBtn');
    expect(mainBtn).toBeTruthy();
    mainBtn.click();
  
    // Further HTTP testing (uncomment if needed)
    // const reqRegister = httpTestingController.expectOne('http://localhost:5000/api/auth/register');
    // expect(reqRegister.request.method).toBe('POST');
    // reqRegister.flush({ success: true });
  
    // Verify navigation call
    // expect(routerSpy).toHaveBeenCalledWith(['/login']);
  });
  
  
  
  
  xit('should show error on failed submission', async () => {
     const req = httpTestingController.expectOne('assets/navlinks.json');
    req.flush([]); // Mocked response
    await fixture.whenStable();
    // Fill valid form data
    component.registerForm.setValue({
      vorname: 'John',
      nachname: 'Doe',
      username: 'validUsername',
      email: 'valid@example.com',
      password: 'password123',
      passwordConfirm: 'password123',
    });
  
    component.onSubmit();
    const reqUserFail = httpTestingController.expectOne('http://localhost:5000/api/auth/register'); // 
    reqUserFail.flush({success: false})
    expect(toastrSpy.error).toHaveBeenCalledWith('Registration failed');
  });
    
  
});
