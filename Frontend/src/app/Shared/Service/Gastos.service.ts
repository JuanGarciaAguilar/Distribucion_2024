import {  HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GlobalConstants } from '../Models/GlobalConstants';
import { GastosModel } from '../Models/GastosModel';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
    private _http = inject(HttpClient);
    private _auth = inject(AuthService);
constructor() { }


insertNewGasto(gasto: GastosModel): any {
    return this._http.post(GlobalConstants.Gastos + 'insert', gasto, this._auth.getHeader());
  }


  updateGasto(gasto: GastosModel): any {
    return this._http.post(GlobalConstants.Gastos  + 'update', gasto, this._auth.getHeader());
  }


  getGastosAll(): any {
    return this._http.get(GlobalConstants.Gastos, this._auth.getHeader());
  }

  getGastosHastaHoy(): any {
    return this._http.get(GlobalConstants.Gastos  + 'toHoy', this._auth.getHeader());
  }

  getGastosHastaHoyFechas(FInicio :string): any {
    return this._http.get(GlobalConstants.Gastos  + 'GetGastoFechas/' + FInicio, this._auth.getHeader());
  }

  getGastoDetalleById(id : number): any {
    return this._http.get(GlobalConstants.Gastos + id, this._auth.getHeader());
  }

  deleteGastoById(id : number): any {
    return this._http.get(GlobalConstants.Gastos  + 'delete/' + id, this._auth.getHeader());
  }


}
