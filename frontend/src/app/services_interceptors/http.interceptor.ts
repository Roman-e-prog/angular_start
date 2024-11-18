import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { jwtDecode }from 'jwt-decode';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { throwError} from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private httpClient: HttpClient, private router: Router, private toastr: ToastrService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.authService.getUser();
        const accessToken = user ? user.accessToken : null;
        if (accessToken) {
            const decodedToken: any = jwtDecode(accessToken);
            const isExpired = decodedToken && decodedToken.exp ? (decodedToken.exp < Date.now() / 1000) : false;

            if (isExpired) {
                return this.authService.refreshToken().pipe( 
                    switchMap((response) => { 
                    console.log(response, 'accesstoken gesetzt')
                        user.accessToken = response; 
                        localStorage.setItem('user', JSON.stringify(user)); 
                        request = request.clone({ 
                            setHeaders: { Authorization: `Bearer ${response}` } 
                        }); 
                            return next.handle(request); 
                        }), 
                            catchError((error) => { 
                                this.toastr.error('Ein Fehler ist aufgetreten, bitte melden Sie sich neu an');
                                this.authService.logout();
                                this.router.navigate(['/login']); 
                                return throwError(()=>error);
                            }) );
            } else {
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${accessToken}` }
                });
            }
        }

        return next.handle(request);
    }
}
