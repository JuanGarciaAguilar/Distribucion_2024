import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DistribucionService } from '../Shared/distribucion.service';
import { debug } from 'util';
import { Usuario } from '../Shared/Usuario';
import { visitAll } from '@angular/compiler';
//import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  constructor(
    private router: Router,
    private distribucionService: DistribucionService,
    //private cookieService: CookieService
  ) { }

  
  ngOnInit() {
    //this.cookieService.delete('uTsKrN');
    sessionStorage.clear();    
  }

  level: string;
  content: string;
  visible: boolean;

  usuarioI;
  loginState: boolean = true;

  login(email: string, passw: string) {

    try {
      this.loginState = true;

      this.usuarioI = new Usuario();
      this.usuarioI.email = email;
      this.usuarioI.password = passw;

      let token;
      let expiration = new Date();
      let user;

      this.distribucionService.postLogin(this.usuarioI).then((res) => {
        debugger;
        if (res.token !== undefined) {
          debugger;
          token = res.token;
          user = res.user;
          expiration = new Date(res.expiration);
          sessionStorage.setItem('D_Token', token)
          sessionStorage.setItem('user', JSON.stringify(user))
          console.log("Usuario autorizado.");
          this.router.navigate(['menu/principal']);
        } else {
          this.loginState = false;
          ///TODO: Show Message because the user is not logged in.
        }
      })
        .catch((err) => {
          console.log("Usuario no autorizado." + err)
          this.content = "Usuario o contraseña no válidos.";
          this.visible = true;
          this.level = "danger";
        });


      //this.distribucionService.postLogin(this.usuarioI).
      //  subscribe(
      //  data => {
      //    let token = data.token;
      //    let user = data.user;
      //    if (user) {
      //      sessionStorage.setItem('uDSS', JSON.stringify(user))
      //      this.cookieService.set('uTsKrN', JSON.stringify(token)/*, { secure: true  }*/);
      //      this.router.navigate(['/principal']);
      //    } 
      //  },
      //  error => {
      //    this.content = "Usuario o contraseña no válidos.";
      //    this.visible = true;
      //    this.level = "danger";
      //  });

    } catch (e) {
      console.log(e);
    }

  }
  ocultarMensaje() {
    this.visible = false
  }
}
