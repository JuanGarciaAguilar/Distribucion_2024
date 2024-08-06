import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { GlobalConstants } from '../Models/GlobalConstants';
import { ValidacionRutaEntity } from '../Models/Modulo';

@Injectable({
    providedIn: 'root',
})
export class ModuloService {

    private _http = inject(HttpClient);

    GetModulo(cPersCod: string): any {
        return this._http.get<any>(
            GlobalConstants.Modulo + 'GetModulo'
        );
    }

    /* GetPersonalSistema(): Observable<PersonalSistema[]> {

        return this._http.get<PersonalSistema[]>(GlobalConstants.Modulo + 'GetPersonalSistema');
    } */

    GetMenuAsignacion(): any {
        return this._http.get<any>(GlobalConstants.Modulo + 'GetMenu');
    }

    GetMenuAsignacionselected(cPersCod: string): any {
        return this._http.get<any>(
            GlobalConstants.Modulo +
                'GetMenuSelected?cPersCod=' +
                cPersCod
        );
    }

   /*  InsertPermisos(Entity: PermisosEntity[]): Observable<PermisosEntity[]> {

        return this._http.post<PermisosEntity[]>(
            GlobalConstants.Modulo + 'InsertPermisos',
            Entity
        );
    } */

    EliminarPermisos(cPersCod : string){
        return this._http.post(
            GlobalConstants.Modulo + 'DeletePermiso?cPersCod=' + cPersCod,''
        );
    }

    ValidacionRutasPorUsuario(entity: ValidacionRutaEntity): any {
        return this._http.post(GlobalConstants.Modulo + 'ValidacionRutasPorUsuario',entity);
    }
}
