import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, AsyncValidatorFn, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NavbarComponent, CommonModule, RouterLink, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private toastr: ToastrService, private httpClient: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      vorname: new FormControl('', Validators.required),
      nachname: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required, this.uniqueUsernameValidator()),
      email: new FormControl('', [Validators.required, Validators.email], this.uniqueEmailValidator()),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', Validators.required),
    }, { validators: this.passwordMatchValidator });
  }

  uniqueUsernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.httpClient.get(`${this.baseUrl}/uniqueUsername?username=${control.value}`).pipe(
        map((res: any) => {
          return res ? { usernameTaken: true } : null;
        })
      );
    };
  }

  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.httpClient.get(`${this.baseUrl}/uniqueEmail?email=${control.value}`).pipe(
        map((res: any) => {
          return res ? { emailTaken: true } : null;
        })
      );
    };
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
