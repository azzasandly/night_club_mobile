import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventPageRoutingModule } from './event-routing.module';

import { EventPage } from './event.page';
import { CustomCardComponent } from 'src/app/components/custom-card/custom-card.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    EventPageRoutingModule
  ],
  entryComponents: [CustomCardComponent],
  declarations: [EventPage, CustomCardComponent]
})
export class EventPageModule {}
