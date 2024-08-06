import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';   
import { AuthService } from './auth.service';
import { GlobalConstants } from '../Models/GlobalConstants';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private _http = inject(HttpClient);
  private _auth = inject(AuthService);

  constructor() { }


  GetListaProductos():  Observable<any>  {
    return this._http.get(GlobalConstants.Producto ,this._auth.getHeader());
  }

 
}
