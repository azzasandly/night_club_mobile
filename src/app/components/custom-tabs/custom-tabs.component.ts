import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-custom-tabs',
  templateUrl: './custom-tabs.component.html',
  styleUrls: ['./custom-tabs.component.scss'],
})
export class CustomTabsComponent   {
   colorHome: string ="medium";
   colorActuality: string ="medium";
   colorCheck: string ="medium";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) 
  {
    this.route.queryParams.subscribe((res)=>{
      if(res['changeColorHome']){
        this.colorHome = res['changeColorHome'];
      }
      if(res['changecolorActuality']){
        this.colorActuality = res['changecolorActuality'];
      }
      if(res['changecolorCheck']){
        this.colorCheck = res['changecolorCheck'];
      }

    });
   }


   home(){

  let navigationExtras: NavigationExtras = {
    queryParams: {
      changeColorHome: "primary"
      }
  };
  //navigate to page home
  this.router.navigate(['/home'],navigationExtras);
}

qrcode(){

  let navigationExtras: NavigationExtras = {
    queryParams: {
      changecolorCheck: "primary"
      }
  };
  //navigate to page qrcode
  this.router.navigate(['/qrcode'],navigationExtras);
}

}
