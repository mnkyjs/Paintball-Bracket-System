import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from './tokens';

@Injectable()
export class ApiUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(API_URL) private apiUrl: string) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ url: this.prepareUrl(req.url) });
    return next.handle(req);
  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }

  private prepareUrl(url: string): string {
    if (url.substring(0, 7) !== '/assets') {
      url = this.isAbsoluteUrl(url) ? url : this.apiUrl + '/' + url;
    }
    return url.replace(/([^:]\/)\/+/g, '$1');
  }
}
