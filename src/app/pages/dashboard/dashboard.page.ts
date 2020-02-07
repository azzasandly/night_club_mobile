import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: User;
  constructor(private menu: MenuController,
    private userService: UserService,
    private navCtrl: NavController,
    private router: Router) { 

    this.menu.enable(true);
  }
  ngOnInit() {
    
  }
  getProfile(){
    this.router.navigate(['/profile']);
  }

}