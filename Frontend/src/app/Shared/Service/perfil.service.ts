/* import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../Model/GlobalConstants';
import { PerfilEntity, PerfilMovimientoEntity } from '../Model/Perfil';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class PerfilService {
    private _http = inject(HttpClient);
    private _auth = inject(AuthService);

    GetPerfil(): any {
        return this._http.get<any>(
            GlobalConstants.Perfil + 'GetPerfil',
            this._auth.getHeader()
        );
    }

  

    GetPerfilMovimiento(
        AltaId: number,
        FechaIni: string,
        FechaFin: string
    ): any {
        return this._http.get(
            GlobalConstants.PerfilMovimiento +
                'GetPerfilMovimiento?AltaId=' +
                AltaId +
                '&FechaIni=' +
                FechaIni +
                '&FechaFin=' +
                FechaFin,
            this._auth.getHeader()
        );
    }

    InsertPerfilMovimiento(entity: PerfilMovimientoEntity): any {
        return this._http.post(
            GlobalConstants.PerfilMovimiento + 'InsertPerfilMovimiento',
            entity,
            this._auth.getHeader()
        );
    }

    UpdatePerfilMovimiento(entity: PerfilMovimientoEntity): any {
        return this._http.post(
            GlobalConstants.PerfilMovimiento + 'UpdatePerfilMovimiento',
            entity,
            this._auth.getHeader()
        );
    }

    DeletePerfilMovimiento(PerfilMovId: number): any {
        return this._http.post(
            GlobalConstants.PerfilMovimiento +
                'DeletePerfilMovimiento?PerfilMovId=' +
                PerfilMovId,
            this._auth.getHeader()
        );
    }

    GetPerfilCargo(): any {
        return this._http.get<any>(
            GlobalConstants.PerfilCargo + 'GetPerfilCargo',
            this._auth.getHeader()
        );
    }

    GetPerfilAdicional(): any {
        return this._http.get<any>(
            GlobalConstants.PerfilMovimiento + 'GetPerfilAdicional',
            this._auth.getHeader()
        );
    }

    InsertBloqueos(entity: PerfilMovimientoEntity): any {
        return this._http.post(
            GlobalConstants.PerfilMovimiento + 'InsertBloqueo',
            entity,
            this._auth.getHeader()
        );
    }

    InsertCese(entity: PerfilMovimientoEntity): any {
        return this._http.post(
            GlobalConstants.PerfilMovimiento + 'InsertCese',
            entity,
            this._auth.getHeader()
        );
    }

    HabilitarUsuario(entity: PerfilMovimientoEntity): any {
        return this._http.post(
            GlobalConstants.PerfilMovimiento + 'HabilitarUsuario',
            entity,
            this._auth.getHeader()
        );
    }

    GetReporteCesadosHeader(
        FechaIni: string,
        FechaFin: string,
        FechaFiltroSelected: number
    ): any {
        return this._http.get<any>(
            GlobalConstants.PerfilMovimiento +
                'GetReporteCesadosHeader?FechaIni=' +
                FechaIni +
                '&FechaFin=' +
                FechaFin +
                '&FechaFiltroSelected=' +
                FechaFiltroSelected,
            this._auth.getHeader()
        );
    }

    GetReporteCesadosChildren(
        FechaIni: string,
        FechaFin: string,
        FechaFiltroSelected: number
    ): any {
        return this._http.get<any>(
            GlobalConstants.PerfilMovimiento +
                'GetReporteCesadosChildren?FechaIni=' +
                FechaIni +
                '&FechaFin=' +
                FechaFin +
                '&FechaFiltroSelected=' +
                FechaFiltroSelected,
            this._auth.getHeader()
        );
    }

    GetReporteCesadosAll(
        FechaIni: string,
        FechaFin: string,
        FechaFiltroSelected: number
    ): any {
        return this._http.get<any>(
            GlobalConstants.PerfilMovimiento +
                'GetReporteCesadosAll?FechaIni=' +
                FechaIni +
                '&FechaFin=' +
                FechaFin +
                '&FechaFiltroSelected=' +
                FechaFiltroSelected,
            this._auth.getHeader()
        );
    }

    ValidacionFechasSpring(
        Option: number,
        OptionSpring: number,
        AltaId: number
    ): any {
        return this._http.get<any>(
            GlobalConstants.PerfilMovimiento +
                'ValidacionFechasSpring?Option=' +
                Option +
                '&OptionSpring=' +
                OptionSpring +
                '&AltaId=' +
                AltaId,
            this._auth.getHeader()
        );
    }
}
 */