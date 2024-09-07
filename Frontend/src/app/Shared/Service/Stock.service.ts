
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GlobalConstants } from '../Models/GlobalConstants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private _http = inject(HttpClient);
  private _auth = inject(AuthService);
  
constructor() { }


getStockAll(): any {
 
  return this._http.get(GlobalConstants.Stock + 'StockAll/,this._auth.getHeader()');
}

getStockAllFechas(fInicio: string): any {
  return this._http.get(GlobalConstants.Stock + 'StockAll-fechas/' + fInicio,this._auth.getHeader())
}

getStockByProductId(id :number): any {
  return this._http.get(GlobalConstants.Stock  + id,this._auth.getHeader())
}

//  //------------------------Some Reports-----------------------------

getTotalCapital(): any {
  return this._http.get(GlobalConstants.Stock + 'total/',this._auth.getHeader())
}

getMoneyAmortizadoDeuda(): any {
  return this._http.get(GlobalConstants.Stock + 'amort-deuda',this._auth.getHeader())
}

getMoneyAmortizadoDeudaFechas(fInicio: string): any {
  return this._http.get(GlobalConstants.Stock + 'amort-deuda-fechas/' + fInicio,this._auth.getHeader())
}


getReporteSaldoDeposito(): any {
  return this._http.get(GlobalConstants.Stock + 'saldo-deposito',this._auth.getHeader())
}

getEfectivo(fInicio: string): any {
  return this._http.get(GlobalConstants.Stock + 'efectivo/' + fInicio,this._auth.getHeader())
}

getEfectivoAll(): any {
  return this._http.get(GlobalConstants.Stock + 'efectivoAll',this._auth.getHeader())
}
}
