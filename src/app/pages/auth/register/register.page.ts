import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { LoginPage } from '../login/login.page';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgForm} from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { Router,NavigationExtras } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PhoneValidator } from '../../../validators/phone.validator';
import { PasswordValidator } from '../../../validators/password.validator';
import { CountryPhone } from '../../profile/country-phone.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  matching_passwords_group: FormGroup;
  country_phone_group: FormGroup;

  countries: Array<any>;
  genders: Array<string>;
  postDataregister:any;
  phone_number:string;


  constructor(private modalController: ModalController,
    private authService: AuthService,
    private userService: UserService,
    private navCtrl: NavController,
    private router: Router,
    public alertController: AlertController,
    private alertService: AlertService,
    public formBuilder: FormBuilder,
  ) { }
  ngOnInit() {

    //list country
    this.countries = [
      new CountryPhone('TN', 'Tunisie'),
      new CountryPhone('UY', 'Uruguay'),
      new CountryPhone('US', 'United States'),
      new CountryPhone('BR', 'Brasil')
    ];
    //list genders
    this.genders = [
      "Male",
      "Female"
    ];

    this.matching_passwords_group = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areEqual(formGroup);
    });

    let country = new FormControl(this.countries[0], Validators.required);
    let phone = new FormControl('', Validators.compose([
      Validators.required,
      PhoneValidator.validCountryPhone(country)
    ]));
    this.country_phone_group = new FormGroup({
      country: country,
      phone: phone
    });
    //validate  form
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      gender: new FormControl(this.genders[0], Validators.required),
      country_phone: this.country_phone_group,
      matching_passwords: this.matching_passwords_group,
     
    });
  }

  //error message
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

  // On Login button tap, dismiss Register modal and open login Modal
   loginModal() {
    this.router.navigate(['/login']);
  }

  register(values) {
  
    console.log(values);
    let code_country =values.country_phone.country.code;
    let phone = values.country_phone.phone;
    this.phone_number = code_country + phone;
    console.log("phone_number ",this.phone_number);

    //send code
    this.authService.sendSms(this.phone_number).subscribe(
      data => {

      this.alertService.presentToast(data['message']);
        
      },
      error => {

        console.log(error);
        this.alertService.presentToast(error.error.message);
      },
      () => { 
      // show alert prompt to use code received

      this.presentAlertCode(values.name,
        values.lastname,
        this.phone_number,
        values.email,
        values.matching_passwords.password
        );
        
      }  

      );

  }



  async presentAlertCode(name,
    lastname,
    phone_number,
    email,
    password)
     {
    const alertCode = await this.alertController.create({
      header: 'Verification code',
      inputs: [
        {
          name: 'code',
          placeholder: 'Enter the code received in your phone',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: data => {
            if (data.code) {
            console.log('Code',data.code);
            console.log('phone_number ',phone_number);
            //verification code
            this.authService.verifyPhone(data.code,
              name,
              lastname,
              phone_number,
              email,
              password
            ).subscribe(
              data => {
        
              this.alertService.presentToast(data['message']);
                
              },
              error => {
        
                console.log(error);
                this.alertService.presentToast(error.error.message);
              },
              () => { 
                //login
                this.login(email,password);
              }  
              );

            }
            //input empty
            else{
              this.alertService.presentToast('Input code is empty');
            }

          }
        }
      ]
    });
   await alertCode.present(); 
}


//function login
login(email,password){

  this.authService.login(email, password).subscribe(
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