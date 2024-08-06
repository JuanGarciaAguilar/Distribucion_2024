import { Injectable, inject } from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
} from '@angular/common/http';
import { EMPTY, Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Shared/Service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    url401 = '';
    reload = 0;
    private _AuthToken = inject(AuthService);
    private router = inject(Router);
    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this._AuthToken.getToken()}`,
            },
        });


      /**
    * TODO --- Validacion de duplicado de rutas sin token
    */


        /**
         * TODO --- Validacion de duplicado de rutas sin token
         */

    //  this._AuthToken.ValidarRuta(this._AuthToken.getToken());

        if (this.reload > 30) {
            setTimeout((x: any) => {
                this.reload = 0;
            }, 10000);
            return EMPTY;
        } else {
            return next.handle(req).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse && event.status === 200) {
                        this.url401 = '';
                        this.reload = 0;
                    }
                }),
                catchError((err: HttpErrorResponse) => {
                    if (err.status === 401) {
                        if (this.url401 == req.url) {
                            if (this.reload > 12) {
                                this.reload = 0;
                            } else {
                                this.reload++;
                            }
                        } else {
                            this.url401 = req.url;
                            this.reload = 0;
                        }

                        this._AuthToken.RemoveToken();
                        if (
                            this.router.url == 'auth/login' ||
                            this.router.url == '/'
                        ) {
                        } else {
                            this.router.navigateByUrl('auth/login');
                        }
                    }

                    return throwError(err);
                })
            );
        }

        return next.handle(req);
    }
}
