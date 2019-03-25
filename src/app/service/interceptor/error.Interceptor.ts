import {Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpResponseBase
} from '@angular/common/http';
import {NzNotificationService} from 'ng-zorro-antd';
import {Observable, of, throwError} from 'rxjs';
import {catchError, mergeMap} from 'rxjs/operators';

// 可能的错误信息提示，可修改
const RETURNCODE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor{

  constructor(
    private injector: Injector
  ) { }
  private goTo(url: string) {
    // 设置延迟然后跳转
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }
  // HTTP协议返回错提示
  private checkStatus(evt: HttpResponseBase) {
    if (evt.status >= 200 && evt.status < 300) {
      return;
    }
    const errorText = RETURNCODE[evt.status] || evt.statusText;
    this.injector.get(NzNotificationService).error(
      `请求错误 ${evt.status} : ${evt.url}`,
      errorText
    );
  }
  // 处理返回200后的业务错误
  private handleInternalError(evt: HttpResponse<any>) {
    // 通用的错误提示
    if (evt.body.status !== 1) {
      this.injector.get(NzNotificationService).error(
        `请求错误 ${evt.body.status}: `,
        evt.body.message
      );
    }
    // 内部业务错误具体处理
    switch (evt.body.status) {
      // Token错误，重新登录
      case 401:
        this.goTo('/passport/login');
    }
    return;
  }
  private handleData(evt: any): Observable<any> {
    this.checkStatus(evt);
    switch (evt.status) {
      case 200:
        this.handleInternalError(evt);
        break;
      // Token过期或无效
      case 401:
        this.goTo('passport/login');
        break;
      default:
        if (evt instanceof HttpErrorResponse) {
          console.warn('未可知错误，大部分是由于后端不支持CORS或无效配置引起', evt);
          return throwError(evt);
        }
        break;
    }
    return of(evt);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = 'https://' + req.url + '/';
    const newReq = req.clone({url});
    return next.handle(newReq).pipe(
      mergeMap((event: any) => {
        if (event instanceof HttpResponseBase) {
          return this.handleData(event);
        }
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err)),
    );
  }
}
