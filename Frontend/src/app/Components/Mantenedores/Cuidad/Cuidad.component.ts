import { Component, inject, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CuidadModel } from 'src/app/Shared/Models/CuidadModel';
import { CiudadService } from 'src/app/Shared/Service/Ciudad.service';
import { UnidadMedidaService } from 'src/app/Shared/Service/UnidadMedida.service';

@Component({
  selector: 'app-Cuidad',
  templateUrl: './Cuidad.component.html',
  styleUrls: ['./Cuidad.component.css'],
  providers: [MessageService],
})
export class CuidadComponent implements OnInit {

    private _CiudadService = inject(CiudadService);
    private _MessageService = inject(MessageService);


    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Modulo de ciudades' },
    ];
  constructor() { }
  CuidadData:any
  Ciudad?: string;
  id?: number;
  ciudadObj!: CuidadModel;

  enable: boolean = true;
  hidden: boolean = true;
  hiddenInsert: boolean = false;

  ngOnInit() {
    this.loadCiudades();
  }

  loadCiudades() {
    this._CiudadService.getAllNewCiudad().subscribe(
      (data:any) => {
        this.CuidadData = data;
      } );
  }
  EditData(data:any) {
    this.hidden = false;
    this.hiddenInsert = true;
    this.Ciudad = data.ciudadName;
    this.id = data.ciudadId;
  }

  UpdateCiudad() {

    this.ciudadObj = new CuidadModel();
    this.ciudadObj.ciudadname = this.Ciudad;
    this.ciudadObj.ciudadid = this.id;

    if (this.Ciudad == "" || this.Ciudad == undefined){
        this._MessageService.add({
            severity: 'error'
            , summary: 'Campos Vacios'
            , detail: 'Ingrese la descripcion de la ciudad'
            , key: 'Notificacion'
            , life: 5000
          });
          return
    }

    for (let i = 0; i < this.CuidadData.length; i++) {
      if (this.CuidadData[i].ciudadName == this.ciudadObj.ciudadname) {
        this._MessageService.add({
            severity: 'error'
            , summary: 'Ciudad ya existe'
            , detail: 'la ciudad ya se encuentra registrada'
            , key: 'Notificacion'
            , life: 5000
          });
        return;
      }
    }

    this._CiudadService
      .getAllUpdateCiudad(this.ciudadObj)
      .subscribe((data:any) => {
        this.loadCiudades();
        this.hidden = true;
        this.hiddenInsert = false;
        this._MessageService.add({
            severity: 'error'
            , summary: 'Registro Exitoso'
            , detail: 'La ciudad se actualizo correctamente'
            , key: 'Notificacion'
            , life: 5000
          });
      });
  }


  InsertCiudad() {

    if (this.Ciudad == "" || this.Ciudad == undefined){
        this._MessageService.add({
            severity: 'error'
            , summary: 'Campos Vacios'
            , detail: 'Ingrese la descripcion de la nueva ciudad'
            , key: 'Notificacion'
            , life: 5000
          });
          return
    }
    this.ciudadObj = new CuidadModel();
    this.ciudadObj.ciudadname = this.Ciudad;

    for (let i = 0; i < this.CuidadData.length; i++) {
      if (this.CuidadData[i].ciudadName == this.ciudadObj.ciudadname) {
        this._MessageService.add({
            severity: 'error'
            , summary: 'Ciudad ya existe'
            , detail: 'la ciudad ya se encuentra registrada'
            , key: 'Notificacion'
            , life: 5000
          });
        return;
      }
    }

    this._CiudadService
      .getAllInsertCiudad(this.ciudadObj)
      .subscribe((data:any) => {
        this._MessageService.add({
            severity: 'error'
            , summary: 'Registro Exitoso'
            , detail: 'La ciudad se registro correctamente'
            , key: 'Notificacion'
            , life: 5000
          });
        this.loadCiudades();
      });
  }
}
