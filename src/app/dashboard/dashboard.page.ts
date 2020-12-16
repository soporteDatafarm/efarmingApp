import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DatabaseService } from '../services/database.service';
import { FarmsService } from '../services/farms.service';
import { InitializeService } from '../services/initialize.service';
import { DownloadInfoService } from '../services/download-info.service';
import { InformacionInicial } from '../models/informacionInicial';
import { AssignedFarm } from '../models/assignedFarm';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  providers: [FarmsService, InitializeService]
})
export class DashboardPage implements OnInit {
  public authToken: any;
  numAssignedFarms: number = 0;
  email: string = '';
  loading: any;
  lotes: number = 0;
  lotesCafe: number = 0;
  haCafe: number = 0;
  lotesOtros: number = 0;
  haOtros: number = 0;
  
  constructor(
    public _farmsService: FarmsService,
    public _initializeService: InitializeService,
    private databaseService: DatabaseService,
    private downloadInfo: DownloadInfoService,
    private storage: Storage,
    public loadingController: LoadingController
  ) {

  }

  informacionInicial: InformacionInicial[] = [];
  assignedFarms: AssignedFarm[] = [];

  ngOnInit() {
    

    this.databaseService.dbReady.subscribe((rdy) =>{
      if(rdy){
        console.log("Entro al if del rdy");
        this.loadData()
        //this.loadInitInfo()
      }
      else{
        this.presentLoading('Descargando datos',60000);
        console.log("Entro al else del rdy");
        //this.cancelSubs();

        this.storage.get('autori').then((val) => {
          this.authToken = val;
          this._initializeService.initialize(this.authToken).subscribe(
            response => {
              this.downloadInfo.downloadAllInitialInfo(response).then((val) => {
                if(val){
                  //this.loading.dismiss();
                }
              })
              .catch((err) =>{
                console.log(err)
              })
            },
            error => {
              console.log(error);
            }
          );

          this._initializeService.initializeInfo(this.authToken).subscribe(
            response => {
              let informacionInicial = new InformacionInicial(response.id,response.sub,response.role,response.fullname);
              this.email = response.sub;
              this.databaseService.syncInformacionInicial(informacionInicial)
              this._farmsService.byTechnician(response.id).subscribe(
                response => {
                  this.downloadInfo.downloadAssignedFarms(response)
                  this.numAssignedFarms = response.length
                },
                error => {
                  console.log(error);
                }
              );
            },
            error => {
              console.log(error);  
            }
          );
        });

      }
    });

  }


  async presentLoading(message: string,duration: number) {
    this.loading = await this.loadingController.create({
      message,
      duration
    });
    return this.loading.present();
  }

  async loadData(){
    this.assignedFarms = await this.databaseService.loadAssignedFarms();
    this.numAssignedFarms = this.assignedFarms.length;
    this.informacionInicial = await this.databaseService.loadInformacionInicial();
    this.email = this.informacionInicial[0].sub;
    this.lotes =  await this.databaseService.searchAllPlantations();
    this.lotesCafe = await this.databaseService.searchCoffeePlantations();
    this.haCafe = await this.databaseService.searchCoffeeHa();
    let totalHa = await this.databaseService.searchTotalHa();
    this.haOtros = (totalHa - this.haCafe);
    this.lotesOtros = (this.lotes - this.lotesCafe);
  }



}
