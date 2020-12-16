import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitializeService {

  public url: string;

  constructor(
    private _http: HttpClient
  ) {
    //this.url = 'https://cors-anywhere.herokuapp.com/http://api.efarming.sandbox.datafarm.com.co/'
    //this.url = 'http://api.efarming.sandbox.datafarm.com.co/'
    this.url = 'http://localhost:3000/'
  }

  initializeInfo(userToken): Observable<any>{
    let authorizationToken = 'Bearer '+ userToken;
    let headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*','Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT', 'Accept':'application/json', 'Content-Type': 'application/x-www-form-urlencoded','Cache-Control': 'no-cache', 'Authorization': authorizationToken});
    //return this._http.get(this.url+'initializedata/info',{ headers: headers});
    return this._http.get(this.url+'info');
  }

  initialize(userToken): Observable<any>{
    let authorizationToken = 'Bearer '+ userToken;
    let headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*','Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT', 'Accept':'application/json', 'Content-Type': 'application/x-www-form-urlencoded','Cache-Control': 'no-cache', 'Authorization': authorizationToken});
    //return this._http.get(this.url+'initializedata',{ headers: headers});
    return this._http.get(this.url+'initializedata');
  }


}
