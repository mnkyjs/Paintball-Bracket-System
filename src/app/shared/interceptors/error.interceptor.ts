import { Injectable } from '@angular/core';
import {
	HttpInterceptor,
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpErrorResponse,
	HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private _alert: AlertService) {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			// @ts-ignore
			catchError((error) => {
				if (error instanceof HttpErrorResponse) {
					if (error.status === 401) {
						this._alert.error(error.statusText);
						return throwError(error.statusText);
					}

					const applicationError = error.headers.get('Application-Error');
					if (applicationError) {
						this._alert.error(applicationError);
						return throwError(applicationError);
					}
					const serverError = error.error;
					let modelStateErrors = '';
					if (serverError && typeof serverError === 'object') {
						for (const key in serverError) {
							if (serverError[key]) {
								modelStateErrors += serverError[key] + '\n';
							}
						}
					}
					this._alert.error(modelStateErrors || serverError || 'Server Error');
					return throwError(modelStateErrors || serverError || 'Server Error');
				}
			})
		);
	}
}

export const ErrorInterceptorProvider = {
	provide: HTTP_INTERCEPTORS,
	useClass: ErrorInterceptor,
	multi: true,
};
