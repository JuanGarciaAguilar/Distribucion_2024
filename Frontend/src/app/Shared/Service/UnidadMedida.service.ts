import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UnidadMedidaModel } from '../Models/UnidadMedidaModel';
import { GlobalConstants } from '../Models/GlobalConstants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
    private _HttpClient = inject(HttpClient);
    private _AuthService = inject(AuthService);
constructor() { }

getUnidadMedida(): any {


    return this._HttpClient.get(GlobalConstants.UnidadMedida + '');

  }

  InsertarUnidadMedida(unidadmedida: UnidadMedidaModel): any {
    return this._HttpClient.post(GlobalConstants.UnidadMedida + 'InsertUnidadMedida', unidadmedida, this._AuthService.getHeader());
  }

  UpdateUnidadMedida(unidadmedida: UnidadMedidaModel): any {
    return this._HttpClient.post(GlobalConstants.UnidadMedida + 'UpdateUnidadMedida', unidadmedida, this._AuthService.getHeader());
  }

  DeleteUnidadMedida(id:number): any {
    return this._HttpClient.delete(GlobalConstants.UnidadMedida + 'DeleteUnidadMedida/' + id,this._AuthService.getHeader());
  }

}
