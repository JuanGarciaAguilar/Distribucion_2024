import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { AuthService } from './auth.service';
import { GlobalConstants } from '../Models/GlobalConstants';
import { CuidadModel } from '../Models/CuidadModel';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

    private _HttpClient = inject(HttpClient);
    private _AuthService = inject(AuthService);

constructor() { }

getAllNewCiudad(): any {
    return this._HttpClient.get(GlobalConstants.Ciudad + 'NewCiudades',this._AuthService.getHeader());
  }

  getAllInsertCiudad(ciudad: CuidadModel): any {
    return this._HttpClient.post(GlobalConstants.Ciudad + 'InsertCiudad',ciudad ,this._AuthService.getHeader());
  }

  getAllUpdateCiudad(ciudad: CuidadModel): any {
    return this._HttpClient.post(GlobalConstants.Ciudad + 'UpdateCiudad',ciudad ,this._AuthService.getHeader());
  }

}
