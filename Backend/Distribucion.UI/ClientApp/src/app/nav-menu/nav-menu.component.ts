import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { CookieService } from 'ngx-cookie-service';
import { Usuario } from '../Shared/Usuario';
import { DistribucionService } from '../Shared/distribucion.service';

declare function openModal(state: string): any;
declare function closeModal(state: string): any;

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  usuarioV = new Usuario();
  nextSeccion: string;
  validarCambio: boolean = false;
  isAdmin: boolean = true;

  constructor(private router: Router, public distribucionService: DistribucionService) { }

  ngOnInit() {
    this.distribucionService.currentValidarCambio.subscribe(c => this.validarCambio = c);
    this.validationUser();
    this.usuarioV;
  }

  validationUser() {
    try {
      let userls = sessionStorage.getItem('D_Token');
      this.usuarioV = JSON.parse(sessionStorage.getItem('user'));
      this.isAdmin = this.usuarioV.roleDescription == "Administrador" ? true : false;

    } catch (e) {
      this.router.navigate(['/']);
    } 
  }

  logout() {
    //this._cookieService.deleteAll();
    sessionStorage.clear();    
    this.router.navigate(['/']);
  }

  goToSeccion(seccion, state) {
    this.nextSeccion = seccion;
    if (this.validarCambio == true) {
      this.routePadre = 'menu';
      openModal(state);
    }
    else {
      this.validarCambio = false;
      this.distribucionService.changeValidarCambio(this.validarCambio);
      this.router.navigate(['menu/' + this.nextSeccion]);
    }
    
  }

  goToSeccionPrincipal(seccion, state) {
    this.nextSeccion = seccion;
    if (this.validarCambio == true) {
      this.routePadre = 'menu';
      openModal(state);
    }
    else {
      this.validarCambio = false;
      this.distribucionService.changeValidarCambio(this.validarCambio);
      this.router.navigate(['menu/' + this.nextSeccion]);
    }

  }

  closeMod(state) {
    closeModal(state);
  }


  routePadre: string;
  cambiarSeccion() {
    this.validarCambio = false;
    this.distribucionService.changeValidarCambio(this.validarCambio);
    this.router.navigate([this.routePadre + '/' + this.nextSeccion]);
  }

  

  

}
