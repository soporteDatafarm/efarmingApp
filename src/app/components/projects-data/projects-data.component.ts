import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Project } from '../../models/project'

@Component({
  selector: 'app-projects-data',
  templateUrl: './projects-data.component.html',
  styleUrls: ['./projects-data.component.scss'],
})
export class ProjectsDataComponent implements OnInit {

  projects: Project [] = []

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
    this.databaseService.searchProjects(this._farmId).then((values) => {
      if(values != null && values != undefined){
        this.projects = values
      }
    }).catch((error) => {
      console.log(error)
    });
  }

}
