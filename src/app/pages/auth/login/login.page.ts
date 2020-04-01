import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, MenuController } from '@ionic/angular';
import { RegisterPage } from '../register/register.page';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Router,NavigationExtras } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  isLoggedIn = false;
users = { id: '', name: '', email: '', picture: { data: { url: '' } } };
  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private userService: UserService,
    private navCtrl: NavController,
    private router: Router,
    private storage: Storage,
    private alertService: AlertService,
    private menu: MenuController,
    private fb: Facebook
  ) {
    this.menu.enable(false);
    /*fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if (res.status === 'connect') {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));*/


   }

   checkToken() {
    this.storage.get('storage').then(token => {
      console.log('check token ',token);
      if (token) {
        //test user 
        this.userService.user().subscribe(
          user => {
            console.log('func checktoken user clubs ',user.user_club_id);
            //if userclub or userinterer null
            if( user.user_club_id == null) {
              //redirect to page check list club & ineterer
    
              this.router.navigate(['/checklist']);
            }
            else {
              let navigationExtras: NavigationExtras = {
                queryParams: {
                  changeColorHome: "primary"
                  }
              };
              //redirect to dashbord
              this.router.navigate(['/home'],navigationExtras);
            }
          }
        );
   
      }
    });
  }
  ngOnInit() {
  }

  // On Register button tap, dismiss login modal and open register modal
   registerModal() {
    this.router.navigate(['/register']);
  }

  login(form: NgForm) {
    if (form.value.email == "")
    {
      this.alertService.presentToast("Email required");
    }
    else if (form.value.password == "")
    {
      this.alertService.presentToast("Password required");
    }
    else{
    this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        console.log('data login ',data);
        this.alertService.presentToast("Logged In");

      },
      error => {
        console.log(error);
        this.alertService.presentToast(error.error.message);
      },
      () => {
      //test user 
      this.userService.user().subscribe(
        user => {
          console.log(' user test ',user);
          //if userclub null
          if( user.user_club_id == null ) {
            //redirect to page check list club
            console.log('user_club_id ',user.user_club_id);
            this.router.navigate(['/checklist']);
          }
          else {
            let navigationExtras: NavigationExtras = {
              queryParams: {
                changeColorHome: "primary"
                }
            };
            //redirect to home
            this.router.navigate(['/home'],navigationExtras);
          }
        }
      );
      }
    );
  }
  }

  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        console.log('res fb',res);
        if (res.status === 'connected') {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
  }

  logout() {
    this.fb.logout()
      .then( res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }
}