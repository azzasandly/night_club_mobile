import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, PopoverController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ClubService } from 'src/app/services/club/club.service';
import { Map, latLng, tileLayer, Layer, marker, icon } from 'leaflet';
import { MapComponent } from 'src/app/components/map/map.component';

@Component({
  selector: 'app-club',
  templateUrl: './club.page.html',
  styleUrls: ['./club.page.scss'],
})
export class ClubPage   {
  club: any = [];
  id_club: number = 0;
  location: any = [];
  listoption: any = [];
  nameClub: String;
  showMore:boolean =false;
  map: Map;

  constructor(
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private navCtrl: NavController,
    public popoverCtrl: PopoverController
    ) { 

    }
    ionViewWillEnter() {
      this.listoption = [
        {
            "image": "event.jpg",
            "name": "Event"
        },
        {
          "image": "promos.jpg",
          "name": "Promos"
      },
      {
        "image": "menu.jpg",
        "name": "Menu"
      },
      ];
          this.showClub();
    }

     async showMap(ev: any){
      console.log('loc club ',this.location.location_name);
      const popover = await this.popoverCtrl.create({  
        component: MapComponent,  
        componentProps: {latitude: this.location.latitude,
                          longitude: this.location.longitude,
                          locationName: this.location.location_name
        } ,
        event: ev,  
        animated: true,  
        showBackdrop: true,
    });  
    return await popover.present();  
    }




  showClub(){
    //get id club from params
    this.route.queryParams.subscribe((res)=>{
      this.id_club = res['idclub'];
  });
    //get details club
    this.clubService.showClub(this.id_club).subscribe(
      data => {
        console.log('data club ',data);
        this.club = data;
        this.nameClub = this.club['name'];
        console.log('name club ',this.nameClub);
        this.location = this.club.location;
        console.log('club location ',this.location);
      },
      error => {
        console.log(error);
        this.alertService.presentToast(error.error.message);
      },
      () => {
        
      }
    );
  }

  showOption(option: String){
    console.log('op ', option);
    console.log('op ', this.id_club);
    if (option == "Event"){
      //get list event 
      console.log('in event ');
      //send id club in params
    let navigationExtras: NavigationExtras = {
      queryParams: {
          idclub: this.id_club,
          name: this.nameClub
        }
  };
    //navigate to page event
    this.router.navigate(['/event'],navigationExtras);

    }
    else if (option == "Promos"){
      //get list promos
      console.log('in promos ');
    }
    else{
      //get list menu
      console.log('in menu ');
    }

  }

}
