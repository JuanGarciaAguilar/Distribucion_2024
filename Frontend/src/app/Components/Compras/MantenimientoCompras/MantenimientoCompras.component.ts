import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Equivalencia } from 'src/app/Shared/Models/equivalencia';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { CiudadService } from 'src/app/Shared/Service/Ciudad.service';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { EquivalenciasService } from 'src/app/Shared/Service/Equivalencias.service';
import { ProductosService } from 'src/app/Shared/Service/Productos.service';
import { ProveedorService } from 'src/app/Shared/Service/Proveedor.service';

@Component({
  selector: 'app-MantenimientoCompras',
  templateUrl: './MantenimientoCompras.component.html',
  styleUrls: ['./MantenimientoCompras.component.css'],
  providers: [MessageService],
})
export class MantenimientoComprasComponent implements OnInit {

  private _AuthService = inject(AuthService);
  private _Router = inject(Router);
  private _messageService = inject(MessageService);
  private _EquivalenciasService = inject(EquivalenciasService);
  private _ProductosService = inject(ProductosService);
  private _ProveedorService = inject(ProveedorService);
  private _CiudadService = inject(CiudadService);

  items: MenuItem[] = [
    { icon: 'pi pi-home', route: '/' },
    { label: 'Nueva Compra' },
  ];

  DocumentoCompra = [
    { id: 1, label: 'FACTURA ELECTRONICA' },
    { id: 2, label: 'BOLETA ELECTRONICA' },
    { id: 3, label: 'NOTA DE PEDIDO' },
    { id: 4, label: 'COTIZACION' },
    { id: 4, label: 'SIN DOCUMENTO' },
  ];
  constructor() { }

  FechaCompra: string = '';
  FechaEntrega: string = '';
  CiudadSelected: any;
  ProveedorSelected: any;
  ProductoSelected: any;
  FleteUnitario: number = 0;
  CantidadCompra: number = 0;
  PrecioUnitario: number = 0;
  CostoTotalCompra: number = 0;
  SaldoAnterior: number = 0;
  Amortizacion: number = 0;
  Saldo: number = 0;
  NumeroDocumento: string = '';
  DocumentoCompraSelected: any;

  TotalCompra: number = 0;
  CostoTotalFlete: number = 0;

  cities: any;
  ComprasData: any;
  ProductoData: any;
  ProveedorData: any;
  UnidadMedidaData: any;
  CiudadData: any;


  update: boolean = false;
  equivalenciaFilter: Equivalencia[] = [];
  async ngOnInit() {
    this.ProductoData = await this._ProductosService.GetListaProductos().toPromise();
    this.UnidadMedidaData = await this._ProductosService.getListaEquivalencia().toPromise();
    this.ProveedorData = await this._ProveedorService.getProveedoresAll().toPromise();
    this.CiudadData = await this._CiudadService.getAllNewCiudad().toPromise();
    console.log('proveedor', this.ProveedorData);
    console.log('cuidad', this.CiudadData);
  }


  obtenerEquivalencia() {
    if (this.ProductoSelected.productId != null) {
      this.equivalenciaFilter = [];
      for (let i = 0; i < this.UnidadMedidaData.length; i++) {
        if (this.UnidadMedidaData[i].productId == this.ProductoSelected.productId) {
          this.UnidadMedidaData[i].bloq = false;
        } else {
          this.UnidadMedidaData[i].bloq = true;
        }
      }
      this.UnidadMedidaData.forEach((objSubcate: any) => {
        if (objSubcate.productId == this.ProductoSelected.productId) {
          this.equivalenciaFilter.push(objSubcate);
        }
      });
    }
  }



}
