import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NavExtrasServiceService } from '../services/navigation/nav-extras-service.service';
import { Storage } from '@ionic/storage';

  @Injectable()
export class TokenInterceptor implements HttpInterceptor {
      //token: any;
    constructor(private router: Router,
        private storage: Storage,
        private alertService: AlertService,
        private navExtras: NavExtrasServiceService,
        ) {

        }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      /*this.token = this.storage.get('storage');
      console.log('storage extra token ',this.token);*/
        /* this.token = this.storage.getItem('storage');*/
        const token = this.navExtras.getTokenSer();
        console.log('token get in inter ',token);
      
        if (token != undefined) {
          request = request.clone({
            setHeaders: {
              'Authorization': token["token_type"]+" "+token["access_token"]
            }
          });
        }
      
        if (!request.headers.has('Content-Type')) {
          request = request.clone({
            setHeaders: {
              'content-type': 'application/json'
            }
          });
        }
      
        request = request.clone({
          headers: request.headers.set('Accept', 'application/json')
        });
      
        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              console.log('event--->>>', event);
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              if (error.error.success === false) {
                this.alertService.presentToast("Login failed");
              } else {
                this.router.navigate(['login']);
              }
            }
            return throwError(error);
          }));
        }
}