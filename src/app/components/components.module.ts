import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BasicDataComponent } from './basic-data/basic-data.component';
import { ProductivityDataComponent } from './productivity-data/productivity-data.component';
import { PeopleDataComponent } from './people-data/people-data.component';
import { ProjectsDataComponent } from './projects-data/projects-data.component';
import { PhotosDataComponent } from './photos-data/photos-data.component';
import { ContactsDataComponent } from './contacts-data/contacts-data.component';



@NgModule({
  declarations: [
    BasicDataComponent,
    ProductivityDataComponent,
    PeopleDataComponent,
    ProjectsDataComponent,
    PhotosDataComponent,
    ContactsDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  exports: [
    BasicDataComponent,
    ProductivityDataComponent,
    PeopleDataComponent,
    ProjectsDataComponent,
    PhotosDataComponent,
    ContactsDataComponent
  ]
})
export class ComponentsModule { }
