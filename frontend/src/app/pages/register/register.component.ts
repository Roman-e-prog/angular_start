import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, AsyncValidatorFn, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UsernameValidator } from '../../validators/uniqueUsername';
import { EmailValidator } from '../../validators/uniqueEmail';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NavbarComponent, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:any = FormGroup;
  usernameValidator: UsernameValidator;
  emailValidator: EmailValidator;

  constructor(private toastr: ToastrService, private httpClient: HttpClient, private router: Router) {
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
 } 
    passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
      const password = group.get('password')?.value;
      const passwordConfirm = group.get('passwordConfirm')?.value;
      return password === passwordConfirm ? null : { passwordsMismatch: true };
    }
  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;

      this.httpClient.post('http://localhost:5000/api/auth/register', newUser).subscribe({
        next: (response) => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.error(error.message);
        }
      });
    }
  }
}
