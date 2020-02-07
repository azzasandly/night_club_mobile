import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ClubService } from '../../services/club/club.service';
import { NavExtrasServiceService } from '../../services/navigation/nav-extras-service.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage  {
  bookingForid: number;
  bookingFor: string;
  idClub: number;
  nameClub:string;
  datebooking:any;
  years:any;
  month:any;
  constructor( private menu: MenuController,
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private navCtrl: NavController,
    private navExtras: NavExtrasServiceService){ 
      this.menu.enable(true);

    }

ionViewWillEnter() {
  //get inform from params
  this.route.queryParams.subscribe((res)=>{
    this.idClub = res['idClub'];
    this.nameClub = res['nameClub'];
    this.bookingForid = res['bookingForid'];
    this.bookingFor = res['bookingFor'];
    this.years = res['years'];
    this.month = res['month'];
  });
}

updateDateTime(event:any){
  console.log('event ',event);
  let rep1 = event.target.value.replace("T", " ");
  let rep2 = rep1.substr(0, 16);
  console.log('rep2 ',rep2);
  this.datebooking = rep2;
}

AddBooking(form: NgForm){

  if (form.value.nbparticipent == "")
  {
    this.alertService.presentToast("Number of particpents required");
  }
  else if (this.datebooking == "")
  {
    this.alertService.presentToast("Date booking required");
  }
  else if (form.value.comment == "")
  {
    this.alertService.presentToast("Comment required");
  }
  else{

//get list event
this.clubService.bookingEvent(this.idClub,
  form.value.nbparticipent,
  this.datebooking,
  this.bookingFor,
  this.bookingForid,
  form.value.comment,
  
  ).subscribe(
data => {
  this.alertService.presentToast(data['message']);
  //redirect to page home
this.router.navigate(['/dashboard']);
},
error => {
  console.log(error);
  this.alertService.presentToast(error.error.message);
},
() => {
}
);
  }

}

}
