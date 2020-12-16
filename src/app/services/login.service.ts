import { User } from './../models/user';

import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserToken } from '../models/IUserToken.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url = 'https://cors-anywhere.herokuapp.com/http://api.efarming.sandbox.datafarm.com.co/token';
  //public url = 'http://api.efarming.sandbox.datafarm.com.co/token';

  constructor(
    private _http: HttpClient,
    private plt: Platform,
    private router: Router
  ) {
    //this.url = 'https://cors-anywhere.herokuapp.com/http://api.efarming.sandbox.datafarm.com.co/token'
    //this.url = 'http://api.efarming.sandbox.datafarm.com.co/token'
  }


  signIn(user:User){
    
    const path = `grant_type=password&username=${encodeURI(user.username)}&password=${user.password}`;
    
    const headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*','Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT', 'Accept':'application/json', 'Content-Type': 'application/x-www-form-urlencoded','Cache-Control': 'no-cache'}); 
     
    return this._http.post<IUserToken>(this.url,path, {headers: headers});
      
  }

}
