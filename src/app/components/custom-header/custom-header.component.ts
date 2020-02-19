import { Component, OnInit, Input } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
@Component({
  selector: 'app-custom-header',
  templateUrl: './custom-header.component.html',
  styleUrls: ['./custom-header.component.scss'],
})
export class CustomHeaderComponent  {
  @Input() icon_left : string ;
  @Input() icon_right : string;
  @Input() title : string ;
  private previousUrl: string = undefined;
  private currentUrl: string = undefined;

  constructor(
    private menu: MenuController,
    private route: ActivatedRoute,
    private router: Router,
    public navCtrl: NavController,
  ) { 

      this.menu.enable(true);


    
  }
  
  goBack(){
    this.navCtrl.pop();

  }



}
