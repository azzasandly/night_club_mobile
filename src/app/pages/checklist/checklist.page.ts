import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Centerinterer } from 'src/app/models/centerinterer';
import { Club } from 'src/app/models/club';
import { AlertService } from 'src/app/services/alert.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage  {

  club: Club;
  centerinterer: Centerinterer;
  data: any;
  listclub:Array<number> =[];
  listcenterinterer:Array<number> =[];
  showcenter:boolean=true;
  idcenter: number;
  idclub: number;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private navCtrl: NavController) { 
  }
  ionViewWillEnter() {
    this.getListclub();
    this.getListcenterinterer();


  }
  addclub(event:any) {
    this.idclub = parseInt(event.target.value);
    if (event.target.checked == true){
      this.listclub.push(this.idclub);
    }
    else if(event.target.checked == false){
      const index: number = this.listclub.indexOf(this.idclub);
      if (index !== -1) {
          this.listclub.splice(index, 1);
      }
    }
    console.log('listclub',this.listclub);

  } 
  addcenterinterer(event:any) {
    this.idcenter = parseInt(event.target.value);
    if (event.target.checked == true){
      this.listcenterinterer.push(this.idcenter);
    }
    else if(event.target.checked == false){
      console.log('her');
      const index: number = this.listcenterinterer.indexOf(this.idcenter);
      if (index !== -1) {
          this.listcenterinterer.splice(index, 1);
      }
    }
    console.log('listcenter',this.listcenterinterer);

  } 
  continue(){
   
    if (this.listcenterinterer.length == 0){
      this.alertService.presentToast('Choose your area of interst');
    }

    else{
      this.showcenter=false;
    }

  }
  validate(){
     if (this.listclub.length == 0){
      this.alertService.presentToast('Choose your Club');
    }
    else{
      
    console.log('val listcenter',this.listcenterinterer);
    console.log(' val listclub',this.listclub);
    this.userService.addcenterinterer(this.listcenterinterer).subscribe(
      data => {
        this.userService.addclub(this.listclub).subscribe(
          data => {
          },
          error => {
            console.log(error);
          },
          () => {
            this.navCtrl.navigateRoot('/dashboard');
          }
        );
        this.alertService.presentToast(data['message']);
      },
      error => {
        console.log(error);
      },
      () => {
        
      }
    );
    }
  }
 
  getListclub(){
  this.userService.club().subscribe(
    club => {
      console.log('clubs',club);
      this.club = club;
      console.log('clu',this.club);
    }
  );
}
  getListcenterinterer(){
  this.userService.centerinterer().subscribe(
    centerinterest => {
      console.log('center intere',centerinterest);
      this.centerinterer = centerinterest;

    }
  );
}

}
