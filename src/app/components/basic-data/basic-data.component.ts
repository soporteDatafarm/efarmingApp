import { Component, OnInit, Input } from '@angular/core';
import { Department } from '../../models/department';
import { Municipality } from '../../models/municipality';
import { Village } from '../../models/village';
import { Farm } from '../../models/farm';
import { Ownership } from '../../models/ownership';
import { Cooperative } from '../../models/cooperative';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-basic-data',
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.scss'],
})
export class BasicDataComponent implements OnInit {
  departments: Department[] = [];
  municipalities: Municipality[] = [];
  villages: Village[] = [];
  ownershipTypes: Ownership[] = [];
  cooperatives: Cooperative[] = []
  selectedDepartment: string = '';
  selectedMunicipality: string = '';
  selectedVillage: string = '';
  selectedVillageId: string = '';
  selectedOwnershipType: string = '';
  selectedCooperative: string = '';
  farm : Farm = new Farm('','','','','','','','',0,0,'',0,0,'',0,0,'','','','','','','');
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

  ngOnInit() {
    this.departments = this.databaseService.loadDepartments();
    this.municipalities = this.databaseService.loadMunicipalities();
    this.ownershipTypes = this.databaseService.loadOwnershipTypes();
    this.cooperatives = this.databaseService.loadCooperatives();
  }

  onSelectedMunicipality(){
    this.villages = this.databaseService.searchVillages(this.farm.municipalityId);
  }

  onFarmChange(){
    this.databaseService.searchFarmById(this._farmId).then((farm) => {
      if(farm != null && farm != undefined){
        console.log("Finca que se carga:")
        console.log(farm)
        
        this.farm = farm;
        this.databaseService.searchBasicDataNames(farm).then((values)=>{
          this.selectedDepartment = values[0];
          this.selectedMunicipality = values[1];
          this.selectedVillage = values[2];
          this.selectedOwnershipType = values[3];
          this.selectedCooperative = values[4];
        })
      }
      else{
        //this.farm = new Farm('','','','','','','','',0,0,'',0,0,'',0,0,'','','','','','','');
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  onSave(){
    /*this.farm.departmentId = this.selectedDepartment;
    this.farm.municipalityId = this.selectedMunicipality;
    this.farm.villageId = this.selectedVillage;
    this.farm.ownershipTypeId = this.selectedOwnershipType;
    this.farm.cooperativeId = this.selectedCooperative; Esto ya se encontraba comentado*/
    if(this.selectedVillageId != null && this.selectedVillageId != "" && this.selectedVillageId != undefined){
      this.farm.villageId = this.selectedVillageId;
    }
    console.log('asi debera cambiar la finca')
    console.log(this.farm)
  }

}
