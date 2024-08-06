import { Component, OnInit } from '@angular/core';
import { DistribucionService } from '../../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject';
import { NgModule, ViewChild, ElementRef } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Cliente } from '../../Shared/Cliente';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControlName } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/switchMap';

import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { GroupDescriptor, DataResult, process, State, aggregateBy } from '@progress/kendo-data-query';
declare function confirmModal(opcion: string, rTitle: string, rText: string, uTitle: string, uText: string, dTitle: string, dText: string): any;

@Component({
  selector: 'app-mantenedor-cliente',
  templateUrl: './mantenedor-cliente.component.html',
  styleUrls: ['./mantenedor-cliente.component.css']
})
export class MantenedorClienteComponent implements OnInit {

  cliente = new Cliente();
  estado = 'Agregar';
  clase = 'primary';
  @ViewChild("cName") inputEl: ElementRef;
  frm: FormGroup;
  searchString: string = '';

  constructor(public distribucionService: DistribucionService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  public dataTempClientes: any;
  ngOnInit() {
    this.distribucionService.getListaClientes().subscribe(
      data => {
        this.dataTempClientes = data;
        this.loadItems();
        //this.dataTemp = this.dataTemp.filter(f => f.userStatus != 'INACTIVE');
        //this.loadItems();
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );

    this.cliente.clienteName = null;
    this.cliente.clienteAddress = null;
    this.cliente.clientePhone = null;
    this.cliente.sectorId = null;
    this.frm = this.formBuilder.group({
      cName: [null, [Validators.required]],
      cSector: [null, [Validators.required]],
      cPhone: [null],
      cAddress: [null],
    })
    this.listaSector();
  }

  sector: any[] = [];
  listaSector() {
    this.distribucionService.getListaSector().subscribe(
      data => {
        this.sector = data;
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
  }

  filter() {
    this.clienteKendo = this.dataTempClientes.filter(x => x.clienteName.toLowerCase().indexOf(this.searchString.toLowerCase()) != -1);
  }

  public clienteKendo: any;
  public state: State = {
    skip: 0,
    take: 10
  };
  private data: Object[];

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.clienteKendo = process(this.dataTempClientes, this.state);
  }

  private loadItems(): void {
    this.clienteKendo = process(this.dataTempClientes, this.state);
  }

  Editar(clienteId, clienteName, clienteAddress, clientePhone, sectorId) {
    this.estado = 'Editando';
    this.clase = 'warning';
    this.cliente.clienteId = clienteId;
    this.cliente.clienteName = clienteName;
    this.cliente.clienteAddress = clienteAddress;
    this.cliente.clientePhone = clientePhone;
    this.cliente.sectorId = sectorId;
    this.inputEl.nativeElement.focus()
  }

  content: string;
  level: string;
  visible: boolean = false;
  ingresarCliente() {
    try {
      if (this.cliente.clienteId == null || this.cliente.clienteId == 0) {
        this.distribucionService.postInsertaCliente(this.cliente).subscribe(
          res => {
            if (res != 0) {
              setTimeout(() => { this.visible = false; }, 5000);
              this.content = "Ya se encuentra registrado el cliente"; this.level = "danger"; this.visible = true;
            } else {
              this.confirmModal('register');
              this.ngOnInit();
            }
          },
          err => {
            console.log(err);
          }
        );

        //this.distribucionService.postInsertaCliente(this.cliente)
        //  .then((res) => {
        //    setTimeout(() => {
        //      this.visible = false;
        //    }, 5000);
        //    this.content = "Cliente nuevo agregado correctamente."; this.level = "success"; this.visible = true;
        //    this.distribucionService.getListaClientes();
        //  })
        //  .catch((err) => { console.log(err); this.content = "Ya se encuentra registrado el cliente"; this.level = "danger"; this.visible = true });

      } else if (this.cliente.clienteId > 0) {
        this.actualizarRamClientes();
        this.distribucionService.postActualizarCliente(this.cliente).subscribe(
          res => {
            this.confirmModal('update');
            this.ngOnInit();
          },
          err => {
            console.log(err);
          }
        );
      }
      this.estado = 'Agregar';
      this.clase = 'primary';
      this.cliente.clienteId = 0;
      this.cliente.clienteAddress = null;
      this.cliente.clienteName = null;
      this.cliente.clientePhone = null;
      this.cliente.sectorId = null;
    } catch (e) {
      console.log(e);
    }
  }
  ocultarMensaje() {
    this.visible = false
  }
  cancelar() {
    this.estado = 'Agregar';
    this.clase = 'primary';
    this.cliente.clienteId = 0;
    this.cliente.clienteName = null;
    this.cliente.clienteAddress = null;
    this.cliente.clientePhone = null;
    this.cliente.sectorId = null;
  }

  actualizarRamClientes() {
    this.dataTempClientes.forEach(x => {
      if (x.clienteId == this.cliente.clienteId) {
        x.clienteName = this.cliente.clienteName;
        x.clientePhone = this.cliente.clientePhone;
        x.sectorId = this.cliente.sectorId;
        x.clienteAddress = this.cliente.clienteAddress;
      }
    });
  }

  noLetrasPlus(event: any, telefono) {
    if ((isNaN(event.key)) && (event.key != "+") && (event.key.length <= 1)) {
      this.cliente.clientePhone = this.cliente.clientePhone.slice(0, (this.cliente.clientePhone.length - 1));
    }
  }

  txtClass: string;
  checkInput(input) {
    if (input == '' || input == null) {
      this.txtClass = '';
    } else {
      this.txtClass = 'active';
    }
  }


  confirmModal(opcion) {
    confirmModal(opcion, "Registrado", "El cliente se registro correctamente.", "Actualizado", "El cliente se actualizo correctamente.", "Eliminado", "El cliente se elimino correctamente.");
  }

}
