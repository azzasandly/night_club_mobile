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

    return this.http.post(this.env.API_URL_CLUB + 'show',
    {idclub:id_club})
    .pipe(
      tap(club => {
        return club;
      })
    )
  }

}
