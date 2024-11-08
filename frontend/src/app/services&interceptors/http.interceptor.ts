import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.authService.getUser();
        const accessToken = user ? user.accessToken : null; 
        if (accessToken) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${accessToken}` }
            });
        }

        return next.handle(request);
    }
}