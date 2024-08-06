import { Component, OnInit, inject } from '@angular/core';
import { log } from 'util'; 
import { AuthService } from '../../Shared/Service/auth.service';

@Component({
  selector: 'app-dashboard',

  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private _AuthToken = inject(AuthService);
    Personal?: string;
    ngOnInit(): void {
        this._AuthToken.ValidarToken();
        this.GetUserData();
    }

    async  GetUserData() {

        this.Personal = await this._AuthToken.GetUsuario().userID; 
    }
}
