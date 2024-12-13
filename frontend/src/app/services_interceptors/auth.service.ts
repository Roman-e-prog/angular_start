import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Blogmember } from '../store/reducers/blogMember.reducer';
import {environment} from '../environments/environment'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
   
  private userSubject: BehaviorSubject<Blogmember | null>;
  public user: Observable<Blogmember | null>;
  constructor(private router: Router, private httpClient: HttpClient, private toastr: ToastrService) {
    let user: Blogmember | null = null;
    if(typeof window !== 'undefined'){
        user = JSON.parse(localStorage.getItem('user')!);
    }
    this.userSubject = new BehaviorSubject<Blogmember | null>(user);
    this.user = this.userSubject.asObservable(); 
    
  }

  public get userValue(): Blogmember | null {
    return this.userSubject.value;
  }

  login(username: string, email: string, password: string): Observable<Blogmember> {
    return this.httpClient.post<Blogmember>(`${environment.apiURL}api/auth/login`, { username, email, password }).pipe(
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
  refreshToken() { 
    const user = JSON.parse(localStorage.getItem('user')!);
    const refresh_token = user.refreshToken
    return this.httpClient.post(`${environment.apiURL}api/auth/refreshToken`, {refresh_token});
  }
}
