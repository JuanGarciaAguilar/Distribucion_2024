import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Usuario } from '../../Shared/Usuario';
import { DistribucionService } from '../../Shared/distribucion.service';
import { FormBuilder, Validators, FormGroup, FormControlName } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { FormsModule } from '@angular/forms';

import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { GroupDescriptor, DataResult, process, State, aggregateBy } from '@progress/kendo-data-query';

declare function openModal(state: string): any;
declare function closeModal(state: string): any;
declare function confirmModal(opcion: string, rTitle: string, rText: string, uTitle: string, uText: string, dTitle: string, dText: string): any;

@Component({
  selector: 'app-mantenedor-usuario',
  templateUrl: './mantenedor-usuario.component.html',
  styleUrls: ['./mantenedor-usuario.component.css']
})
export class MantenedorUsuarioComponent implements OnInit {
  estado = 'Agregar';
  clase = 'primary';
  usuario = new Usuario();
  searchString: string = "";
  @ViewChild("name") inputEl: ElementRef;
  frm: FormGroup;

  constructor(public distribucionService: DistribucionService, private formBuilder: FormBuilder) { }

  public dataTempUsuario: any;
  ngOnInit() {
    this.usuario.roleDescription = '';
    this.distribucionService.getListaUsuario().subscribe(
      data => {
        this.dataTempUsuario = data;
        this.loadItems();
      },
      error => {
        console.log(error);
      }
    );

    this.frm = this.formBuilder.group({
      pass: [null, [Validators.required]],
      rpass: [null, [Validators.required]],
      name: [null, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rol: [null, [Validators.required]],
      telefono: [null, Validators.min(0)]
    })
  }

  filter() {
    this.usuarioKendo = this.dataTempUsuario.filter(x => x.fullName.toLowerCase().indexOf(this.searchString.toLowerCase()) != -1);
  }

  public usuarioKendo: GridDataResult;
  public pageSize: number = 10;
  public skip: number = 0;
  private data: Object[];

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.usuarioKendo = {
      data: this.dataTempUsuario.slice(this.skip, this.skip + this.pageSize),
      total: this.dataTempUsuario.length
    };
  }

  content: string;
  level: string;
  visible: boolean = false;
  ingresarUsuario() {
    try {
      if (this.usuario.userID == '' || this.usuario.userID == null) {
        //let us = Object.assign({}, this.usuario);
        this.distribucionService.postInsertaUsuario(this.usuario).subscribe(
          res => {
            if (res != 0) {
              this.validacionMensaje(res);
            } else {
              this.confirmModal('register');
              this.ngOnInit();
            }
          },
          err => {
            console.log(err);
          }
        );
      }
    } catch (e) {
      console.log(e);
    }
  }


  usuarioE;
  editarUsuario(usuarioid, nombre, email, phone,rol) {
    try {
      this.usuarioE = new Usuario();
      this.usuarioE.userID = usuarioid;
      this.usuarioE.fullName = nombre;
      this.usuarioE.email = email;
      this.usuarioE.phone = phone;
      this.usuarioE.roleDescription = rol;
      this.distribucionService.postActualizarUsuario(this.usuarioE).subscribe(
        data => {
          this.confirmModal('update');
          this.ngOnInit();
        },
        err => {
          console.log(err);
        }
      );
      //this.getProducts(this.productId);
    } catch (e) {

    }
  }

