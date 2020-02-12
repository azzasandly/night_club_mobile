import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from '../env.service';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { User } from '../../models/user';
import { Club } from '../../models/club';
import { Centerinterer } from '../../models/centerinterer';
import { AlertService } from '../alert.service';
import { NavExtrasServiceService } from '../navigation/nav-extras-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;
  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private secureStorage: SecureStorage,
    private env: EnvService,
    private alertService: AlertService,
    private navExtras: NavExtrasServiceService,
  ) {   }
  login(email: String, password: String) {
    return this.http.post(this.env.API_URL_AUTH + 'login',
      {email: email, password: password}
    ).pipe(
      tap(token => {
        this.navExtras.setTokenSer(token);
        console.log('token in auth ',token);
        // save token in storage
        this.storage.setItem('storage', token)
        .then(
          () => {
            console.log('Token Stored',token);
          },
          error => {
            console.error('Error storing item', error);
          }
        );
        /*
this.secureStorage.create('my_store_name')
  .then((storage: SecureStorageObject) => {

     storage.get('key')
       .then(
         data => console.log(data),
         error => console.log(error)
     );

     storage.set('key', 'value')
       .then(
        data => console.log(data),
         error => console.log(error)
     );

     storage.remove('key')
     .then(
         data => console.log(data),
         error => console.log(error)
     );

  });*/
  this.token = token;
  this.isLoggedIn = true;
  return token;

      }),
    );
  }

  register(fName: String, lName: String, tel: number, email: String, password: String) {
    return this.http.post(this.env.API_URL_AUTH + 'register',
      {fName: fName, lName: lName,tel: tel, email: email, password: password}
    )
  }
  logout() {

    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get(this.env.API_URL_AUTH + 'logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("storage");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }

  getToken() {
    //change get from storage
    //this.storage.getItem('storage')
    return this.token = this.navExtras.getTokenSer().then(
      data => {
        console.log('get token from serv',data);
        this.token = data;
      if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
        this.alertService.presentToast('No token stored');

      }
    );
  }


}