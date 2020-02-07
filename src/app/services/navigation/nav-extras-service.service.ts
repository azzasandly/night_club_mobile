import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavExtrasServiceService {

  extras: any;
  token: any;

  constructor() { }

  public setExtras(data){
    this.extras = data;
  }

  public getExtras(){
    return this.extras;
  }
  public setTokenSer(data){
    this.token = data;
  }

  public getTokenSer(){
    return this.token;
  }
  
}
