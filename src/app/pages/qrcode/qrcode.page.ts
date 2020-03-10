import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { CheckinService } from 'src/app/services/checkin/checkin.service';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage  {

  scanSubscription;


  constructor(private qrScanner: QRScanner,
    private router: Router,
    public Platform: Platform,
    private checkinService: CheckinService,
    private alertService: AlertService,
    ) {
      
     
      /*Platform.ready().then(() => {
        qrScanner.getStatus().then(data => {
          console.log(data);
          if (data.denied === true) {
            qrScanner.openSettings();
            window.location.reload();
          } else {
            this.qrscanner();
          }
        });
      });*/


     }
     ionViewDidEnter() {
      //this.scanCode();
       
   }
     ionViewDidLoad(){          
        //this.qrscanner();
     }
     ionViewWillEnter() {
    }
    ionViewWillLeave() {
    }



    qrscanner() {

// Optionally request the permission early
this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted
       console.log('authorized');

       this.qrScanner.useBackCamera();
    
        console.log("useBackCamera ",this.qrScanner.useBackCamera());
 
       // start scanning
       let scanSub = this.qrScanner.scan().subscribe((text: string) => {
         console.log('Scanned something', text);

         this.qrScanner.hide(); // hide camera preview
         scanSub.unsubscribe(); // stop scanning
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
