import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photos-data',
  templateUrl: './photos-data.component.html',
  styleUrls: ['./photos-data.component.scss'],
})
export class PhotosDataComponent implements OnInit {

  private _farmId: string;

  @Input() 
  set farmId(value: string){
    this._farmId = value;
    //this.onFarmChange()
  }
  get farmId(): string {
    return this._farmId;
  }

  constructor() { }

  ngOnInit() {}

}
