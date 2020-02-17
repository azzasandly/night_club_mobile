import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
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

  constructor(private modalController: ModalController,
    private authService: AuthService,
    private userService: UserService,
    private navCtrl: NavController,
    private router: Router,
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
  async loginModal() {
    const loginModal = await this.modalController.create({
      component: LoginPage,
    });
    return await loginModal.present();
  }
  register(values) {
    console.log(values);
    this.authService.register(values.name, values.lastname, values.country_phone.phone, values.email, values.matching_passwords.password).subscribe(
      data => {
        this.authService.login(values.email, values.matching_passwords.password).subscribe(
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
            //if userclub or userinterer null
            if( ((user.user_club_id == null) || (user.user_center_interest_id == null)) || ((user.user_club_id == null) && (user.user_center_interest_id == null)) ) {
              //redirect to page check list club & ineterer
              this.router.navigate(['/checklist']);
            }
            else {
              //redirect to dashbord
              this.router.navigate(['/dashboard']);
            }
          }
        );
          }
        );
        //success create user
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