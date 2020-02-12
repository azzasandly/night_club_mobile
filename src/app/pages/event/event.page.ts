import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ClubService } from 'src/app/services/club/club.service';
import { NavExtrasServiceService } from 'src/app/services/navigation/nav-extras-service.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage   {
  listEvent : any = [];
  id_club: number = 0;
  nameClub: String;
  myEventSet : any;
  actionSheet:any;
  todaydate:any;

  constructor(private menu: MenuController,
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private navCtrl: NavController,
    private navExtras: NavExtrasServiceService,
    public actionSheetController: ActionSheetController) { 
      this.menu.enable(true);

      this.listEvent = this.listEvent.map(item => (
        {
        ...item,
        showMore: false
      }));
    }


  ionViewWillEnter() {
    this.ListEvent();
    let datetoday = new Date().toISOString();
    let rep1 = datetoday.replace("T", " ");
     this.todaydate = rep1.substr(0, 19);
    console.log('today ',this.todaydate);
  }
ListEvent(){
      //get id club from params
      this.route.queryParams.subscribe((res)=>{
        this.id_club = res['idclub'];
        this.nameClub = res['name'];
    });
    //get list event
  this.clubService.listEvent(this.id_club).subscribe(
    data => {
      console.log('data event ',data);
      this.listEvent = data;
    },
    error => {
      console.log(error);
      this.alertService.presentToast(error.error.message);
    },
    () => {
    }
  );
}

trimString(string, length) {
  return string.length > length
    ? string.substring(0, length) + "..."
    : string;
}

detailEvent(levent: any , nameclu){
  this.navExtras.setExtras(levent);
        //send detail event & name club in params
        let navigationExtras: NavigationExtras = {
          queryParams: {
            name: nameclu,
            idClub: this.id_club
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
        this.clubService.interestEvent(id_event,'interested').subscribe(
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
        this.clubService.interestEvent(id_event,'going').subscribe(
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
        this.clubService.interestEvent(id_event,'not_going').subscribe(
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
