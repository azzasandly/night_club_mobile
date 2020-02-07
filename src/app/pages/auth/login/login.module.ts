import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { RegisterPage } from '../register/register.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginPageRoutingModule
  ],
  declarations: [LoginPage, RegisterPage],
  entryComponents: [LoginPage, RegisterPage]
})
export class LoginPageModule {}
