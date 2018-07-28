import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../service';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('www.acropollis.com') !== -1) {
      return next.handle(req);
    }

    const authToken = this.loginService.getAuthToken();

    const authReq = !!authToken ?
      req.clone({ headers: req.headers.set('Authorization', this.loginService.getAuthToken())}) :
      req;

    return next.handle(authReq)
      .do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do nothing
        }
      }, (error: any) => {
        if (error.status === 403 || error.status === 401) {
          this.router.navigate([`/login`]);

          this.loginService.clearAuthToken();

          return Observable.throw(error);
        } else {
          return Observable.of(error);
        }
      });
  }
}
