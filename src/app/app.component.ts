import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth/auth.service';
import { AlertService } from './services/alert.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
    title: 'Profile',
    url: '/profile',
    icon: 'person'
  },



  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    private menu: MenuController,
    private router: Router,
  ) {
    this.initializeApp();
    this.menu.enable(false);
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      // Commenting splashScreen Hide, so it won't hide splashScreen before auth check
      //this.splashScreen.hide();
      this.authService.getToken();
    
    });
  }

    // When Logout Button is pressed 
    logout() {
      this.authService.logout().subscribe(
        data => {
          this.alertService.presentToast(data['message']);   
          this.router.navigate(['/login']);   
          this.menu.enable(false);  
        },
        error => {
          console.log(error);
        },
        () => {

        }
      );
      }  
}
