import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FarmsSearchPageRoutingModule } from './farms-search-routing.module';

import { FarmsSearchPage } from './farms-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FarmsSearchPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FarmsSearchPage]
})
export class FarmsSearchPageModule {}
