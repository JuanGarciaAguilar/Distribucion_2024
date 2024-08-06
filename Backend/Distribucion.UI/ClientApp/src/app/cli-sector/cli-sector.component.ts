import { Component, OnInit } from '@angular/core';
import { DistribucionService } from '../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject';
import { NgModule } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Cliente } from '../Shared/Cliente';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControlName } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import { forEach } from '@angular/router/src/utils/collection';

declare function openModal(state: string): any;
declare function closeModal(state: string): any;


@Component({
  selector: 'app-cli-sector',
  templateUrl: './cli-sector.component.html',
  styleUrls: ['./cli-sector.component.css']
})
export class CliSectorComponent implements OnInit {
  sect: string;
  searchString: string = '';
  
  constructor(public distribucionService: DistribucionService, private route: ActivatedRoute, private router: Router,) { }
  cliente1: Cliente;
  preloadingState: boolean = false;
  sumaDeuda: number = 0;
  actualizarIsDisabled: boolean = false;

  public dataTempClientexSector: any[] = [];
  tablaClientes: any[] = [];
  ngOnInit() {
    this.distribucionService.currentCliente.subscribe(c => this.cliente1 = c);
    let sector = this.route.snapshot.paramMap.get('sectorURL');
    this.sect = sector;
    this.preloadingState = true;
    this.listaSector();
    this.distribucionService.getclientesBySector(sector).subscribe(
      data => {
        this.dataTempClientexSector = data;
        this.tablaClientes = Object.assign([], this.dataTempClientexSector);
        //this.dataTemp = this.dataTemp.filter(f => f.userStatus != 'INACTIVE');
        //this.loadItems();
        this.dataTempClientexSector.forEach(x => {
          this.sumaDeuda = this.sumaDeuda + x.deudaActualizada;
        });        
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
  }

  sectores: any[] = [];
  nombreSector: string;
  listaSector() {
    this.distribucionService.getListaSector().subscribe(
      data => {
        this.sectores = data;
        this.sectores.forEach(x => {
          if (x.sectorId == this.sect) {
            this.nombreSector = x.sectorName;
          }
        });
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
  }

  botonBuscar() {
    if (this.tablaClientes.length == 0) {
      this.tablaClientes = Object.assign([], this.dataTempClientexSector);
    }
    else {
      this.tablaClientes = Object.assign([], this.dataTempClientexSector);
      this.tablaClientes = this.dataTempClientexSector.filter(
        cliente => cliente.clienteName == this.searchString
      );
    }

  }

  getCliente(cliente) {
    this.distribucionService.changeCliente(cliente);
  }

  idClientePago: number;
  nombreClientePago: string;
  deudaActualizada: number;
  importePago: number;
  pasaDataPago(idCliente, nombreCliente, deudaActualizada) {
    this.actualizarIsDisabled = false;
    this.idClientePago = idCliente;
    this.nombreClientePago = nombreCliente;
    this.deudaActualizada = deudaActualizada;
    this.importePago = null;
  }

  clienteD = new Cliente();
  actualizaDeuda(idCliented, monto) {
    try {
      this.actualizarIsDisabled = true;
      this.distribucionService.postActualizaDeudaCliente(idCliented, monto).subscribe(x => {
        console.log(x);
        this.importePago = null;
        this.actualizarIsDisabled = false;
      });
      for (let i = 0; i < this.dataTempClientexSector.length; i++) {
        if (this.dataTempClientexSector[i].clienteId == idCliented) {
          this.dataTempClientexSector[i].deudaActualizada = this.dataTempClientexSector[i].deudaActualizada - monto; 
        }
      }
      this.importePago = null;
    } catch (e) {
      console.log(e);
    }
  }

  comprobarImporte(importePago) {
    if (importePago > this.deudaActualizada || importePago < 0) {
      this.importePago = null;
    }
  }

  openMod(state) {
    openModal(state);
  }

  closeMod(state) {
    closeModal(state);
  }



}
