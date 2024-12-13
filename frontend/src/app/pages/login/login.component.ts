import { Component, OnInit, Inject, PLATFORM_ID, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services_interceptors/auth.service';
import { Blogmember } from '../../store/reducers/blogMember.reducer';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { ResizeObserverService } from '../../services_interceptors/resize.service';
import { Subscription } from 'rxjs';
import { MobileNavbarComponent } from '../../components/mobile-navbar/mobile-navbar.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, NavbarComponent, CommonModule, MobileNavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{
  constructor(
              private httpClient: HttpClient, 
              private toastr: ToastrService, 
              private authService: AuthService, 
              private router: Router,
              private resizeObserverService: ResizeObserverService,
              private cd: ChangeDetectorRef,
              @Inject(PLATFORM_ID) private platFormId: Object,
            ){}
  windowWidth!:number;
  private resizeSubscription!: Subscription;
ngOnInit(): void {
   this.authService.user.subscribe(user=>{
    if(user){
      if(user.is_admin){
        this.router.navigate(['/dashboard'])
      }
      else{
        this.router.navigate(['/'])
      }
    } 
   })
   if(isPlatformBrowser(this.platFormId)){
    this.resizeSubscription = this.resizeObserverService.resize$.subscribe((width)=>{
      this.windowWidth = width;
      this.cd.detectChanges();
    })
  }
}
ngOnDestroy(): void {
  if(this.resizeSubscription){
    this.resizeSubscription.unsubscribe();
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
  passwordForgotten = ()=>{
    const email = this.loginForm.value.email;
    if(email === ""){
      this.toastr.error('Bitte geben Sie Ihre Email ein, um das Password zurückzusetzen')
    } 
    else{
      this.httpClient.post('http://localhost:5000/api/auth/forgotten', {email: email}).subscribe({
        next:(response)=>{
          this.toastr.success(response as string)
        },
        error: (error)=>{
          this.toastr.success(error as string)
        }
      })
    }
  }
}
