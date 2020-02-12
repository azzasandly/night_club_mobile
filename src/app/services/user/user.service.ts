import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from '../env.service';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { User } from '../../models/user';
import { Club } from '../../models/club';
import { Centerinterer } from '../../models/centerinterer';
import { AuthService } from '../auth/auth.service';
import { NavExtrasServiceService } from '../navigation/nav-extras-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoggedIn = false;
  token:any;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private secureStorage: SecureStorage,
    private env: EnvService,
    private authService: AuthService,
    private navExtras: NavExtrasServiceService,
  ) { 
    
  }

  user() {
    console.log('get token',this.navExtras.getTokenSer());
    this.token = this.navExtras.getTokenSer();

    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<User>(this.env.API_URL_USER + 'profile', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }
  club() {
    this.token = this.navExtras.getTokenSer();
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<Club>(this.env.API_URL_USER + 'club', { headers: headers })
    .pipe(
      tap(club => {
        return club;
      })
    )
  }
  centerinterer() {
    this.token = this.navExtras.getTokenSer();
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<Centerinterer>(this.env.API_URL_USER + 'centerinterer', { headers: headers })
    .pipe(
      tap(centerinterer => {
        return centerinterer;
      })
    )
  }
  addclub(idclubs:Array<number>) {
    this.token = this.navExtras.getTokenSer();
    console.log('idclubs service ',idclubs);
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    let postdata = JSON.stringify({
      idclubs
    });
    return this.http.post(this.env.API_URL_USER + 'userclub',
      {idclub:postdata},{ headers: headers }
    )
  }
  addcenterinterer(idcenterinterers:Array<number>) {
    this.token = this.navExtras.getTokenSer();
    console.log('idcenterinterer service ',idcenterinterers);
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    let postdata = JSON.stringify({
      idcenterinterers
    });
    console.log('postdata service ',postdata);
    return this.http.post(this.env.API_URL_USER + 'userinterer',
      {idcenterinterer:postdata},{ headers: headers }
    )
  }
  ListUserClub() {
    this.token = this.navExtras.getTokenSer();
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<Club>(this.env.API_URL_USER + 'listclubuser', { headers: headers })
    .pipe(
      tap(club => {
        return club;
      })
    )
  }
  RestListUserClub() {
    this.token = this.navExtras.getTokenSer();
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.get<Club>(this.env.API_URL_USER + 'restlistclubuser', { headers: headers })
    .pipe(
      tap(club => {
        return club;
      })
    )
  }
  UpdateProfile(fName: String, lName: String, tel: number ) {
    this.token = this.navExtras.getTokenSer();
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.post(this.env.API_URL_USER + 'updateprofile',
      {fName: fName, lName: lName,tel: tel},{ headers: headers }
    )
  }
}
