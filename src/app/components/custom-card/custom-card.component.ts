import { Component, OnInit, Input } from '@angular/core';
import { NavExtrasServiceService } from 'src/app/services/navigation/nav-extras-service.service';
import { EventPage } from 'src/app/pages/event/event.page';


@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.scss'],
})
export class CustomCardComponent implements OnInit {
  @Input() listEvent : any = [];
  @Input() listProgram : any = [];
  @Input() listPromos : any = [];
  @Input() nameClub : string ;
  id_club: number = 0;

  constructor( private navExtras: NavExtrasServiceService,
    private eventPage:EventPage,
    ) { }

  ngOnInit() {}

  trimString(string, length) {
    return string.length > length
      ? string.substring(0, length) + "..."
      : string;
  }

  detailEvent(levent: any ){
    this.eventPage.detailEvent(levent,this.nameClub);
  }
  //add interest to event
  presentActionSheet(id_event: number){
    this.eventPage.presentActionSheet(id_event);
  }
  //add booking
  booking(id_event:number, id_club:number,started_date_event:string){
    this.eventPage.booking(id_event,id_club,this.nameClub,started_date_event);
    }
}
