import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DataService {
  //private API: string = 'http://localhost:51628/api/';
  private API: string = 'http://distribucion2.azurewebsites.net/api/api/';

  constructor(private http: HttpClient, private router: Router) { }

  getAllProducts() {
    return this.http.get(this.API + 'Producto');
  }


}

