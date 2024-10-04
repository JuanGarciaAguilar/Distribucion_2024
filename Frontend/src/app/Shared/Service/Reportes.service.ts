import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GlobalConstants } from '../Models/GlobalConstants';
import { CierreDiarioReportHeader, EstadoFinanciero } from '../Models/ReportesModel';
import { CierreDiarioReport } from '../Models/cierre-diario.report';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

    private _HttpClient = inject(HttpClient);
    private _AuthService = inject(AuthService);

constructor() { }


GetReporte(){
    return this._HttpClient.get<EstadoFinanciero[]>(GlobalConstants.ReporteStock + 'estadofinanciero');
}

getReporteCierreDiarioCabecera():any {
    return this._HttpClient.get<CierreDiarioReportHeader[]>(GlobalConstants.Ventas + 'ReporteCierreDiarioCabecera',this._AuthService.getHeader());
  }

  getReporteCierreDiario(fIni:any, cSector:number) {
    return this._HttpClient.get<CierreDiarioReport[]>(GlobalConstants.Ventas + 'ReporteCierreDiario/' + fIni + '/' + cSector);
  }

  Venta_GetByClienteFecha(fIni: string, fFin: string, clienteid: number) {

    return this._HttpClient.get<any>(GlobalConstants.Ventas + 'Venta_GetByClienteFecha/' + fIni + '/' + fFin + '/' + clienteid, this._AuthService.getHeader());
   // return this.httpClient.get<CierreDiarioReport[]>(this.API + 'Venta/ReporteCierreDiario/' + fIni + '/' + cSector);
  }

  getReporteGastos(repGastosFechaInicio :string, repGastosFechaFin : string) {
    return this._HttpClient.get(GlobalConstants.Gastos + repGastosFechaInicio + '/' + repGastosFechaFin, this._AuthService.getHeader())
  }

  getGastoTotalPeriodo(fechaInicio : string, fechaFin : string): any {
    return this._HttpClient.get(GlobalConstants.Gastos  + 'TotalPeriodo/' + fechaInicio + '/' + fechaFin, this._AuthService.getHeader())
  }

}
