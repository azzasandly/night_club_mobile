import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from '../env.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CheckinService {

  constructor(private http: HttpClient,
    private env: EnvService,) { }

  //checkin
  checkin(content: number,
    location:string
    ) {

    return this.http.post(this.env.API_URL_CHECKIN + 'verifychekin',
    {content:content,
      location:location
    })
    .pipe(
      tap(checkin => {
        return checkin;
      })
    )
  }




  }
