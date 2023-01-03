import { Injectable } from "@angular/core";
import { HttpRequest,HttpHandler,HttpEvent,HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";

import {AuthenticationService} from '../services/authServices';

@Injectable()

export class Interceptor implements HttpInterceptor{

    constructor(private authenticationService:AuthenticationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser=this.authenticationService.currentUserValue;
        if(currentUser && currentUser.token)
        {
            req = req.clone({
                setHeaders : { 
                    Authorization:'Bearer ${currentUser.token}'
                }
            });
        }

        return next.handle(req);
    }
    
}