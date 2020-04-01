import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, NavController, PopoverController, IonSlides } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ClubService } from 'src/app/services/club/club.service';
import { EventService } from 'src/app/services/event/event.service';
import { NavExtrasServiceService } from 'src/app/services/navigation/nav-extras-service.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage   {
  listEvents : any = [];
  club_id: number = 0;
  nameClub: String;
  actionSheet:any;
  available_event:boolean;

  @ViewChild('slides', { static: true }) slider: IonSlides;  
  segment = 0;  

  constructor(private menu: MenuController,
    private clubService: ClubService,
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private navCtrl: NavController,
    private navExtras: NavExtrasServiceService,
    public actionSheetController: ActionSheetController,
    public popoverCtrl: PopoverController) { 
      this.menu.enable(true);
    }

    async segmentChanged(ev: any) {  
      await this.slider.slideTo(this.segment);  
    }  
    async slideChanged() {  
      this.segment = await this.slider.getActiveIndex();  
    }  



  ionViewWillEnter() {
    this.ListEvent();
  }
ListEvent(){
      //get id club from params
      this.route.queryParams.subscribe((res)=>{
        this.club_id = res['idclub'];
        this.nameClub = res['name'];
    });
    //get list event
  this.eventService.getEvent(this.club_id).subscribe(
    data => {
      console.log('data event ',data);
      this.listEvents = data;
    },
    error => {
      console.log(error);
      this.alertService.presentToast(error.error.message);
    },
    () => {
    }
  );
}

detailEvent(levent: any , nameclu, dayEvent){
  this.navExtras.setExtras(levent);
        //send detail event & name club in params
        let navigationExtras: NavigationExtras = {
          queryParams: {
            name: nameclu,
            idClub: this.club_id,
            dayEvent: dayEvent
            }
      };
        //navigate to page details event
        this.router.navigate(['/details-event'],navigationExtras);
}

//add interest to event
presentActionSheet(id_event: number){

  console.log("id_event ",id_event);
  this.actionSheet = this.actionSheetController.create({
    header: 'Action',
    buttons: [ {
      text: 'Interested',
      icon: 'star',
      handler: () => {
        //save action 
        this.eventService.interestEvent(id_event,'interested').subscribe(
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
    }, {
      text: 'Going',
      icon: 'checkmark-circle',
      handler: () => {
        //save action 
        this.eventService.interestEvent(id_event,'going').subscribe(
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
    }, {
      text: 'Not going',
      icon: 'close',
      handler: () => {
        //save action 
        this.eventService.interestEvent(id_event,'not_going').subscribe(
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
    }]
  }).then(actionsheet => {
    actionsheet.present();
  });
}
  //add booking
  booking(id_event:number, id_club:number,nameclu: string,started_date_event:string){
    //send detail event in params
    let navigationExtras: NavigationExtras = {
      queryParams: {
        bookingForid: id_event,
        bookingFor: 'events',
        idClub: id_club,
        nameClub:nameclu,
        started_date_event:started_date_event
        }
    };
    //navigate to page details event
    this.router.navigate(['/booking'],navigationExtras);
  
    }
}
