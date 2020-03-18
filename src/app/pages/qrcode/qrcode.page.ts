import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { CheckinService } from 'src/app/services/checkin/checkin.service';
import { AlertService } from 'src/app/services/alert.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage  {

  scanSubscription;
  qrScan:any;
  lat:any;
  lng:any;
  location:any;
  constructor(private qrScanner: QRScanner,
    private router: Router,
    public Platform: Platform,
    private checkinService: CheckinService,
    private alertService: AlertService,
    private geolocation: Geolocation,
    ) {
      
     this.Platform.backButton.subscribeWithPriority(0,()=>{
        document.getElementsByTagName("body")[0].style.opacity = "1";
        this.qrScan.unsubscribe();
      });


     }
     ionViewDidEnter() {

       
   }
     ionViewDidLoad(){  
     
     }
     ionViewWillEnter() {
    //get location user
    this.getLocation();
    }
    ionViewWillLeave() {
    }
getLocation(){

          this.geolocation.getCurrentPosition().then((resp) => {
            // resp.coords.latitude
            // resp.coords.longitude
            console.log("geo loc ",JSON.stringify({latitude: resp.coords.latitude,
              longitude: resp.coords.longitude}));
    
            this.lat=resp.coords.latitude;
            this.lng=resp.coords.longitude;
            this.location=JSON.stringify({latitude: resp.coords.latitude,
              longitude: resp.coords.longitude});

            console.log("geo loc lat ",this.lat);
            console.log("geo loc lng ",this.lng);
            console.log("geo location ",this.location);

           }).catch((error) => {
             console.log('Error getting location', error);
           });
}

  statScanning(){

    // Optionally request the permission early
  this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
    if (status.authorized) {
      this.qrScanner.show();

      document.getElementsByTagName("body")[0].style.opacity = '0';

      this.qrScan = this.qrScanner.scan().subscribe((text: string) => {
        document.getElementsByTagName("body")[0].style.opacity = "1";

        this.qrScan.unsubscribe(); // stop scanning
        console.log('Scanned something', text);

        this.alertService.presentToast(text);
        this.checkin(text,this.location);

      },(err)=>{
        console.log(JSON.stringify(err));
      });

    } else if (status.denied === true) {
      // camera permission was permanently denied
      // you must use QRScanner.openSettings() method to guide the user to the settings page
      // then they can grant the permission from there

      console.log('denied true');
    } else if (status.authorized === false){
      // permission was denied, but not permanently. You can ask for permission again at a later time.
      console.log('authorized false');
      }
  })
  .catch((e: any) => console.log('Error is', e));

  }
   

    //verify qrcode content & checkin
  checkin(content,location){
    this.checkinService.checkin(content,
      location).subscribe(
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
