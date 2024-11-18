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
    return this.httpClient.post('http://localhost:5000/api/auth/login', { username, email, password }).pipe(
      map((response: any) => {
        if (typeof response === 'string') {
          this.toastr.error(response);
          throw new Error(response);
        } else {
          if(typeof window !== 'undefined'){
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
    if(typeof window !== 'undefined'){
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/']);
    }
  }
  currentUser = this.getUser()
  refreshToken() { return this.httpClient.post('http://localhost:5000/api/auth/refreshToken', {});}
  // refreshToken() {
  //   return this.httpClient.post<any>('http://localhost:5000/api/auth/refreshToken', {id: this.currentUser.id}).subscribe({
  //     next: (response)=>{
  //       this.currentUser.accessToken = response;
  //       localStorage.setItem('user', JSON.stringify(this.currentUser))
  //       this.userSubject.next(this.currentUser);
  //         return this.currentUser;
  //     },
  //     error: (error)=>{
  //       this.toastr.error(error);
  //       this.logout();
  //       this.router.navigate(['/login'])
  //     }
  //   })
  // }
}
