import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EnvService {
  API_URL = 'http://192.168.43.84:8100/api/';
  API_URL_AUTH = this.API_URL +'auth/';
  API_URL_CLUB = this.API_URL +'club/';
  API_URL_EVENT = this.API_URL +'event/';
  API_URL_BOOKING = this.API_URL +'booking/';
  API_URL_USER = this.API_URL +'user/';
  API_URL_CHECKIN = this.API_URL +'checkin/';
  
  constructor() { }
}