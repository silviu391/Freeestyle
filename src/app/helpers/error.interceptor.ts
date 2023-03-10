import { Injectable } from "@angular/core";
import {HttpRequest,HttpHandler,HttpInterceptor, HttpEvent} from '@angular/common/http';
import { Observable,throwError } from "rxjs";
import { catchError } from "rxjs";

import {AuthenticationService} from '../services/authServices';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private authenticationService : AuthenticationService ) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload();
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}