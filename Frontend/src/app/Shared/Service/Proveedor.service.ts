import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GlobalConstants } from '../Models/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

    private _http = inject(HttpClient);
    private _auth = inject(AuthService);

constructor() { }


getProveedoresAll(): any {
    return this._http.get(GlobalConstants.Proveedor,this._auth.getHeader());
  }


  getProveedoresAllCiudad(): any {
    return this._http.get(GlobalConstants.Proveedor +'ProveedorCiudad',this._auth.getHeader());
  }
/* 
  getProveedoresAllCiudad(): any {
    return this.httpClient.get(this.API + 'Proveedor/ProveedorCiudad');
    // return this.httpClient.get(this.API + 'Proveedor/GetProveedorAll');
  }


  getAllInsertCiudad(ciudad: Ciudad): any {
    return this._http.post(this.API + 'Ciudad/InsertCiudad',ciudad ,httpOptions);
  }

  getAllUpdateCiudad(ciudad: Ciudad): any {
    return this._http.post(this.API + 'Ciudad/UpdateCiudad',ciudad ,httpOptions);
  } */
}
