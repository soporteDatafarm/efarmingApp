import { Component, OnInit } from '@angular/core';
import { Farm } from '../models/farm';
import { GroupedFertilizer } from '../models/fertilizer';
import { GroupedInvoice } from '../models/invoice';
import { Productivity } from '../models/productivity';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-farm',
  templateUrl: './farm.page.html',
  styleUrls: ['./farm.page.scss'],
})
export class FarmPage implements OnInit {

  tab: string = 'basic-data';
  farms: Farm[] = [];
  selectedFarm: string;
  productivity: Productivity = new Productivity('','','','','','',0,'',0,0,0,0,'',0,0,0,'',0,0,0,'',0,'');
  groupedInvoices: GroupedInvoice = new GroupedInvoice(0,0,0,0,'');
  groupedFertilizers: GroupedFertilizer = new GroupedFertilizer(0,0,0,0,'');


  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.databaseService.getFarms().subscribe(farms => {
      this.farms = farms;
    })

  }

  onSelectedFarm(){
    this.databaseService.searchProductivityById(this.selectedFarm).then((val) => {
      if(val != null && val != undefined){
        this.productivity = val;
      }
      else{
        this.productivity = new Productivity('','','','','','',0,'',0,0,0,0,'',0,0,0,'',0,0,0,'',0,'');
      }
    });
    this.databaseService.searchGroupedFertilizers(this.selectedFarm).then((val) => {
      if(val != null && val != undefined){
        this.groupedFertilizers = val;
      }
      else{
        this.groupedFertilizers = new GroupedFertilizer(0,0,0,0,'');
      }
    });
    this.databaseService.searchGroupedInvoices(this.selectedFarm).then((val) => {
      if(val != null && val != undefined){
        this.groupedInvoices = val;
      }
      else{
        this.groupedInvoices = new GroupedInvoice(0,0,0,0,'');
      }
    });
  }


  changeTab(tab: string){
    this.tab = tab;
  }


}
