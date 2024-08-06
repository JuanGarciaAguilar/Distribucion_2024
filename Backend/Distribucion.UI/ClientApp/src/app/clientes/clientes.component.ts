//import { Component, OnInit } from '@angular/core';
//import { DistribucionService } from '../Shared/distribucion.service';
//import { Subject } from 'rxjs/Subject';
//import { NgModule, ViewChild, ElementRef } from '@angular/core';
//import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
//import { Cliente } from '../Shared/Cliente';
//import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//import { FormBuilder, Validators, FormGroup, FormControlName } from '@angular/forms';
//import { FormsModule } from '@angular/forms';
//import 'rxjs/add/operator/switchMap';
//import {  } from "timers";

//@Component({
//  selector: 'app-clientes',
//  templateUrl: './clientes.component.html',
//  styleUrls: ['./clientes.component.css']
//})

//export class ClientesComponent implements OnInit{
//  sect: string;
//  cliente = new Cliente();
//  nombres = '';
//  estado = 'Agregar';
//  clase = 'primary';
//  @ViewChild("cName") inputEl: ElementRef;
//  constructor(public distribucionService: DistribucionService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }
//  frm: FormGroup;
//  searchString: string = '';

//  public dataTempClientes: any;
//  ngOnInit() {
//    this.distribucionService.getListaClientes().subscribe(
//      data => {
//        this.dataTempClientes = data;
//        //this.dataTemp = this.dataTemp.filter(f => f.userStatus != 'INACTIVE');
//        //this.loadItems();
//      },
//      error => {
//        //this.sharedDataService.sessionExpired(error);
//      }
//    );
//    this.distribucionService.currentCliente.subscribe(c => this.cliente = c)
//    let sector = this.route.snapshot.paramMap.get('sectorURL');
//    this.sect = sector;
//    this.cliente.clienteName = null;
//    this.cliente.clienteAddress = null;
//    this.cliente.clientePhone = null;
//    this.cliente.sectorId = null;    
//    this.frm = this.formBuilder.group({
//      cName: [null, [Validators.required]],
//      cSector: [null, [Validators.required]],
//      cPhone: [null],
//      cAddress: [null],
//    })
//  }

//  Editar(clienteId, clienteName, clienteAddress, clientePhone, sectorId) {
//    this.estado = 'Editando';
//    this.clase = 'warning';
//    this.cliente.clienteId = clienteId;
//    this.cliente.clienteName = clienteName;
//    this.cliente.clienteAddress = clienteAddress;
//    this.cliente.clientePhone = clientePhone;
//    this.cliente.sectorId = sectorId;
//    this.inputEl.nativeElement.focus()
//  }

//  content: string;
//  level: string;
//  visible: boolean = false;
//  ingresarCliente() {
//    try {
//      if (this.cliente.clienteId == null || this.cliente.clienteId == 0) {
//        this.distribucionService.postInsertaCliente(this.cliente).subscribe(
//          res => {
//            if (res != 0) {
//              setTimeout(() => { this.visible = false; }, 5000);
//              this.content = "Ya se encuentra registrado el cliente"; this.level = "danger"; this.visible = true;
//            } else {
//              setTimeout(() => { this.visible = false; }, 5000);
//              this.content = "Cliente nuevo agregado correctamente."; this.level = "success"; this.visible = true;
//              this.ngOnInit();
//            }            
//          },
//          err => {
//            console.log(err);
//          }
//        );

//        //this.distribucionService.postInsertaCliente(this.cliente)
//        //  .then((res) => {
//        //    setTimeout(() => {
//        //      this.visible = false;
//        //    }, 5000);
//        //    this.content = "Cliente nuevo agregado correctamente."; this.level = "success"; this.visible = true;
//        //    this.distribucionService.getListaClientes();
//        //  })
//        //  .catch((err) => { console.log(err); this.content = "Ya se encuentra registrado el cliente"; this.level = "danger"; this.visible = true });

//      } else if (this.cliente.clienteId > 0) {
//        this.actualizarRamClientes();
//        this.distribucionService.postActualizarCliente(this.cliente).subscribe(
//          res => {
//              setTimeout(() => { this.visible = false; }, 5000);
//            this.content = "Cliente actualizado correctamente."; this.level = "success"; this.visible = true;
//            this.ngOnInit();
//          },
//          err => {
//            console.log(err);
//          }
//        );
//       }
//      this.estado = 'Agregar';
//      this.clase = 'primary';
//      this.cliente.clienteId = 0;
//      this.cliente.clienteAddress = null;
//      this.cliente.clienteName = null;
//      this.cliente.clientePhone = null;
//      this.cliente.sectorId = null;
//    } catch (e) {
//      console.log(e);
//    }    
//  }
//  ocultarMensaje() {
//    this.visible = false
//  }
//  cancelar() {
//    this.estado = 'Agregar';
//    this.clase = 'primary';
//    this.cliente.clienteId = 0;
//    this.cliente.clienteName = null;
//    this.cliente.clienteAddress = null;
//    this.cliente.clientePhone = null;
//    this.cliente.sectorId = null;
//  }

//  actualizarRamClientes() {    
//    this.dataTempClientes.forEach(x => {
//      if (x.clienteId == this.cliente.clienteId) {
//        x.clienteName = this.cliente.clienteName;
//        x.clientePhone = this.cliente.clientePhone;
//        x.sectorId = this.cliente.sectorId;
//        x.clienteAddress = this.cliente.clienteAddress;        
//      }
//    });
//  }

//  noLetrasPlus(event: any, telefono) {
//    if ((isNaN(event.key)) && (event.key != "+") && (event.key.length <= 1)) {
//      this.cliente.clientePhone = this.cliente.clientePhone.slice(0, (this.cliente.clientePhone.length - 1));
//    }
//  }

//  txtClass: string;
//  checkInput(input) {
//    if (input == '' || input == null) {
//      this.txtClass = '';
//    } else {
//      this.txtClass = 'active';
//    }
//  }

//}
