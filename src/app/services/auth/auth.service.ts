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
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token:any;
  constructor(
    private http: HttpClient,
    private storage: Storage,
    private secureStorage: SecureStorage,
    private env: EnvService,
    private alertService: AlertService,
    private router: Router,
    private userService: UserService,
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
        this.storage.set('tt', token)
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

  register(fName: String, lName: String, tel: String, email: String, password: String) {
    return this.http.post(this.env.API_URL_AUTH + 'register',
      {fName: fName, lName: lName,tel: tel, email: email, password: password}
    )
  }

  sendSms(tel: String) {
    return this.http.post(this.env.API_URL_AUTH + 'sendSms',
      {tel: tel}
    )
  }
  verifyPhone(code: number,fName: String, lName: String, tel: String, email: String, password: String) {
    console.log('tel ',tel);
    return this.http.post(this.env.API_URL_AUTH + 'verifyPhone',
    {code: code, fName: fName, lName: lName,tel: tel, email: email, password: password}
    )
  }

  logout() {

    return this.http.get(this.env.API_URL_AUTH + 'logout')
    .pipe(
      tap(data => {
        this.storage.remove("tt");
        this.isLoggedIn = false;
        delete this.token;

        return data;
      })
    )
  }

  getToken() {
    //change get from storage
    //this.storage.get('storage')  this.navExtras.getTokenSer()
    return this.token = this.storage.get('tt').then(
      data => {
        console.log('get token from storage',data);
        this.token = data;
      if(this.token != null) {
        //save token in sevice navigation
        this.navExtras.setTokenSer(this.token);

          this.isLoggedIn=true;

        //test user 
        this.userService.user().subscribe(
          user => {
            console.log('uc ',user.user_club_id);
            console.log('ui ',user.user_center_interest_id);
            //if userclub or userinterer null
            if( ((user.user_club_id == null) || (user.user_center_interest_id == null)) || ((user.user_club_id == null) && (user.user_center_interest_id == null)) ) {
              //redirect to page check list club & ineterer
    
              this.router.navigate(['/checklist']);
            }
            else {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  changeColorHome: "primary"
                  }
              };
              //redirect to dashbord
              this.router.navigate(['/home'],navigationExtras);
            }
          }
        );


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