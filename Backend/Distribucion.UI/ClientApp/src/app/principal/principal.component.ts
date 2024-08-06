import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../Shared/Usuario';
import { DistribucionService } from '../Shared/distribucion.service';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  usuarioV = new Usuario();
  validarCambio: boolean = false;
  isAdmin: boolean = true;

  constructor(private router: Router, private _cookieService: CookieService, public distribucionService: DistribucionService) {
    
  }
  
  ngOnInit() {
    //this.distribucionService.currentValidarCambio.subscribe(c => this.validarCambio = c);
      this.validationUser();
      this.usuarioV;   
  }
  validationUser() {        
    try {
      let userls = sessionStorage.getItem('D_Token');    
      this.usuarioV = JSON.parse(sessionStorage.getItem('user'));
      this.isAdmin = this.usuarioV.roleDescription == "Administrador" ? true : false;
      
      if (!userls) {       
        this.router.navigate(['/']);
      }
    } catch (e) {
      this.router.navigate(['/']);
    }
  }

  logout() {
    this._cookieService.deleteAll();
    sessionStorage.clear();    
    this.router.navigate(['/']);
  }
}
