import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmsService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    //this.url = 'http://api.efarming.sandbox.datafarm.com.co/farms/'
    //this.url = 'https://cors-anywhere.herokuapp.com/http://api.efarming.sandbox.datafarm.com.co/farms/'
    this.url = 'http://localhost:3000/'
   }

  list(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+'list',{ headers: headers});
  }

  byTechnician(technicianId): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //return this._http.get(this.url+'bytechnician/'+technicianId,{ headers: headers});
    return this._http.get(this.url+'bytechnician');
  }
  
  syncId(farmId): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //return this._http.get(this.url+'sync/'+farmId,{ headers: headers});
    return this._http.get(this.url+'farmSync');
  }

}
