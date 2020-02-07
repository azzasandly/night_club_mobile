import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsEventPageRoutingModule } from './details-event-routing.module';

import { DetailsEventPage } from './details-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsEventPageRoutingModule
  ],
  declarations: [DetailsEventPage]
})
export class DetailsEventPageModule {}
