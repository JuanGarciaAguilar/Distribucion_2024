import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import * as moment from 'moment';
import { ConfirmationService, MenuItem, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Venta_SalidaModel, VentaEntity, VentasModel, VentasTempModel } from 'src/app/Shared/Models/VentasModel';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { ComprasService } from 'src/app/Shared/Service/Compras.service';
import { ProductosService } from 'src/app/Shared/Service/Productos.service';
import { StockService } from 'src/app/Shared/Service/Stock.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-MantemientoVentas',
  templateUrl: './MantemientoVentas.component.html',
  styleUrls: ['./MantemientoVentas.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class MantemientoVentasComponent implements OnInit {

  @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [{ label: 'Ventas' }, { label: 'Lista Clientes' }, { label: 'Nueva Venta' }];

  private _primengConfig = inject(PrimeNGConfig);
  private _auth = inject(AuthService);
  private _ProductosService = inject(ProductosService);
  private _VentasService = inject(VentasService);
  private _StockService = inject(StockService);
  private _ComprasService = inject(ComprasService);
  private _Router = inject(Router);
  private _ClienteService = inject(ClienteService);
  private _MessageService = inject(MessageService);
  private _ConfirmationService = inject(ConfirmationService);

  _FormGroup: FormGroup;

  FechaVenta: string = '';
  precioPV: number = 0;
  productoSelected: any;
  totalPV: number = 0;
  unidadMedidaSelected: any;
  amortizacion: number = 0;
  cantidadPV: number = 0;
  observacion: string = '';
  stockActual: number = 0;
  CostoCompra: number = 0;

  deudaActualizada: number = 0;
  deudaAnterior: number = 0;
  DeudaByCliente: number = 0;
  ClienteName: Message[] = [
    {
      severity: 'info',
      detail: 'Cliente:  ' + this._auth.GetVentasData().clienteName,
    },
  ];

  DeudaByClienteLoad: Message[] = [
    {
      severity: 'info',
      detail: 'Deuda Acumulada:  S/. ' + this._auth.GetVentasData().deudaActualizada,
    },
  ];

  Reservar_Modal: boolean = false;
  FechaReservaModal!: Date;
  ClienteId: number = this._auth.GetVentasData().clienteId;
  constructor() {

    this._FormGroup = new FormGroup({
      FechaVenta: new FormControl(null),
      stockActual: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.min(0.0)]),
      cantidadPV: new FormControl(null, [Validators.required]),
      productoSelected: new FormControl(null, [Validators.required]),
      unidadMedidaSelected: new FormControl("", [Validators.required]),
      precioPV: new FormControl(null, [Validators.required]),
      totalPV: new FormControl(null, [Validators.required, Validators.min(0)]),
      amortizacion: new FormControl(null, [Validators.required, Validators.min(0)]),
      observacion: new FormControl(null),
      CostoCompra: new FormControl({ value: '', disabled: true }),
    });
  }

  products: any;
  ngOnInit() {
    this._primengConfig.ripple = true;
    this.GetCargarDatosGenerales();
    this.obtenerdeuda();
  }


  actualizarDeudaActualizada() {
    try {
      if (this.amortizacion == 0 || this.amortizacion == null) {
        this.deudaActualizada = this.totalPV + this.deudaAnterior;
      } else {
        this.deudaActualizada = this.totalPV + this.deudaAnterior - this.amortizacion;
      }
    } catch (e) {
      console.log(e);
    }
  }

  calcularTotal() {
    let calculo = (this.cantidadPV * this.precioPV).toFixed(2);
    this.totalPV = parseFloat(calculo);
  }

  /* handleFilter(value) {
    this.productoent = this.dataTempProducto.filter(
      (s) => s.productName.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  } */

  public seleccionaProducto() {

    this.unidadMedidaSelected = [];
    /*  let ProductDescripcion = this.dataTempProducto.filter(
       (f: any) => f.productId == productId
     ); */

    this.precioPV = 0;
    // this.stockActual = 0;
    this.totalPV = 0;
    this.amortizacion = 0;
    /* this.productoId = productId;
    this.productoName = ProductDescripcion[0].productName; */

    /*  this.actualizar = true;
     this.readonly = false; */
    // this.obtenerEquivalencia(this.productoSelected.productId);
    /*  this.getDeudaAnterior(this.productoSelected.productId); */

    ///////// Obtenemos Equivalencias
    this.EquivalenciaDataFilter = [];

    this.EquivalenciaData.forEach((data: any) => {
      if (data.productId == this.productoSelected.productId) {
        this.EquivalenciaDataFilter.push(data);
      }
    });
    //////////////////////////////////////////////

    // this.obtenerstockproducto(this.productoSelected.productId);

  }

  cambiarStockUnidadMedida() {

    this._StockService.getStockByProductId(this.productoSelected.productId).subscribe((data: any) => {

      //this.stockActualTemp = data.stock;
      /* if (this.unidadMedidaSelected !== null || this.unidadMedidaSelected !== undefined) {
        this.cambiarStockUnidadMedida();
      } */

      this.stockActual = parseFloat((
        data.stock /
        this.EquivalenciaData.filter((x: any) => x.productId == this.productoSelected.productId &&
          x.unidadBase.trim() == this.unidadMedidaSelected.unidadBase.trim() &&
          x.estado == true
        )[0].cantidadObjetos
      ).toFixed(2));
    });
  }

  cargar() {
    this._ComprasService.getComprasMax(this.productoSelected.productId, this.unidadMedidaSelected.unidadBase.trim()).subscribe((data: any) => {
      this.cantidadObjetos_db = data[0].cantidadObjetos;;
      this.CostoCompra = Number(data[0].costo.toFixed(2));
    });
  }

  VALIDAD_STOCK() {
    if (this._auth.GetVentasData().ventaId == null) {
      if (this.cantidadPV > this.stockActual) {
        this.cantidadPV = 0;
        this._MessageService.add({
          severity: 'info'
          , summary: 'advertencia'
          , detail: 'Cantidad supera al stock disponible'
          , key: 'Notificacion'
          , life: 5000
        });
      }
    }
  }

  ProductosData: any;
  async GetCargarDatosGenerales() {
    await this._ProductosService.GetListaProductos().subscribe((data: any) => {
      this.ProductosData = data.filter((f: any) => f.productParentId !== 0);
    });

    await this._ProductosService.getListaEquivalencia().subscribe((data: any) => {
      try {
        //  this.VentasId();
        this.EquivalenciaData = data.filter((x: any) => x.estado > 0);
        this.EquivalenciaData.fleteUnitario;
        this.amortizacionlast = this.EquivalenciaData.cantidadObjetos;
      } catch (error) { }
    });
  }

  EquivalenciaData: any;
  EquivalenciaDataFilter: any[] = [];
  amortizacionlast: any;
  VentaDataTemporalObjeto!: VentasTempModel;
  VentaDataTemporal: any[] = [];
  cantidadObjetos_db: number = 0;
  NroFila: number = 0;
  agregaProducto() {

    for (let row of this.VentaDataTemporal) {
      if (row.productName == this.productoSelected.productName) {
        this._MessageService.add({
          severity: 'error'
          , summary: 'Error al Guardar Producto'
          , detail: 'Producto ya se encuentra registrado'
          , key: 'Notificacion'
          , life: 5000
        });
        return
      }
    }

    this.NroFila = this.VentaDataTemporal.length == 0 ? 1 : this.VentaDataTemporal.length + 1;

    this.VentaDataTemporalObjeto = new VentasTempModel();
    this.VentaDataTemporalObjeto.NroFila = this.NroFila;
    this.VentaDataTemporalObjeto.cantidadVenta = this.cantidadPV;
    this.VentaDataTemporalObjeto.clienteId = this.ClienteId
    this.VentaDataTemporalObjeto.productId = this.productoSelected.productId;
    this.VentaDataTemporalObjeto.productName = this.productoSelected.productName;
    this.VentaDataTemporalObjeto.unidadMedidad = this.unidadMedidaSelected.unidadBase;
    this.VentaDataTemporalObjeto.precio = this.precioPV;
    this.VentaDataTemporalObjeto.pesoVenta = this.cantidadObjetos_db;
    this.VentaDataTemporalObjeto.precioRealVenta = this.cantidadPV * this.precioPV;
    this.VentaDataTemporalObjeto.precioIngresadoVenta = this.totalPV;
    this.VentaDataTemporalObjeto.amortizacion = this.amortizacion;
    this.VentaDataTemporalObjeto.observacion = this.observacion;
    this.VentaDataTemporalObjeto.deudaActualizada = this.DeudaByCliente + parseFloat(this.deudaActualizada.toFixed(2));

    this.VentaDataTemporal.push(this.VentaDataTemporalObjeto);
    this.ClearField();
    this.productoSelected = [];
    this.CalcularTotalVenta();
    /*  if (agrega) {
       this.noDuplicate = true;
       if (this.ventas.length < 1) {
         this.venta.deudaActualizada =
           parseFloat(this.DeudaByClient) +
           parseFloat(this.deudaActualizada.toFixed(2));
         this.ventas.push(this.venta);
         this.loadItems();
       } else {
         for (let i = 0; i < this.ventas.length; i++) {
           if (
             this.ventas[i].productId.productName ==
             this.producto.productName &&
             this.ventas[i].productId.unidadMedidad ==
             this.producto.unidadMedidad
           ) {
             this.noDuplicate = false;
           }
         }
         if (this.noDuplicate) {
           let agregaUltimaDeuda =
             this.ventas[this.ventas.length - 1].deudaActualizada;
           this.venta.deudaActualizada =
             parseFloat(total) +
             (parseFloat(agregaUltimaDeuda.toFixed(2)) - this.amortizacion);
           this.ventas.push(this.venta);
         }
       }

     } */


  }
  DeudaByClient: number = 0;
  async obtenerdeuda() {
    let data = await this._ClienteService.getDeudaAnteriorByClient(this._auth.GetVentasData().clienteId).toPromise();
    this.DeudaByCliente = Number(data);

  }

  EditVentaDataTemp(data: any) {

    this.NroFila = data.NroFila;
    this.cantidadPV = data.cantidadVenta;
    this.productoSelected = this.ProductosData.find((f: any) => f.productId == data.productId);
    this.unidadMedidaSelected = this.EquivalenciaDataFilter.find((f: any) => f.unidadBase == data.unidadMedidad);
    this.precioPV = data.precio;
    this.cantidadObjetos_db = data.pesoVenta;
    this.totalPV = data.precioIngresadoVenta;
    this.amortizacion = data.amortizacion;
    this.observacion = data.observacion;
    this.cambiarStockUnidadMedida();
    this.cargar();
  }

  UpdateVentaDataTemp() {

    this.VentaDataTemporalObjeto = new VentasTempModel();

    for (let row of this.VentaDataTemporal) {
      if (row.NroFila == this.NroFila) {
        row.cantidadVenta = this.cantidadPV;
        row.productId = this.productoSelected.productId;
        row.productName = this.productoSelected.productName;
        row.unidadMedidad = this.unidadMedidaSelected.unidadBase;
        row.precio = this.precioPV;
        row.pesoVenta = this.cantidadObjetos_db;
        row.precioRealVenta = this.cantidadPV * this.precioPV;
        row.precioIngresadoVenta = this.totalPV;
        row.amortizacion = this.amortizacion;
        row.observacion = this.observacion;
        row.deudaActualizada = this.DeudaByCliente + this.totalPV - this.amortizacion;
      }
      this.CalcularTotalVenta();
      this.ClearField();
    }
  }

  ventasobj!: Venta_SalidaModel;
  InsertVenta() {

    this.ventasobj = new Venta_SalidaModel();
    for (let row of this.VentaDataTemporal) {
      this.ventasobj.fechaVenta = this.FechaVenta == undefined ? moment().format("YYYY/MM/DD HH:mm:ss") : moment(this.FechaVenta).format("YYYY/MM/DD HH:mm:ss");
      this.ventasobj.amortizacion = row.amortizacion;
      this.ventasobj.cantidadVenta = row.cantidadVenta; //* this.ventas[i].pesoVenta;
      this.ventasobj.pesoVenta = row.cantidadVenta * row.pesoVenta;
      this.ventasobj.unidadMedida = row.unidadMedidad;
      this.ventasobj.clienteId = row.clienteId;
      this.ventasobj.deudaActualizada = row.deudaActualizada;
      this.ventasobj.precioIngresadoVenta = row.precioIngresadoVenta;
      this.ventasobj.precioRealVenta = row.precioRealVenta;
      this.ventasobj.productId = row.productId;
      this.ventasobj.usuarioId = this._auth.GetUsuario().userID;
      this.ventasobj.observacion = row.observacion;

      this._VentasService.postInsertaVenta(this.ventasobj).subscribe((data: any) => {

        this.obtenerdeuda();
        this.ClearField();
        this._MessageService.add({
          severity: 'success'
          , summary: 'Operación Exitosa'
          , detail: 'Producto registro correctamente'
          , key: 'Notificacion'
          , life: 5000
        });
      });
    }
  }
  TotalVentas: number = 0;
  CalcularTotalVenta() {
    this.TotalVentas = 0;
    for (let row of this.VentaDataTemporal) {
      this.TotalVentas += row.amortizacion;
    }
  }

  DeleteVenta() {
    this.VentaDataTemporal.splice(this.VentaDataTemporal.find((item: any, index: any) => {
      if (item.ProductoName == this.ventaSelected.ProductoName) {
        return index
      }
    }), 1);
    this.ventaSelected = [];
  }

  NotConfirm() {
    this.ventaSelected = [];
    this.confirmPopup.reject();
  }

  ventaSelected: any;
  DeleteConfirm(event: Event, data: any) {
    this.ventaSelected = data;
    this._ConfirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Desea Elimiar la venta seleccionada?',
    });
  }
  venta_salida!: Venta_SalidaModel;
  ReservaArray:Venta_SalidaModel[]=[];
  InsertReservas() {

    for (let row of this.VentaDataTemporal) {
      this.venta_salida = new Venta_SalidaModel();
      this.venta_salida.ventaId = 0;
      this.venta_salida.fechaVenta =  '2024-10-11'
      this.venta_salida.clienteId = row.clienteId;
      this.venta_salida.productId = row.productId;
      this.venta_salida.ProductName = 'gaaa';
      this.venta_salida.cantidadVenta = row.cantidadVenta;
      this.venta_salida.unidadMedida = row.unidadMedidad;
      this.venta_salida.pesoVenta = row.pesoVenta;
      this.venta_salida.precioRealVenta = row.precioRealVenta;
      this.venta_salida.precioIngresadoVenta = row.precioIngresadoVenta;
      this.venta_salida.amortizacion = row.amortizacion;
      this.venta_salida.deudaActualizada = row.deudaActualizada;
      this.venta_salida.usuarioId = this._auth.GetUsuario().userID;
      this.venta_salida.CantidadMinima = 5;
      this.venta_salida.IsReserva =true;
      this.venta_salida.FechaReserva = this.FechaReservaModal;
      this.venta_salida.observacion = row.observacion;
     
       this.ReservaArray.push(this.venta_salida);
    
    }

    console.log(this.ReservaArray);
    this._VentasService.InsertReserva(this.ReservaArray).subscribe((data: any) => {
      this._MessageService.add({
        severity: 'success'
        , summary: 'Operación Exitosa'
        , detail: 'Venta reservada correctamente'
        , key: 'Notificacion'
        , life: 5000
      });
    });
  }

  GoHistorialVentas() {
    this._Router.navigate(['/Ventas/HistorialVentas']);
    this._auth.SetVentasData(this._auth.GetVentasData());
  }

  ClearField() {
    this.precioPV = 0;

    this.totalPV = 0;
    this.unidadMedidaSelected = [];
    this.amortizacion = 0;
    this.cantidadPV = 0;
    this.observacion = '';
    this.stockActual = 0;
    this.CostoCompra = 0;

    this.productoSelected = [];
    this.cantidadObjetos_db = 0;
    this.DeudaByCliente;
  }
}
