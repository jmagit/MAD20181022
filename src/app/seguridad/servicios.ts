import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private isAuth = false;
  private authToken: string = '';
  private name = '';

  constructor() {
    if (localStorage && localStorage.AuthService) {
      const rslt = JSON.parse(localStorage.AuthService);
      this.isAuth = rslt.isAuth;
      this.authToken = rslt.authToken;
      this.name = rslt.name;
    }
  }

  get AuthorizationHeader() { return this.authToken;  }
  get isAutenticated() { return this.isAuth; }
  get Name() { return this.name; }

  login(isAuth: boolean, authToken: string, name: string ) {
    this.isAuth = isAuth;
    this.authToken = authToken;
    this.name = name;
    if (localStorage) {
      localStorage.AuthService = JSON.stringify({isAuth, authToken, name});
    }
  }
  logout() {
    this.isAuth = false;
    this.authToken = '';
    this.name = '';
    if (localStorage) {
      localStorage.removeItem('AuthService');
    }
  }
}

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
    if (!req.withCredentials || ! this.auth.isAutenticated) { return next.handle(req); }
    const authReq = req.clone(
      { headers: req.headers.set('Authorization', this.auth.AuthorizationHeader) });
    return next.handle(authReq);
  }
}


