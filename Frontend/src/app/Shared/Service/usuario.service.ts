import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { GlobalConstants } from '../Models/GlobalConstants';
import { UsuariosModel } from '../Models/UsuariosModel';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    private _HttpClient = inject(HttpClient);
    private _AuthService = inject(AuthService);

  constructor() { }

  getListaUsuario(): any {
    return this._HttpClient.get(GlobalConstants.Usuarios, this._AuthService.getHeader());
  }


  postInsertaUsuario(usuario: UsuariosModel): any {
    return this._HttpClient.post(GlobalConstants.Usuarios + 'InsertUsuario', usuario, this._AuthService.getHeader());
  }


  postActualizarUsuario(usuario: UsuariosModel): any {
    return this._HttpClient.post(GlobalConstants.Usuarios + 'UpdateUsuario', usuario, this._AuthService.getHeader());
  }

  postEliminaUsuario(idUsuario : number): any {
    return this._HttpClient.get(GlobalConstants.Usuarios + 'DeleteUsuario/' + idUsuario, this._AuthService.getHeader());
  }
}
