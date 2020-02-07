import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { Club } from '../../models/club';
import { AlertService } from 'src/app/services/alert.service';
import { NavController, ModalController } from '@ionic/angular';
import { DashboardPage } from '../dashboard/dashboard.page';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  user: User;
  club: any = [];
  restlistclub: any = [];
  listuserclub:Array<number> =[];
  constructor(private userService: UserService,
    private alertService: AlertService,
    private navCtrl: NavController,
    private router: Router,
    private modalController: ModalController,
    
    ) {

  }

  ionViewWillEnter() {
    this.getRestListclub();
    this.getListclub();
  }
  getListclub(){
    this.userService.ListUserClub().subscribe(
      club => {
        this.club = club;
      }
    );
  }
  getRestListclub(){
    this.userService.RestListUserClub().subscribe(
      club => {
        console.log('rest list clubs',club);
        this.restlistclub = club;
        console.log('clu',this.restlistclub);
      }
    );
  }
  addClub(event: any){
    console.log('list user clubs',this.club);
    //get old list user club
    for (var i = 0; i < this.club.length; i++) {
      this.listuserclub.push(this.club[i].id);
    }
    console.log('event ',event.target.value);
    //get new list user club
    for (var j = 0; j < event.target.value.length; j++) {
      this.listuserclub.push(parseInt(event.target.value[j]));
    }
    console.log('new list user club ',this.listuserclub);
    //update list user club
    this.userService.addclub(this.listuserclub).subscribe(
      data => {
        this.alertService.presentToast(data['message']);
          this.ionViewWillEnter();

      },
      error => {
        console.log(error);
        this.alertService.presentToast(error.error.message);
      },
      () => {
      }
    );
   
  }


  showClub(id_club: number){
    console.log('id club ', id_club);
    //send id club in params
    let navigationExtras: NavigationExtras = {
      queryParams: {
          idclub: id_club}
  };
    //navigate to page club
    this.router.navigate(['/club'],navigationExtras);

  }
}
