//import { Component, OnInit, Input,ViewChild, ElementRef} from '@angular/core';
//import { Usuario } from '../Shared/Usuario';
//import { DistribucionService } from '../Shared/distribucion.service';
//import { FormBuilder, Validators, FormGroup, FormControlName } from '@angular/forms';
//import { Subject } from 'rxjs/Subject';
//import { FormsModule } from '@angular/forms';
//declare function openModal(state: string): any;
//declare function closeModal(state: string): any;
//@Component({
//  selector: 'app-usuario',
//  templateUrl: './usuario.component.html',
//  styleUrls: ['./usuario.component.css']
//})
//export class UsuarioComponent implements OnInit {

//  estado = 'Agregar';
//  clase = 'primary';
//  usuario = new Usuario();
//  searchString: string = "";
//  constructor(public distribucionService: DistribucionService, private formBuilder: FormBuilder) { }
//  @ViewChild("name") inputEl: ElementRef;
//  frm: FormGroup;

//  public dataTempUsuario: any;
//  ngOnInit() {
//    this.usuario.roleDescription = '';
//    this.distribucionService.getListaUsuario().subscribe(
//      data => {
//        this.dataTempUsuario = data;
//      },
//      error => {
//        console.log(error);
//      }
//    );

//    this.frm = this.formBuilder.group({
//      pass: [null, [Validators.required]],
//      rpass: [null, [Validators.required]],
//      name: [null, [Validators.required]],
//      email: ['', [Validators.required, Validators.email]],
//      rol: [null, [Validators.required]],
//      telefono: [null, Validators.min(0)]
//    })
//  }

//  content: string;
//  level: string;
//  visible: boolean = false;
//  ingresarUsuario() {
//    try {
//      if (this.usuario.userID == '' || this.usuario.userID == null) {
//        //let us = Object.assign({}, this.usuario);
//        this.distribucionService.postInsertaUsuario(this.usuario).subscribe(
//          res => {
//            if (res != 0) {
//              this.validacionUsuario(res);
//            } else {
//              setTimeout(() => { this.visible = false; }, 5000);
//              this.content = "Usuario nuevo agregado correctamente."; this.level = "success"; this.visible = true;
//              this.ngOnInit();
//            }
//          },
//          err => {
//            console.log(err);
//          }
//        );         
//      } else if (this.usuario.userID != '') {
//        this.distribucionService.postActualizarUsuario(this.usuario).subscribe(
//          res => {
//              setTimeout(() => { this.visible = false; }, 5000);
//              this.content = "Usuario actualizado correctamente."; this.level = "success"; this.visible = true;
//              this.ngOnInit();
//          },
//          err => {
//            console.log(err);
//          }
//        );
//      }
//    } catch (e) {
//      console.log(e);
//    }
//  }

//  validacionUsuario(res) {
//    if (res.Message == 'Usuario') {
//      this.content = "Ya se encuentra registrado el usuario"; this.level = "danger"; this.visible = true;
//    } else if (res.Message == 'Email') {
//      this.content = "Ya se encuentra registrado el email"; this.level = "danger"; this.visible = true;
//    } else {
//      this.content = "Ya se encuentra registrado el celular"; this.level = "danger"; this.visible = true;
//    }              
//  }

//  //actualizarRamUsuarios() {
//  //  this.dataTempUsuario.forEach(x => {
//  //    if (x.userID == this.usuario.userID) {
//  //      x.email = this.usuario.email;
//  //      x.fullName = this.usuario.fullName;
//  //      x.phone = this.usuario.phone;
//  //      x.roleDescription = this.usuario.roleDescription;
//  //    }
//  //  });
//  //}



//  ocultarMensaje() {
//    this.visible = false
//  }

//  passwordElement: boolean = false;
//  private rpasswordElement: boolean = false;
//  editar(userID, fullName, email, phone, roleDescription) {
//    this.estado = 'Editando';
//    this.clase = 'warning';
//    this.usuario.userID = userID;
//    this.usuario.fullName = fullName;
//    this.usuario.email = email;
//    this.usuario.phone = phone;
//    this.usuario.password = ' ';
//    this.usuario.rpassword = ' ';
//    this.usuario.roleDescription = roleDescription;    
//    this.deshabilitarPass();
//    this.inputEl.nativeElement.focus()
//  }
//  cancelar() {
//    this.limpiar();
//    this.habilitarPass();
//  }

//  limpiar() {
//    this.estado = 'Agregar';
//    this.clase = 'primary';
//    this.usuario.userID = '';
//    this.usuario.fullName = '';
//    this.usuario.password = '';
//    this.usuario.phone = '';
//    this.usuario.roleDescription = '';
//    this.usuario.email = '';
//    this.usuario.rpassword = '';
//  }
//  habilitarPass() {
//    this.passwordElement = false;
//  }
//  deshabilitarPass() {
//    this.passwordElement = true;
//  }


//  enviarID(Usuario) {
//    this.cancelar();
//    this.usuario.userID= Usuario;
//  }

//  eliminar(Usuario) {
//    this.distribucionService.postEliminaUsuario(Usuario).subscribe(
//      res => {
//        setTimeout(() => { this.visible = false; }, 5000);
//        this.content = "Usuario eliminado correctamente.";
//        this.level = "success";
//        this.visible = true;
//          this.ngOnInit();
//      },
//      err => {
//        console.log(err);
//      }
//    );
//}
//  txtClass: string;
//  checkInput(input) {
//    if (input != '') {
//      this.txtClass = 'active';
//    } else {
//      this.txtClass = '';
//    }
//  }

//  openModal(state) {
//    openModal(state);
//  }

//  closeMod(state) {
//    closeModal(state);
//  }

//}
