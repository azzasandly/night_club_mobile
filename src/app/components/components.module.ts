import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { IonicModule } from '@ionic/angular';
import { CustomTabsComponent } from './custom-tabs/custom-tabs.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [CustomHeaderComponent,
    CustomTabsComponent
  ],
  exports: [CustomHeaderComponent,
    CustomTabsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ComponentsModule { }
