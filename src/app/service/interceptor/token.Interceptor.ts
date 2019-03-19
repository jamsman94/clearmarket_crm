import {Injectable, Injector} from '@angular/core';
import {TokenService} from '../token.service';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private tokenService: TokenService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let tokenHeader: HttpHeaders;
    if (this.tokenService.token !== undefined && this.tokenService.token !== null) {
       tokenHeader = new HttpHeaders({
        'X-Access-Token': this.tokenService.token,
         //TODO add custom
      });
    }
    const newReq = req.clone({headers: tokenHeader});
    return next.handle(newReq);
  }

}
