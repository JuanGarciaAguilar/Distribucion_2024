 
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GlobalConstants } from '../Models/GlobalConstants';
import { HttpClient } from '@angular/common/http';
import { VentasModel } from '../Models/VentasModel';
import { CierreDiarioReport, CierreDiarioReportHeader } from '../Models/cierre-diario.report';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private _http = inject(HttpClient);
  private _auth = inject(AuthService);

  constructor() { }

postInsertaVenta(ventas :VentasModel): any {
  return this._http.post(GlobalConstants.Ventas + 'IngresarVenta', ventas);
}
postInsertaVentaAnulada(venta : VentasModel): any {
  return this._http.post(GlobalConstants.Ventas + 'IngresarVentaAnulada', venta);
}
/* patchVenta(venta: Venta_Salida): any {
  return this._http.post(GlobalConstants.Ventas + 'Venta/UpdateVenta', venta, this._auth.getHeader());
} */

getListaVentasByCliente(idCliente:number) {
  return this._http.get<VentasModel[]>(GlobalConstants.Ventas + '' + idCliente, this._auth.getHeader());
}

getListaVentasanuladasByCliente(idCliente:number) {
  return this._http.get<VentasModel[]>(GlobalConstants.Ventas + 'anulados/' + idCliente, this._auth.getHeader());
}

getListaReservaByCliente(idCliente : number) {
  return this._http.get<VentasModel[]>(GlobalConstants.Ventas + 'Reserva/' + idCliente, this._auth.getHeader());
}

getVentasById(ventaid : number) {
  return this._http.get<VentasModel[]>(GlobalConstants.Ventas + 'VentasById/' + ventaid, this._auth.getHeader());
}
getreservas() {
  return this._http.get<VentasModel[]>(GlobalConstants.Ventas + 'Reservas', this._auth.getHeader());
}

getListaPagosByCliente(idCliente : number) {
  return this._http.get<VentasModel[]>(GlobalConstants.Ventas + 'pago/' + idCliente, this._auth.getHeader());
}

getDeudaAnterior(idCli : number, idProd : number): any {
  return this._http.get(GlobalConstants.Ventas +  idCli + '/' + idProd, this._auth.getHeader());
}


getDeudaTotal(idCli : number): any {
  return this._http.get(GlobalConstants.Ventas + 'DeudaTotal/' + idCli, this._auth.getHeader());
}

getReporteVentas(fIni:string, fFin :string, Ventas: VentasModel): any {
  return this._http.get(GlobalConstants.Ventas + 'Reporte/' + fIni + '/' + fFin + '/' + Ventas);
}

getReportePagos(fIni:string, fFin :string, Ventas: VentasModel): any {
  return this._http.get(GlobalConstants.Ventas + 'ReportePago/' + fIni + '/' + fFin + '/' + Ventas);
}

getReporteCierreDiario(fIni : string, cSector : string) {
  // return of<CierreDiarioReport[]>(JSON.parse(localStorage.getItem('rep')));
  return this._http.get<CierreDiarioReport[]>(GlobalConstants.Ventas + 'ReporteCierreDiario/' + fIni + '/' + cSector);
}

getReporteCierreDiarioCabecera() {
  return this._http.get<CierreDiarioReportHeader[]>(GlobalConstants.Ventas + 'ReporteCierreDiarioCabecera');
}

postEliminaVenta(ventaId : number): any {
  return this._http.get(GlobalConstants.Ventas + 'EliminaVenta/' + ventaId, this._auth.getHeader());
}

postDeleteVentaAll(ventaId : number): any {
  return this._http.get(GlobalConstants.Ventas + 'DeleteVentaAll/' + ventaId, this._auth.getHeader());
}


}