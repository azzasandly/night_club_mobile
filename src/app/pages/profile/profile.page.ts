import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage  {
  
  user: User;
  fName:string;
  lName:string;
  tel:number;


  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  countries: Array<any>;
  constructor(
      private userService: UserService,
      private alertService: AlertService,
      public formBuilder: FormBuilder,
      private router: Router
  ) { 

  }

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'lastname': [
      { type: 'required', message: 'Last name is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please wnter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm password is required.' }
    ],
    'matching_passwords': [
      { type: 'areEqual', message: 'Password mismatch.' }
    ],
  };


  ionViewWillEnter() {
    this.getUser();
    /*this.fName = this.user['first_name'];
    this.lName = this.user['last_name'];
    this.tel = this.user['tel'];*/

    //list country
    this.countries = [
      new CountryPhone('TN', 'Tunisie'),
      new CountryPhone('UY', 'Uruguay'),
      new CountryPhone('US', 'United States'),
      new CountryPhone('BR', 'Brasil')
    ];
   /* this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });*/
    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });

    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      country_phone: this.country_phone_group,
      //matching_passwords: this.matching_passwords_group,
    });

console.log('name ',this.validations_form);


  }


getUser(){
  this.userService.user().subscribe(
    user => {
      this.user = user;
      console.log('user', this.user );
    }
  );
}

updateProfile(values) {
  console.log(values);

  this.userService.UpdateProfile(values.name, values.lastname, values.country_phone.phone).subscribe(
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
}
