import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
   
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;
  constructor(private router: Router, private httpClient: HttpClient, private toastr: ToastrService) {
    let user;
    if(typeof window !== 'undefined'){
        user = JSON.parse(localStorage.getItem('user')!);
    }
    this.userSubject = new BehaviorSubject<any>(user);
    this.user = this.userSubject.asObservable(); 
    
  }

  public get userValue(): any {
    return this.userSubject.value;
  }

  login(username: string, email: string, password: string): Observable<any> {
    console.log('I am triggered with:', username, email, password)
    return this.httpClient.post('http://localhost:5000/api/auth/login', { username, email, password }).pipe(
      map((response: any) => {
        console.log(response)
        if (typeof response === 'string') {
          console.log(response)
          this.toastr.error(response);
          throw new Error(response);
        } else {
          if(typeof window !== 'undefined'){
            console.log(response)
            localStorage.setItem('user', JSON.stringify(response));
            this.userSubject.next(response);
            return response;
          }
        }
      }),
      catchError(error => {
        this.toastr.error(error.message);
        throw error;
      })
    );
  }

  getUser() {
    if(typeof window !== 'undefined'){
      const user = JSON.parse(localStorage.getItem('user')!);
      return user;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
