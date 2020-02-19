import { Component,ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PhoneValidator } from '../../validators/phone.validator';
import { PasswordValidator } from '../../validators/password.validator';
import { CountryPhone } from './country-phone.model';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {

  firstname: string;
  lastname: string;
  email: string;
  tel: any;
  
  
  user: User;

  countries: Array<any>;
  constructor(
      private userService: UserService,
      private alertService: AlertService,
      public formBuilder: FormBuilder,
      private router: Router
  ) { 
    this.getUser();
  }

 
  ionViewWillEnter() {


    //list country
    this.countries = [
      new CountryPhone('TN', 'Tunisie'),
      new CountryPhone('UY', 'Uruguay'),
      new CountryPhone('US', 'United States'),
      new CountryPhone('BR', 'Brasil')
    ];




  }


getUser(){
  this.userService.user().subscribe(
    user => {
      this.user = user;
      this.firstname = user.first_name;
      this.lastname = user.last_name;
      this.email = user.email;
      this.tel = user.tel;
      console.log('user', this.user );
    }
  );
}

updateProfile() {
  console.log("update ",this.firstname);
  console.log("update ",this.lastname);
  console.log("update ",this.email);
  console.log("update ",this.tel);

if(this.firstname !="" && this.lastname!="" && this.email !="" && this.tel !=""){
  
  this.userService.UpdateProfile(this.firstname, this.lastname,this.tel).subscribe(
    data => {

      this.alertService.presentToast(data['message']);
    },
    error => {
      console.log(error);
      this.alertService.presentToast(error.error.message);
    },
    () => {
      
    }
  );

}
else{
  console.log("required");
  this.alertService.presentToast("Input required");
}

  
}
}
