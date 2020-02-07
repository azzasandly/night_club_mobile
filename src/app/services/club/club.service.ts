import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { SecureStorage } from '@ionic-native/secure-storage/ngx';
import { EnvService } from '../env.service';
import { AuthService } from '../auth/auth.service';
import { Club } from '../../models/club';
import { tap } from 'rxjs/operators';
import { NavExtrasServiceService } from '../navigation/nav-extras-service.service';

@Injectable({
  providedIn: 'root'
})
export class ClubService {
  isLoggedIn = false;
  token:any;
  
  constructor(private http: HttpClient,
    private storage: NativeStorage,
    private secureStorage: SecureStorage,
    private env: EnvService,
    private authService: AuthService,
    private navExtras: NavExtrasServiceService,) { }

  //details club
  showClub(id_club: number) {
    this.token = this.navExtras.getTokenSer();
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.post(this.env.API_URL + 'club/show',
    {idclub:id_club}, { headers: headers })
    .pipe(
      tap(club => {
        return club;
      })
    )
  }
  //list events
  listEvent(id_club: number) {
    this.token = this.navExtras.getTokenSer();
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.post(this.env.API_URL + 'club/event/listevent',
    {idclub:id_club}, { headers: headers })
    .pipe(
      tap(event => {
        return event;
      })
    )
  }
  //add interset events
  interestEvent(id_event: number,action_event: String) {
    this.token = this.navExtras.getTokenSer();
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.post(this.env.API_URL + 'club/event/addinterestevent',
    {idevent:id_event,action:action_event}, { headers: headers })
    .pipe(
      tap(event => {
        return event;
      })
    )
  }
  //add booking events
  bookingEvent(idClub: number,
    nbParticipents: number,
    bookingDate: string,
    bookingFor: string,
    bookingForId: number,
    comment:string
    ) {
    this.token = this.navExtras.getTokenSer();
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    return this.http.post(this.env.API_URL + 'club/addbooking',
    {idClub:idClub,
    nbParticipents:nbParticipents,
    bookingDate:bookingDate,
    bookingFor:bookingFor,
    bookingForId:bookingForId,
    comment:comment,
    }, { headers: headers })
    .pipe(
      tap(booking => {
        return booking;
      })
    )
  }
}
