import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Productivity } from '../../models/productivity';
import { Plantation } from '../../models/plantation';
import { PlantationNames, PlantationIds, PlantationView } from '../../models/plantations.interface';

@Component({
  selector: 'app-productivity-data',
  templateUrl: './productivity-data.component.html',
  styleUrls: ['./productivity-data.component.scss'],
})
export class ProductivityDataComponent implements OnInit {
  productivity: Productivity = new Productivity('','','','','','',0,'',0,0,0,0,'',0,0,0,'',0,0,0,'',0,'');
  plantations: Plantation[] = [];
  plantationsView: PlantationView [] = [];

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
    
  }

  onFarmChange(){
    this.databaseService.searchProductivityById(this._farmId).then((val) => {
      if(val != null && val != undefined){
        console.log(val)
        this.productivity = val;
      }
      else{
        this.productivity = new Productivity('','','','','','',0,'',0,0,0,0,'',0,0,0,'',0,0,0,'',0,'');
      }
    }).catch((error) => {
      console.log(error)
    });

    this.databaseService.searchPlantations(this._farmId).then((val) => {
      if(val != null && val != undefined){
        //console.log(val)
        this.plantations = val;
        for (let i = 0; i < this.plantations.length; i++) {
          let plantationView: PlantationView;
          let plantationIds : PlantationIds = { 
            plantationTypeId: this.plantations[i].plantationTypeId,
            plantationVarietyId: this.plantations[i].plantationVarietyId
          }
          this.databaseService.searchPlantationNames(plantationIds).then((values) => {
            return values;
          }).then((names) => {
            plantationView = {
              plantationNames: names,
              hectares: this.plantations[i].hectares,
              estimatedProduction: this.plantations[i].estimatedProduction,
              age: this.plantations[i].age,
              numberOfPlants: this.plantations[i].numberOfPlants
            }
            this.plantationsView.push(plantationView);
          }).catch((error) => {
            console.log(error);
          })
          
        }
      }
      else{
        this.plantations = []
      }
    }).catch((error) => {
      console.log(error)
    })
  }

}
