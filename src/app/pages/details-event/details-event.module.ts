import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsEventPageRoutingModule } from './details-event-routing.module';

import { DetailsEventPage } from './details-event.page';
import { CustomCardDetailsComponent } from 'src/app/components/custom-card-details/custom-card-details.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsEventPageRoutingModule
  ],
  entryComponents: [CustomCardDetailsComponent],
  declarations: [DetailsEventPage, CustomCardDetailsComponent]
})
export class DetailsEventPageModule {}
