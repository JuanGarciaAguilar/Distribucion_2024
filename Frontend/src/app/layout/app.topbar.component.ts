import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    inject,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service'; 
import { Router } from '@angular/router'; 
import { AuthService } from '../Shared/Service/auth.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(
        public layoutService: LayoutService,
        private _auth: AuthService,
        private router: Router
    ) {}

    NotificacionData: any;
    ngOnInit(): void {
        this.GetUserData();
/*         this._Notificacion.NotificacionesEmitter.subscribe((data: any) => {
            this.NotificacionData = [];
            this.NotificacionData = data;
            return;
        });        this._Notificacion.NotificacionesEmitter.subscribe((data: any) => {
            this.NotificacionData = [];
            this.NotificacionData = data;
            return;
        });
 */ 
    }
    Personal?: string;
    async GetUserData() {
        this.Personal = await this._auth.GetUsuario().userID;
    }

    CerrarSesion() {
        this._auth.RemoveToken();
        this._auth.RemoveUser();
        this.router.navigateByUrl('auth/login');
    }

     
}
