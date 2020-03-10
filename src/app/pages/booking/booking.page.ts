import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ClubService } from '../../services/club/club.service';
import { BookingService } from '../../services/booking/booking.service';
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
  date_event:any;
  constructor(
    private clubService: ClubService,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private navCtrl: NavController,
    private navExtras: NavExtrasServiceService){ 

    }

    ionViewWillEnter() {
      //get inform from params
      this.route.queryParams.subscribe((res)=>{
        console.log('aram booking ',res);
        this.idClub = res['idClub'];
        this.nameClub = res['nameClub'];
        this.bookingForid = res['bookingForid'];
        this.bookingFor = res['bookingFor'];
        this.date_event = res['started_date_event'];
      });
    }

    updateDateTime(event:any){
      console.log('event ',event);
      let rep1 = event.target.value.substr(11, 5);
      console.log('rep1 ',rep1);
      let dateEve = this.date_event.substr(0, 10);
      console.log('date event ',dateEve);
      this.datebooking = dateEve +" " +rep1;
      console.log('date booking ',this.datebooking);
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
      else{
    
    //get list event
    this.bookingService.bookingEvent(this.idClub,
      form.value.nbparticipent,
      this.datebooking,
      this.bookingFor,
      this.bookingForid,
      form.value.comment,
      
      ).subscribe(
    data => {
      this.alertService.presentToast(data['message']);
      //redirect to page home
    this.router.navigate(['/home']);
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
