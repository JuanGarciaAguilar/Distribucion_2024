import {  HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GlobalConstants } from '../Models/GlobalConstants';
import { CompraDetalleModel, CompraModel, CostosEntity } from '../Models/ComprasModel';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private _http = inject(HttpClient);
  private _auth = inject(AuthService);

constructor() { }


insertNewCompra(compra: CompraModel): any {
  return this._http.post(GlobalConstants.Compra + 'insert', compra, this._auth.getHeader());
}

getComprasAll(): any {
  return this._http.get(GlobalConstants.Compra, this._auth.getHeader());
}


getComprasid(id : number) {
  return this._http.get(GlobalConstants.CompraDetalle + 'Detalle/' + id, this._auth.getHeader());
}

getComprasById(id : number) {
  return this._http.get(GlobalConstants.Compra + 'compra/' + id, this._auth.getHeader());
}

getComprasMax(id: number, unidad: string): any {
  return this._http.get(GlobalConstants.CompraDetalle + 'DetalleMax/' + id + '/' + unidad, this._auth.getHeader());
}

updateCompraDetalle(CompraDetalle: CompraDetalleModel): any {
  return this._http.post(GlobalConstants.CompraDetalle + 'update', CompraDetalle, this._auth.getHeader());
}

insertCompraDetalle(CompraDetalle: CompraDetalleModel): any {
  return this._http.post(GlobalConstants.CompraDetalle + 'InsertDetalle', CompraDetalle, this._auth.getHeader());
}

InsertCostos(costos: CostosEntity): any {
  return this._http.post(GlobalConstants.CompraDetalle + 'InsertCostos', costos, this._auth.getHeader());
}


deleteCompraDetalle(id : number): any {
  return this._http.delete(GlobalConstants.CompraDetalle + 'DeleteDetalle/' + id, this._auth.getHeader());
}

getVentasAll(): any {
  return this._http.get(GlobalConstants.Compra + 'Venta', this._auth.getHeader());
}


updateCompra(compra: CompraModel): any {
  return this._http.post(GlobalConstants.Compra + 'update', compra, this._auth.getHeader());
}

updateCompraFechas(compra: CompraModel): any {
  return this._http.post(GlobalConstants.Compra + 'updateFechas', compra, this._auth.getHeader());
}

confirmarCompra(compra: CompraModel): any {
  return this._http.post(GlobalConstants.Compra + 'confirmar', compra, this._auth.getHeader());
}


deleteCompraById(id : number): any {
  return this._http.get(GlobalConstants.Compra + 'delete/' + id, this._auth.getHeader());
}


deleteCompraProductoById(ProductiId:number): any {
  return this._http.get(GlobalConstants.Compra + 'deletepc/' + ProductiId, this._auth.getHeader());
}


getCompraSaldoAnterior(ProductiId : number, ProveedorId :number): any {
  return this._http.get(GlobalConstants.Compra + 'saldo/' + ProductiId + '/' + ProveedorId, this._auth.getHeader());
}

getReporteCompras(fIni : string, fFin : string, ProveedorId : string): any {
  return this._http.get(GlobalConstants.Compra + 'reporte/' + fIni + '/' + fFin + '/' + ProveedorId, this._auth.getHeader());
}}
