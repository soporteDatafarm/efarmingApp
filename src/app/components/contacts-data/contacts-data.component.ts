import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Contact } from '../../models/contact';

@Component({
  selector: 'app-contacts-data',
  templateUrl: './contacts-data.component.html',
  styleUrls: ['./contacts-data.component.scss'],
})
export class ContactsDataComponent implements OnInit {
  contacts: Contact [] = []

  private _farmId: string;

  @Input() 
  set farmId(value: string){
    this._farmId = value;
    this.onFarmChange()
  }
  get farmId(): string {
    return this._farmId;
  }

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {}

  onFarmChange(){
    this.databaseService.searchContacts(this._farmId).then((values) => {
      if(values != null && values != undefined){
        this.contacts = values
        console.log(values)
      }
    }).catch((error) => {
      console.log(error)
    });
  }

}
