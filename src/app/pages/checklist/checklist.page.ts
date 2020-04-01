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
  data: any;
  listclub:Array<number> =[];

  idclub: number;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private navCtrl: NavController) { 
  }
  ionViewWillEnter() {
    this.getListclub();


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

  validate(){
     if (this.listclub.length == 0){
      this.alertService.presentToast('Choose your Club');
    }
    else{
      
    console.log(' val listclub',this.listclub);
    this.userService.addclub(this.listclub).subscribe(
      data => {
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/home');
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


}
