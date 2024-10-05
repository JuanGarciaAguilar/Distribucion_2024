import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { ModuloService } from './modulo.service';
import { json } from 'stream/consumers';
import { AuthEntity } from '../Models/Auth';
import { GlobalConstants } from '../Models/GlobalConstants';
import { ValidacionRutaEntity } from '../Models/Modulo';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private _http = inject(HttpClient);
    private router = inject(Router);
    private _ModuloService = inject(ModuloService);
    constructor() {}

    GetSession(entity: AuthEntity): any {
        return this._http.post(GlobalConstants.Usuario + 'Login', entity);
    }

    RutaEntity?: ValidacionRutaEntity;

    ValidarToken() {
        var token: any = localStorage.getItem('token');
        if (token == '1') {
            this.router.navigateByUrl('auth/login');
            Swal.fire({
                title: 'Su sesión a culminado',
                text: 'Inicie Sesión nuevamente',
                icon: 'warning',
            });
            return;
        }
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(token);
        this.ValidarRuta(token);
        if (isExpired) {
            this.RemoveToken();
            this.router.navigateByUrl('auth/login');
            Swal.fire({
                title: 'Su sesión a culminado',
                text: 'Inicie Sesión nuevamente',
                icon: 'warning',
            });
            return;
        }
    }

    ValidarRuta(token: any) {
        if (this.router.url !== '/' && this.router.url !== '/auth/login') {
            const helper = new JwtHelperService();
            const IsUser = helper.decodeToken(token);
            this.RutaEntity = new ValidacionRutaEntity();
            this.RutaEntity.routerLink = this.router.url;
            this.RutaEntity.cPersCod = IsUser.unique_name;
            this._ModuloService
                .ValidacionRutasPorUsuario(this.RutaEntity)
                .subscribe((data: any) => {
                    if (data.length !== 0) {
                        if (data[0].estado! == false) {
                            this.router.navigateByUrl('auth/login');
                            Swal.fire({
                                title: 'Su sesión a culminado',
                                text: data[0].message,
                                icon: 'warning',
                            });
                            this.RemoveToken();
                            return;
                        }
                    }
                });
        }
    }

    GetUsuario() {
        let data =  JSON.parse(localStorage.getItem('UserData')!);
        return data;
    }

    SetUsuario(user: any) {
        localStorage.setItem('UserData', JSON.stringify(user));
    }

    RemoveUser() {
        return localStorage.removeItem('user');
    }

    getToken() {
        return localStorage.getItem('token');
    }

    SetToken(token: string) {
        localStorage.setItem('token', token);
    }

    RemoveToken() {
        sessionStorage.removeItem('token');
        return localStorage.setItem('token', '1');
    }

    public getHeader() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'bearer ' + this.getToken(),
            }),
            reportProgress: true,
        };
    }
    public getHeaderPosted() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'multipart/form-data',
                Authorization: 'bearer ' + this.getToken(),
            }),
        };
    }
    public getHeaderDowload() {
        return {
            headers: new HttpHeaders({
                ResponseType: 'application/octet-stream',
                Authorization: 'bearer ' + this.getToken(),
            }),
        };
    }

    b64EncodeUnicode(str: string) {
        return btoa(
            encodeURIComponent(str).replace(
                /%([0-9A-F]{2})/g,
                function (match, p1) {
                    return String.fromCharCode(parseInt(p1, 16));
                }
            )
        );
    }
    /**
     * decodifica un string de base64
     * @param str base64 codificada
     * @returns string decodificado
     */
    b64DecodeUnicode(str: string) {
        return decodeURIComponent(
            Array.prototype.map
                .call(atob(str), function (c) {
                    return (
                        '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join('')
        );
    }
    /**
     *
     * @returns headers de firebase
     */
    /* public getHeaderFirebase() {
    return {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.getUser().TOKEN,
        }),
    };
} */








    SetSectoresData(data: any) {
        localStorage.setItem('SectoresData', JSON.stringify(data));
    }

    GetSectoresData() {
        let data =  JSON.parse(localStorage.getItem('SectoresData')!);
        return data;
    }



    SetVentasData(data: any) {
        localStorage.setItem('VentasData', JSON.stringify(data));
    }

    GetVentasData() {
        let data =  JSON.parse(localStorage.getItem('VentasData')!);
        return data;
    }


    SetVentasUpdateData(data: any) {
        localStorage.setItem('VentasUpdateData', JSON.stringify(data));
    }

    GetVentasUpdateData() {
        let data =  JSON.parse(localStorage.getItem('VentasUpdateData')!);
        return data;
    }

    GetCompraData() {
        let data =  JSON.parse(localStorage.getItem('CompraData')!);
        return data;
    }

    SetCompraData(data: any) {
        localStorage.setItem('CompraData', JSON.stringify(data));
    }

}
