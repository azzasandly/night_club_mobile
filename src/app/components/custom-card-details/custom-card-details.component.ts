import { Component, OnInit, Input } from '@angular/core';
import { DetailsEventPage } from 'src/app/pages/details-event/details-event.page';
import { MapComponent } from '../map/map.component';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-custom-card-details',
  templateUrl: './custom-card-details.component.html',
  styleUrls: ['./custom-card-details.component.scss'],
})
export class CustomCardDetailsComponent implements OnInit {
  @Input() listDetailEvent : any = [];
  @Input() nameClub : string ;
  
  constructor( private detailseventPage:DetailsEventPage,
    public popoverCtrl: PopoverController,
  ) { }

  ngOnInit() {}
  //add interest to event
  presentActionSheet(id_event: number){
    this.detailseventPage.presentActionSheet(id_event);
    
  }
    //add booking
    booking(id_event:number, id_club:number,started_date_event:string){
      this.detailseventPage.booking(id_event,id_club,this.nameClub,started_date_event);
      }
      async showMap(ev: any){
        console.log('ev ',ev);
        const popover = await this.popoverCtrl.create({  
          component: MapComponent,  
          componentProps: {latitude: ev.latitude,
            longitude: ev.longitude,
            locationName: ev.location_name} ,
          event: ev,  
          animated: true,  
          showBackdrop: true,
      });  
      return await popover.present();  
      }
}
