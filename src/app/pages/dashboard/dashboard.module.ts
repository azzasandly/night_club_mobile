import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { CustomTabsComponent } from 'src/app/components/custom-tabs/custom-tabs.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  entryComponents: [CustomTabsComponent],
  declarations: [DashboardPage, CustomTabsComponent]
})
export class DashboardPageModule {}
