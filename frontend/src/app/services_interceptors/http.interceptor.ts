import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { jwtDecode }from 'jwt-decode';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { throwError} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NavlinksService } from './navlinks.service';
import { ForumLinksService } from './forumlinks.service';
@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
    private isRefreshing = false; //set a toggle variable
    private refreshTokenSubject = new BehaviorSubject<string | null>(null); //behaviourSubject to held the value
    constructor(
                private authService: AuthService, 
                private router: Router, 
                private toastr: ToastrService, 
                private navlinksService: NavlinksService, 
                private forumLinksService: ForumLinksService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
        const user = this.authService.getUser();
        const accessToken = user ? user.accessToken : null;
        const excludedUrls = ['assets/'];
        if (excludedUrls.some(url => request.url.includes(url))) {
            return next.handle(request);
        }

        const isRefreshCall = request.url.includes('/api/auth/refreshToken'); // define my endpoint that is called

        if (isRefreshCall) {
            return next.handle(request); // Skip interceptor for refresh token calls, so it not triggers so often
        }
        if (accessToken && typeof accessToken === 'string') {
            const decodedToken: any = jwtDecode(accessToken); //decode the accesstoken
            const isExpired = decodedToken && decodedToken.exp ? (decodedToken.exp < Date.now() / 1000) : false;

            if (isExpired) {
                if (!this.isRefreshing) {
                    this.isRefreshing = true; //set the toggle true
                    this.refreshTokenSubject.next(null); //set the behaviourSuject to null
                
                return this.authService.refreshToken().pipe( 
                    switchMap((response:any) => { 

                        this.isRefreshing = false; //the refresh is now false so request is only one time made
                        this.refreshTokenSubject.next(response.accessToken);

                        user.accessToken = response.accessToken; 
                        localStorage.setItem('user', JSON.stringify(user)); 
                        
                       const clonedRequest = request.clone({ 
                            setHeaders: { Authorization: `Bearer ${response.accessToken}` } 
                        }); 
                            this.navlinksService.getNavlinks();
                            this.forumLinksService.getForumLinks();
                            return next.handle(clonedRequest); 
                        }), 
                            catchError((error) => { 
                                this.toastr.error('Ein Fehler ist aufgetreten, bitte melden Sie sich neu an');
                                this.isRefreshing = false;
                                this.authService.logout();
                                this.router.navigate(['/login']); 
                                return throwError(()=>error);
                            }) );
                        }
                        else{
                            return this.refreshTokenSubject.pipe(
                                filter(token => token != null),
                                take(1), //take only one then stop emmitting
                                switchMap((token) => {
                                    const clonedRequest = request.clone({
                                        setHeaders: { Authorization: `Bearer ${token}` }
                                    });
                                    return next.handle(clonedRequest);
                                })
                            );
                        }
            } else {
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${accessToken}` }
                });
            }
        }

        return next.handle(request);
    }
}
