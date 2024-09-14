import { Component, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthEntity } from '../../../Shared/Models/Auth';
import { AuthService } from '../../../Shared/Service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
    Usuario!: string;
    Clave!: string;

    private _Auth = inject(AuthService);
    private _router = inject(Router);

    /*  Toast = Swal.mixin({
         toast: true,
         position: 'top-end',
         showConfirmButton: false,
         timer: 5000,
         timerProgressBar: true,
         didOpen: (toast) => {
             toast.onmouseenter = Swal.stopTimer;
             toast.onmouseleave = Swal.resumeTimer;
         },
     }); */

    constructor(
    ) { }
    Loading: boolean = false;
    AuthEnt!: AuthEntity;
    ngOnInit(): void { }

    Login() {
        this._Auth.RemoveToken();

        this.AuthEnt = new AuthEntity();
        this.AuthEnt.Email = this.Usuario;
        this.AuthEnt.password = this.Clave;
        this.Loading = true;
        this._Auth.GetSession(this.AuthEnt).subscribe(
            (info: any) => {
                this._Auth.SetToken(info.token);
                this._Auth.SetUsuario(info.user);
                this._router.navigate(['/']);
                this.Loading = false;

            },
            (error: any) => {
                this.Loading = false;
                Swal.fire({
                    title: 'Notificación',
                    text: 'Los datos ingresados son incorrectos',
                    icon: 'error',
                });
            }
        );
    }
}
