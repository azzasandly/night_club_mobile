import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPageRoutingModule } from './event-routing.module';

import { EventPage } from './event.page';
import { CustomCardComponent } from 'src/app/components/custom-card/custom-card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventPageRoutingModule
  ],
  entryComponents: [CustomCardComponent],
  declarations: [EventPage, CustomCardComponent]
})
export class EventPageModule {}
