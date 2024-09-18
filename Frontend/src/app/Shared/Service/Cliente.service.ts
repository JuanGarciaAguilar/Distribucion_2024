import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { ClienteModel, ClientePagosEntity } from '../Models/ClienteModel';
import { GlobalConstants } from '../Models/GlobalConstants';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private _http = inject(HttpClient);
  private _auth = inject(AuthService);
  constructor() { }

  getListaClientes() {
    return this._http.get<ClienteModel[]>(GlobalConstants.Cliente_nt + 'listaCliente');
  }

  getclientesBySector(id : string) {
    return this._http.get<ClienteModel[]>(GlobalConstants.Cliente_nt + 'clientesBySector/' + id);
  }

  getDeudaClientesBySector(): any {
    return this._http.get(GlobalConstants.Cliente_nt + 'deudaClientesBySector');
  }

  postInsertaCliente(client: ClienteModel): any {
    return this._http.post(GlobalConstants.Cliente + 'InsertarCliente', client, this._auth.getHeader());
  }

  postActualizaDeudaCliente(cliente_Ent: ClientePagosEntity): any {
    return this._http.post(GlobalConstants.Cliente + 'PagarDeuda', cliente_Ent, this._auth.getHeader());
  }

  ActualizarPago(ventaId: number, idCliente: number, monto: number, observacion: string, user: string): any {
    return this._http.get(GlobalConstants.Cliente + 'PagarDeuda/' + ventaId + '/' + idCliente + '/' + monto + '/' + observacion + '/' + user, this._auth.getHeader());
  }

  postActualizarCliente(client: ClienteModel): any {
    return this._http.post(GlobalConstants.Cliente + 'UpdateCliente', client, this._auth.getHeader());
  }

  getDeudaAnteriorByClient(idCli: number) {
    return this._http.get(GlobalConstants.Cliente + 'DeudaByCliente/' + idCli, this._auth.getHeader());
  }
}
