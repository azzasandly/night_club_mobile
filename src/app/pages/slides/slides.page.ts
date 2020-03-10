import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage,
    private menu: MenuController,
  ) {
    this.menu.enable(false);
   }

  ngOnInit() {
  }
finish(){
  this.storage.set('complete',true);
  this.router.navigate(['/login']);
}
}
