import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavExtrasServiceService } from 'src/app/services/navigation/nav-extras-service.service';
import { ActionSheetController } from '@ionic/angular';
import { ClubService } from 'src/app/services/club/club.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.page.html',
  styleUrls: ['./details-event.page.scss'],
})
export class DetailsEventPage  {

  listDetailEvent : any ;
  dataEvent : any ;
  name_club: String;
  id_club: number;
  actionSheet:any;
  event_id:number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navExtras: NavExtrasServiceService,
    public actionSheetController: ActionSheetController,
    private clubService: ClubService,
    private alertService: AlertService) {


     }

     ionViewWillEnter() {
      this.detailEvent();
    }
detailEvent(){
        //get name club & details event from params
        this.route.queryParams.subscribe((res)=>{
          this.name_club = res['name'];
          this.id_club = res['idClub'];
      });
      this.listDetailEvent = this.navExtras.getExtras();
      console.log("list ",this.listDetailEvent);
}
//add interest to event
presentActionSheet(id_event: number,event:any){
  this.event_id = id_event;
  console.log("id_event ",id_event);
  this.actionSheet = this.actionSheetController.create({
    header: 'Action',
    buttons: [ {
      text: 'Interested',
      icon: 'star',
      handler: () => {
        //save action 
        this.clubService.interestEvent(id_event,'interested').subscribe(
          data => {
            this.alertService.presentToast(data['message']);

          },
          error => {
            console.log(error);
            this.alertService.presentToast(error.error.message);
          },
          () => {
            this.refreshevent();
          }
        );
      }
    }, {
      text: 'Going',
      icon: 'checkmark-circle',
      handler: () => {
        //save action 
        this.clubService.interestEvent(id_event,'going').subscribe(
          data => {
            this.alertService.presentToast(data['message']);

          },
          error => {
            console.log(error);
            this.alertService.presentToast(error.error.message);
          },
          () => {
            this.refreshevent();
          }
        );
      }
    }, {
      text: 'Not going',
      icon: 'close',
      handler: () => {
        //save action 
        this.clubService.interestEvent(id_event,'not_going').subscribe(
          data => {
            this.alertService.presentToast(data['message']);


          },
          error => {
            console.log(error);
            this.alertService.presentToast(error.error.message);
          },
          () => {
            this.refreshevent();
          }
        );
      }
    }]
  }).then(actionsheet => {
    actionsheet.present();
  });
}
refreshevent(){
    //get list event
    this.clubService.listEvent(this.id_club).subscribe(
      data => {
        console.log('other data event ',data);
        this.dataEvent = data;
        for (var i = 0; i < this.dataEvent.length; i++) {
          if (this.dataEvent[i].event.id == this.event_id){
            this.listDetailEvent = this.dataEvent[i];
          }
        }
      },
      error => {
        console.log(error);
        this.alertService.presentToast(error.error.message);
      },
      () => {
      }
    );

}
//add booking
booking(id_event:number, id_club:number,nameclu: string,years:string,month:string){
  //send detail event in params
  let navigationExtras: NavigationExtras = {
   queryParams: {
     bookingForid: id_event,
     bookingFor: 'events',
     idClub: id_club,
     nameClub:nameclu,
     years:years,
     month:month
     }
 };
 //navigate to page details event
 this.router.navigate(['/booking'],navigationExtras);
 
 }
}