  estadoverificar: string;
  verificarduplicado(usuarioid, nombre, email, phone,rol) {
    for (var i = 0; i < this.dataTempUsuario.length; i++) {
      if (this.dataTempUsuario[i].userID == usuarioid) {
        if (this.dataTempUsuario[i].fullName == nombre && this.dataTempUsuario[i].email == email && this.dataTempUsuario[i].phone == phone && this.dataTempUsuario[i].roleDescription == rol) {
          this.cancelar();
        } else if (this.dataTempUsuario[i].email != email && this.dataTempUsuario[i].phone == phone) {
          this.verificaremail(email);
          if (this.opcion == 'email') {
            this.content = "Ya se encuentra registrado el email"; this.level = "danger"; this.visible = true;
          } else {
            this.editarUsuario(usuarioid, nombre, email, phone, rol);
          }
        } else if (this.dataTempUsuario[i].phone != phone && this.dataTempUsuario[i].email == email) {
          this.verificarphone(phone);
          if (this.opcion == 'celular') {
            this.content = "Ya se encuentra registrado el celular"; this.level = "danger"; this.visible = true;
          } else {
            this.editarUsuario(usuarioid, nombre, email, phone, rol);
          }
        } else if (this.dataTempUsuario[i].roleDescription != rol || this.dataTempUsuario[i].fullName != nombre && (this.dataTempUsuario[i].email == email && this.dataTempUsuario[i].phone == phone)) {
          setTimeout(() => { this.visible = false; }, 5000);
          this.editarUsuario(usuarioid, nombre, email, phone, rol);
        }else {
          this.verificaremailcelular(email, phone);
          if (this.opcion == 'email') {
            this.content = "Ya se encuentra registrado el email"; this.level = "danger"; this.visible = true;
          } else if(this.opcion == 'celular') {
            this.content = "Ya se encuentra registrado el celular"; this.level = "danger"; this.visible = true;
          } else {
            this.editarUsuario(usuarioid, nombre, email, phone, rol);
          }
        }

      }
    }
  }

  opcion: string;
  verificaremail(email) {
    for (var c = 0; c < this.dataTempUsuario.length; c++) {
      if (this.dataTempUsuario[c].email == email) {
        return this.opcion = 'email';
      } 
    }
  }

  verificarphone(phone) {
    for (var c = 0; c < this.dataTempUsuario.length; c++) {
      if (this.dataTempUsuario[c].phone == phone) {
        return this.opcion = 'celular';
      }
    }
  }

  
  verificaremailcelular(email, phone) {
    this.opcion = ''
    this.verificaremail(email);
    if (this.opcion == '') {
      this.verificarphone(phone);
    }
    
  }

  validacionMensaje(res) {
    if (res.Message == 'Usuario') {
      setTimeout(() => { this.visible = false; }, 3000); this.content = "Ya se encuentra registrado el usuario"; this.level = "danger"; this.visible = true;
    } else if (res.Message == 'Email') {
      setTimeout(() => { this.visible = false; }, 3000);this.content = "Ya se encuentra registrado el email"; this.level = "danger"; this.visible = true;
    } else {
      setTimeout(() => { this.visible = false; }, 3000);this.content = "Ya se encuentra registrado el celular"; this.level = "danger"; this.visible = true;
    }
  }

  ocultarMensaje() {
    this.visible = false
  }

  passwordElement: boolean = false;
  btnEditar: boolean = true;
  private rpasswordElement: boolean = false;
  editar(userID, fullName, email, phone, roleDescription) {
    this.estado = 'Editando';
    this.clase = 'warning';
    this.usuario.userID = userID;
    this.usuario.fullName = fullName;
    this.usuario.email = email;
    this.usuario.phone = phone;
    this.usuario.password = ' ';
    this.usuario.rpassword = ' ';
    this.usuario.roleDescription = roleDescription;
    this.deshabilitarPass();
    this.inputEl.nativeElement.focus()
  }

  cancelar() {
    this.limpiar();
    this.habilitarPass();
  }

  limpiar() {
    this.estado = 'Agregar';
    this.clase = 'primary';
    this.usuario.userID = '';
    this.usuario.fullName = '';
    this.usuario.password = '';
    this.usuario.phone = '';
    this.usuario.roleDescription = '';
    this.usuario.email = '';
    this.usuario.rpassword = '';
  }
  habilitarPass() {
    this.passwordElement = false;
    this.btnEditar = true;
  }
  deshabilitarPass() {
    this.passwordElement = true;
    this.btnEditar = false;
  }


  enviarID(Usuario) {
    this.cancelar();
    this.usuario.userID = Usuario;
  }

  eliminar(Usuario) {
    this.distribucionService.postEliminaUsuario(Usuario).subscribe(
      res => {
        this.confirmModal('delete');
        this.ngOnInit();
      },
      err => {
        console.log(err);
      }
    );
  }
  txtClass: string;
  checkInput(input) {
    if (input != '') {
      this.txtClass = 'active';
    } else {
      this.txtClass = '';
    }
  }

  openModal(state) {
    openModal(state);
  }

  closeMod(state) {
    closeModal(state);
  }

  confirmModal(opcion) {
    confirmModal(opcion, "Registrado", "El usuario registro correctamente", "Actualizado", "El usuario se actualizo correctamente", "Eliminado", "El usuario se elimino correctamente.");
  }

}
