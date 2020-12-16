import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AssignedFarm } from '../models/assignedFarm';
import { Department } from '../models/department';
import { Municipality } from '../models/municipality';
import { Village } from '../models/village';
import { DatabaseService } from '../services/database.service';
import { DownloadInfoService } from '../services/download-info.service';
import { FarmsService } from '../services/farms.service';
import { Router } from '@angular/router';
import { Farm } from '../models/farm';


@Component({
  selector: 'app-farms-search',
  templateUrl: './farms-search.page.html',
  styleUrls: ['./farms-search.page.scss'],
  providers: [FarmsService]
})
export class FarmsSearchPage implements OnInit {
  departments: Department[] = [];
  municipalities: Municipality[] = [];
  villages: Village[] = [];
  resultsFarms: AssignedFarm[] = [];
  selectedFarms: AssignedFarm[] = [];
  selectedDepartment: string;
  selectedMunicipality: string;
  selectedVillage: string;
  searchName: string;
  searchCode: string;
  loading: any;

  constructor(
    public _farmsService: FarmsService,
    private databaseService: DatabaseService,
    private downloadInfo: DownloadInfoService,
    private router: Router,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.departments = this.databaseService.loadDepartments();
    this.municipalities = this.databaseService.loadMunicipalities();
    //this.villages = this.databaseService.loadVillages();
    //this.resultsFarms = this.databaseService.searchFarms(this.key,this.val);
    //this.selectedFarms = this.databaseService.loadAssignedFarms();
  }

  onSelectedMunicipality(){
    this.villages = this.databaseService.searchVillages(this.selectedMunicipality);
  }

  onSubmit(){
    let sql: string = '';

    if(this.nullComprobation(this.selectedDepartment)){   
      if(sql.length == 0){
        sql = 'SELECT * FROM AssignedFarms WHERE DepartmentId="'+this.selectedDepartment+'"'; 
      }
      else{
        sql += ' AND DepartmentId="'+this.selectedDepartment+'"';
      }
    }

    if(this.nullComprobation(this.selectedMunicipality)){   
      if(sql.length == 0){
        sql = 'SELECT * FROM AssignedFarms WHERE MunicipalityId="'+this.selectedMunicipality+'"'; 
      }
      else{
        sql += ' AND MunicipalityId="'+this.selectedMunicipality+'"';
      }
    }

    if(this.nullComprobation(this.selectedVillage)){
      if(sql.length == 0){
        sql = 'SELECT * FROM AssignedFarms WHERE VillageId="'+this.selectedVillage+'"';
      }
      else{
        sql += ' AND VillageId="'+this.selectedVillage+'"';
      }
    }

    if(this.nullComprobation(this.searchName)){
      if(sql.length == 0){
      sql = 'SELECT * FROM AssignedFarms WHERE Name LIKE"%'+this.searchName.toUpperCase()+'%"';
      }
      else{
        sql += ' AND Name LIKE"%'+this.searchName.toUpperCase()+'%"';
      }
    }

    if(this.nullComprobation(this.searchCode)){
      sql = 'SELECT * FROM AssignedFarms WHERE Code='+this.searchCode;
    }

    if(sql != '' && sql != null){
      console.log("Este es el sql que se arma: ");
      console.log(sql);
      this.resultsFarms = this.databaseService.searchAssignedFarms(sql);
      this.selectedDepartment = '';
      this.selectedMunicipality = '';
      this.selectedVillage = '';
      this.searchCode = '';
      this.searchName = '';
    }
    else{
      alert("Almenos un campo debe ser llenado");
      //alert("Almenos un campo debe ser llenado"); utilizar sweetAlert
    }
  }

  nullComprobation(param: any){
    if(param != null && param != undefined && param != ''){
      return true
    }
    else {
      return false
    }
  }

  updateSelected(assignedFarm: AssignedFarm){
    console.log(assignedFarm);
    //this.changeStatePeajes(peaje);
    if(assignedFarm.selected){
      this.addSelected(assignedFarm)
    }
    else{
      this.deleteSelected(assignedFarm)
    }
  }

  addSelected(assignedFarm: AssignedFarm){
    if(!this.selectedFarms.includes(assignedFarm)){
      this.selectedFarms.push(assignedFarm);
    }
    else{
      console.log("Ya esta en el arreglo");
    }
  }

  deleteSelected(assignedFarm: AssignedFarm){
    var i = this.selectedFarms.indexOf(assignedFarm);
    if( i !== -1) {
      this.selectedFarms.splice(i,1);
    }
  }

  async downloadSelected(){    
    if (this.selectedFarms.length > 0) {
      let time = this.selectedFarms.length * 6000;
      this.presentLoading('Descargando fincas seleccionadas',time);
      await this.downloadInfo.downloadAllFarms(this.selectedFarms)
      //this.router.navigate(['farm']);
    }
  }


  async presentLoading(message: string,duration: number) {
    this.loading = await this.loadingController.create({
      message,
      duration
    });
    return this.loading.present();
  }


}
