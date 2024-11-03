import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services&interceptors/auth.service';
import { Blogmember } from '../../store/reducers/blogMember.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NavbarComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  constructor(private httpClient: HttpClient, private toastr: ToastrService, private authService: AuthService, private router: Router){}
ngOnInit(): void {
  const loggedInUser = this.authService.getUser();
   const user = loggedInUser;
  if(user){
    console.log(user)
    if(user.is_admin){
      this.router.navigate(['/dashboard'])
    }
    else{
      this.router.navigate(['/'])
    }
  }
}
  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: Validators.required,
      updateOn: 'blur'
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })
  onSubmit = ()=>{
    if (this.loginForm.valid){
      console.log(this.loginForm.value)
      const {username, email, password} = this.loginForm.value;
      this.authService.login(username!, email!, password!).subscribe(()=>({
        next: (response: Blogmember)=>{
          console.log(response)
        },
        error: (error:any)=>{
          console.log(error)
        }
      }))
    }
  }
}
