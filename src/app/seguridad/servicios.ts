import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  isAuth = false;
  authToken: string;

  getAuthorizationHeader() {
    return this.authToken;
  }

  get isAutenticated() {
    return this.isAuth;
  }

  constructor() {
    this.authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJleHBpcmVzSW4iOiIxaCIsImlhdCI6MTU0MDM5NTc3NH0.aa30kqDjeRzIwV5tPVvR5gMGltFebzAbIpGe693MFnI';
    this.isAuth = true;
  }
}

import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const started = Date.now();
      let ok: string;
      return next.handle(req)
        .pipe(
          tap(
            event => ok = event instanceof HttpResponse ? 'succeeded' : '',
            error => ok = 'failed'
          ),
          finalize(() => {
            console.log(`${req.method} "${req.urlWithParams}" ${ok} in ${Date.now() - started} ms.`);
          })
        );
    }
}

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.withCredentials || ! this.auth.isAuth) { return next.handle(req); }
    const authHeader = this.auth.getAuthorizationHeader();
    const authReq = req.clone({ headers: req.headers.set('Authorization', authHeader) });
    return next.handle(authReq);
  }
}


