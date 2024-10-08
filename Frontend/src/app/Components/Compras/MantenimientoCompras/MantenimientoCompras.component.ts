import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { CompraDetalleArrayModel, CompraDetalleModel, CompraModel } from 'src/app/Shared/Models/ComprasModel';
import { Equivalencia } from 'src/app/Shared/Models/equivalencia';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { CiudadService } from 'src/app/Shared/Service/Ciudad.service';
import { ComprasService } from 'src/app/Shared/Service/Compras.service';
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
  private _ComprasService = inject(ComprasService);
  private _MessageService = inject(MessageService);
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

  _FormGroup: FormGroup | undefined;

  constructor() {
    this._FormGroup = new FormGroup({
      detalleCompraId: new FormControl(null),
      ProveedorSelected: new FormControl(null, [Validators.required]),
      ProductoSelected: new FormControl(null, [Validators.required]),
      UnidadMedidaSelected: new FormControl(null, [Validators.required]),
      FleteUnitario: new FormControl(null, [Validators.required]),
      CantidadCompra: new FormControl(null, [Validators.required]),
      PrecioUnitario: new FormControl(null, [Validators.required]),
      CostoTotalCompra: new FormControl({ value: '', disabled: true }),
      SaldoAnterior: new FormControl({ value: '', disabled: true }),
      Amortizacion: new FormControl(null, [Validators.required]),
      Saldo: new FormControl({ value: '', disabled: true }),
      DocumentoCompraSelected: new FormControl(null),
      NumeroDocumento: new FormControl(null),
      Observacion: new FormControl(null),
    });
  }

  FechaCompra!: Date;
  FechaEntrega!: Date;
  CiudadSelected: any;

  ProveedorSelected: any;
  ProductoSelected: any;
  UnidadMedidaSelected: any;
  FleteUnitario: number = 0;
  CantidadCompra!: number;
  PrecioUnitario!: number;
  CostoTotalCompra: number = 0;
  SaldoAnterior: number = 0;
  Amortizacion: number = 0;
  Saldo: number = 0;
  NumeroDocumento: string = '';
  DocumentoCompraSelected: any;
  Observacion: string = '';

  MontoTotalCompra: number = 0;
  CostoTotalFlete: number = 0;

  cities: any;
  ComprasData: any[] = [];
  ProductoData: any;
  ProveedorData: any;
  UnidadMedidaData: any;
  CiudadData: any;


  update: boolean = false;
  equivalenciaFilter: Equivalencia[] = [];
  async ngOnInit() {
    this.GetProductos();
    this.UnidadMedidaData = await this._ProductosService.getListaEquivalencia().toPromise();
    this.ProveedorData = await this._ProveedorService.getProveedoresAll().toPromise();
    this.CiudadData = await this._CiudadService.getAllNewCiudad().toPromise();
    console.log('proveedor', this.ProveedorData);
    console.log('cuidad', this.CiudadData);
  }

  async GetProductos() {
    let data = await this._ProductosService.GetListaProductos().toPromise();


    this.ProductoData = data.filter((f: any) => f.productParentId !== 0);
    console.log('productos', this.ProductoData);
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

  CompraDetalleTemp!: CompraDetalleArrayModel;

  AgregarProductos() {

    for (let row of this.ComprasData) {
      if (row.ProductoName.includes(this.ProductoSelected.productName)) {
        this._MessageService.add({
          severity: 'error'
          , summary: 'Error al Guardar Producto'
          , detail: 'Producto ya se encuentra registrado'
          , key: 'Notificacion'
          , life: 5000
        });
        return;
      }
    }

    if (this.CantidadCompra == 0) {
      this._MessageService.add({
        severity: 'error'
        , summary: 'Error en la cantidad de la compra'
        , detail: 'La cantidad no puede ser 0'
        , key: 'Notificacion'
        , life: 5000
      });
      return;
    }

    this.CompraDetalleTemp = new CompraDetalleArrayModel();
    this.CompraDetalleTemp.proveedorId = this.ProveedorSelected.proveedorId;
    this.CompraDetalleTemp.ProveedorName = this.ProveedorSelected.proveedorName;
    this.CompraDetalleTemp.productId = this.ProductoSelected.productId;
    this.CompraDetalleTemp.ProductoName = this.ProductoSelected.productName;
    this.CompraDetalleTemp.unidadMedida = this.UnidadMedidaSelected.unidadBase.trim();
    this.CompraDetalleTemp.cantidadCompra = this.CantidadCompra;
    this.CompraDetalleTemp.precioUnitario = this.PrecioUnitario;
    this.CompraDetalleTemp.precioCompra = this.PrecioUnitario * this.CantidadCompra;
    this.CompraDetalleTemp.totalDeposito = this.Amortizacion;
    this.CompraDetalleTemp.saldoDeposito = this.Saldo;
    this.CompraDetalleTemp.compraEstado = 2;
    this.CompraDetalleTemp.costoFleteItemCompra = this.FleteUnitario;
    this.CompraDetalleTemp.documentoCompra = this.DocumentoCompraSelected.label;
    this.CompraDetalleTemp.numeroDocumento = this.NumeroDocumento;
    this.CompraDetalleTemp.Observacion = this.Observacion;
    //this.newCompra.compraDetalleTabla.push(this.newCompraDetalle);
    this.ComprasData.push(this.CompraDetalleTemp);
  }

  calcularSaldo() {
    debugger
    //  this.Saldo = 0;
    if (this.Amortizacion == 0 || this.Amortizacion == undefined) {
      this.Saldo = parseFloat(
        (this.CantidadCompra * this.PrecioUnitario + this.SaldoAnterior).toFixed(2)
      );
    } else {
      this.Saldo = this.Saldo - this.Amortizacion;
      if (this.Saldo == 0) {
        this.Amortizacion = 0;
      }
    }
  }

  calcularCostoTotal() {
    if (
      this.PrecioUnitario == null ||
      this.CantidadCompra == null ||
      this.PrecioUnitario.toString() == "" ||
      this.CantidadCompra.toString() == ""
    ) {
      this.PrecioUnitario = 0;
    } else {
      this.CostoTotalCompra = parseFloat(
        (this.PrecioUnitario * this.CantidadCompra).toFixed(2)
      );
      //  this.setSaldoAnterior();
      this.calcularSaldo();
    }
  }

  SaldoAnteriorData: any;
  getSaldoAnterior() {
    if (this.ProductoSelected.productId !== '' && this.ProveedorSelected.proveedorId !== '') {
      this._ComprasService
        .getCompraSaldoAnterior(this.ProductoSelected.productId, this.ProveedorSelected.proveedorId).subscribe((data: any) => {
          this.SaldoAnterior = data;
        });
    }
  }

  SelectedCompraData(data: any) {
    console.log('data seleccionada', data);

  }

  DeleteItem(data: any) {
    this.ComprasData.splice(this.ComprasData.find((item: any, index: any) => {
      if (item.ProveedorName == data.ProveedorName && item.ProductoName == data.ProductoName && item.Observacion == data.Observacion) {
        return index
      }
    }), 1);
  }

  CalcularTotales() {
    this.CostoTotalFlete = 0;
    this.MontoTotalCompra = 0;
    for (let row of this.ComprasData) {
      this.CostoTotalFlete += row.costoFleteItemCompra * row.cantidadCompra;
      this.MontoTotalCompra += row.precioCompra;
    }
  }

  CompraDetalleData!: CompraDetalleArrayModel;
  CompraData = new CompraModel;
  InsertCompra() {

    if (this.FechaCompra == undefined) {
      this._MessageService.add({
        severity: 'error'
        , summary: 'Campos vacios'
        , detail: 'fecha de compra no puede ir vacio'
        , key: 'Notificacion'
        , life: 5000
      });
      return
    }

    if (this.FechaEntrega == undefined) {
      this._MessageService.add({
        severity: 'error'
        , summary: 'Campos vacios'
        , detail: 'fecha de entrega no puede ir vacio'
        , key: 'Notificacion'
        , life: 5000
      });
      return
    }

    if (this.CiudadSelected == undefined) {
      this._MessageService.add({
        severity: 'error'
        , summary: 'Campos vacios'
        , detail: 'seleccione el origen de compra'
        , key: 'Notificacion'
        , life: 5000
      });
      return
    }

    if (this.ComprasData.length == 0){
      this._MessageService.add({
        severity: 'error'
        , summary: 'No existe producto'
        , detail: 'Registre productos  a comprar'
        , key: 'Notificacion'
        , life: 4000
      });
      return
    }
debugger
    this.CompraData = new CompraModel();
    this.CompraDetalleData = new CompraDetalleArrayModel();
    this.CompraData.fechaCompra = this.FechaCompra;
    this.CompraData.fechaEntrega = this.FechaEntrega;
    this.CompraData.origenCompra = this.CiudadSelected.ciudadId;
    this.CompraData.usuarioId = this._AuthService.GetUsuario().usuarioId;
    for (let row of this.ComprasData) {
      this.CompraDetalleData.proveedorId = row.proveedorId;
      this.CompraDetalleData.productId = row.productId;
      this.CompraDetalleData.compraId = 0;
      this.CompraDetalleData.cantidadCompra = row.cantidadCompra;
      this.CompraDetalleData.unidadMedida = row.unidadMedida;
      this.CompraDetalleData.precioUnitario = row.precioUnitario;
      this.CompraDetalleData.precioCompra = row.precioCompra;
      this.CompraDetalleData.totalDeposito = row.totalDeposito;
      this.CompraDetalleData.saldoDeposito = row.saldoDeposito;
      this.CompraDetalleData.costoFleteItemCompra = row.costoFleteItemCompra;
      this.CompraDetalleData.documentoCompra = row.documentoCompra;
      this.CompraDetalleData.numeroDocumento = row.numeroDocumento;
      this.CompraDetalleData.compraEstado = 2;
      this.CompraDetalleData.Observacion = row.Observacion;
      this.CompraData.compraDetalleTabla.push(this.CompraDetalleData);
      this.CompraData.costoFlete += row.costoFleteItemCompra * row.cantidadCompra;
      this.CompraData.totalCompra += row.precioCompra; 
    }
    console.log(this.CompraData);

    this._ComprasService.insertNewCompra(this.CompraData).subscribe((data: any) => {
      this._MessageService.add({
        severity: 'success'
        , summary: 'Operación Exitosa'
        , detail: 'Producto registrado'
        , key: 'Notificacion'
        , life: 5000
      });
    });
  }

  Validator() {
    if (this.FechaCompra == undefined) {
      this._MessageService.add({
        severity: 'error'
        , summary: 'Campos vacios'
        , detail: 'fecha de compra no puede ir vacio'
        , key: 'Notificacion'
        , life: 5000
      });
    }

    if (this.FechaEntrega == undefined) {
      this._MessageService.add({
        severity: 'error'
        , summary: 'Campos vacios'
        , detail: 'fecha de entrega no puede ir vacio'
        , key: 'Notificacion'
        , life: 5000
      });
    }

    if (this.CiudadSelected == undefined) {
      this._MessageService.add({
        severity: 'error'
        , summary: 'Campos vacios'
        , detail: 'seleccione el origen de compra'
        , key: 'Notificacion'
        , life: 5000
      });
    }
  }

  Cleaning() {
    this.ProveedorSelected = [];
    this.ProductoSelected = [];
    this.UnidadMedidaSelected = [];
    this.FleteUnitario = 0;
    this.CantidadCompra = 0;
    this.PrecioUnitario = 0;
    this.CostoTotalCompra = 0;
    this.SaldoAnterior = 0;
    this.Amortizacion = 0;
    this.Saldo = 0;
    this.NumeroDocumento = '';
    this.DocumentoCompraSelected = [];
    this.Observacion = '';
  }
}
