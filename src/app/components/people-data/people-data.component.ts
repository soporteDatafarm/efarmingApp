import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { FamilyMember } from '../../models/familyMember';

@Component({
  selector: 'app-people-data',
  templateUrl: './people-data.component.html',
  styleUrls: ['./people-data.component.scss'],
})
export class PeopleDataComponent implements OnInit {
  familyMembers: FamilyMember[] = [];

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
    this.databaseService.searchFamilyMembers(this._farmId).then((values) => {
      if(values != null && values != undefined){
        this.familyMembers = values
      }
    }).catch((error) => {
      console.log(error)
    });
  }

}
