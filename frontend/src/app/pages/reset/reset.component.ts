import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent implements OnInit{
  constructor(private route: ActivatedRoute, 
              private httpClient: HttpClient, 
              private toastr: ToastrService,
              private router: Router){}
  token: any;
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')
  }
  resetForm = new FormGroup({
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required),
  },{ validators: this.passwordMatchValidator, updateOn:'blur' })
  
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { passwordsMismatch: true };
  }
  onSubmit = ()=>{
    if(this.resetForm.valid){
      const newPassword = this.resetForm.value.password;
      const resetData = {
        password: newPassword,
        token: this.token
      }
      this.httpClient.post('http://localhost:5000/api/auth/newPassword', resetData).subscribe({
        next:(response)=>{
          this.toastr.success(response as string)
          this.router.navigate(['/login'])
        },
        error:(error)=>{
          this.toastr.error(error)
        }
      })
    }
  }
}
