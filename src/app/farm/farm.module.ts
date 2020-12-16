import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmPageRoutingModule } from './farm-routing.module';

import { FarmPage } from './farm.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FarmPage]
})
export class FarmPageModule {}
