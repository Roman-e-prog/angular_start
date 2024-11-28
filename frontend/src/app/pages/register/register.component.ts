import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsernameValidator } from '../../validators/uniqueUsername';
import { EmailValidator } from '../../validators/uniqueEmail';
import { ResizeObserverService } from '../../services_interceptors/resize.service';
import { MobileNavbarComponent } from '../../components/mobile-navbar/mobile-navbar.component';
import { RegisterService } from '../../services_interceptors/register.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NavbarComponent, CommonModule, RouterLink, HttpClientModule, MobileNavbarComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm:any = FormGroup;
  usernameValidator: UsernameValidator;
  emailValidator: EmailValidator;
  windowWidth!: number;
  private resizeSubscription!: Subscription;
  constructor(
                private toastr: ToastrService, 
                private httpClient: HttpClient, 
                private router: Router,
                private registerService: RegisterService,
                private resizeObserverService: ResizeObserverService,
                private cd: ChangeDetectorRef,
                @Inject(PLATFORM_ID) private platFormId: Object,
              ) {
    this.usernameValidator = new UsernameValidator(this.httpClient);
    this.emailValidator = new EmailValidator(this.httpClient);
  }
 ngOnInit(): void {
  this.registerForm = new FormGroup({
    vorname: new FormControl('', Validators.required),
    nachname: new FormControl('', Validators.required),
    username: new FormControl(null,{
      validators: [Validators.required],
      asyncValidators: [this.usernameValidator.uniqueUsernameValidator()],
      updateOn: 'blur'
    }),
    email: new FormControl(null, {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.emailValidator.uniqueEmailValidator()],
      updateOn: 'blur'
    }),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', Validators.required),
  }, { validators: this.passwordMatchValidator, updateOn:'blur' });
  
  if(isPlatformBrowser(this.platFormId)){
    this.resizeSubscription = this.resizeObserverService.resize$.subscribe((width)=>{
      this.windowWidth = width;
      this.cd.detectChanges();
    })
  }
 } 
    passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
      const password = group.get('password')?.value;
      const passwordConfirm = group.get('passwordConfirm')?.value;
      return password === passwordConfirm ? null : { passwordsMismatch: true };
    }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const {vorname, nachname, username, email, password} = this.registerForm.value;
        console.log(vorname, nachname, username, email, password, 'after test')
        console.log(this.registerForm.valid);
      this.registerService.registerUser(vorname, nachname, username, email, password).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.error(error.message);
        }
      });
    }
  }
  ngOnDestroy(): void {
    if(this.resizeSubscription){
      this.resizeSubscription.unsubscribe()
    }
  }
}
