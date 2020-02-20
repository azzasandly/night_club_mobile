import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from '../env.service';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage/ngx';
import { User } from '../../models/user';
import { Club } from '../../models/club';
import { Centerinterer } from '../../models/centerinterer';

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
  ) { 
    
  }

  user() {
    return this.http.get<User>(this.env.API_URL_USER + 'profile')
    .pipe(
      tap(user => {
        return user;
      })
    )
  }
  club() {

    return this.http.get<Club>(this.env.API_URL_USER + 'club')
    .pipe(
      tap(club => {
        return club;
      })
    )
  }
  centerinterer() {

    return this.http.get<Centerinterer>(this.env.API_URL_USER + 'centerinterest')
    .pipe(
      tap(centerinterest => {
        return centerinterest;
      })
    )
  }
  addclub(idclubs:Array<number>) {

    let postdata = JSON.stringify({
      idclubs
    });
    return this.http.post(this.env.API_URL_USER + 'userclub',
      {idclub:postdata}
    )
  }
  addcenterinterer(idcenterinterest:Array<number>) {

    let postdata = JSON.stringify({
      idcenterinterest
    });
    console.log('postdata service ',postdata);
    return this.http.post(this.env.API_URL_USER + 'userinterest',
      {idcenterinterest:postdata}
    )
  }
  ListUserClub() {

    return this.http.get<Club>(this.env.API_URL_USER + 'listclubuser')
    .pipe(
      tap(club => {
        return club;
      })
    )
  }
  RestListUserClub() {

    return this.http.get<Club>(this.env.API_URL_USER + 'restlistclubuser')
    .pipe(
      tap(club => {
        return club;
      })
    )
  }
  UpdateProfile(fName: String, lName: String, tel: number ) {

    return this.http.post(this.env.API_URL_USER + 'updateprofile',
      {fName: fName, lName: lName,tel: tel}
    )
  }
}
