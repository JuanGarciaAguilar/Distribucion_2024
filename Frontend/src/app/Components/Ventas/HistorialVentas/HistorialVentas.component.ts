import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MenuItem, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { ClientePagosEntity } from 'src/app/Shared/Models/ClienteModel';
import { Venta_SalidaModel, VentasTempModel } from 'src/app/Shared/Models/VentasModel';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { ComprasService } from 'src/app/Shared/Service/Compras.service';
import { ProductosService } from 'src/app/Shared/Service/Productos.service';
import { StockService } from 'src/app/Shared/Service/Stock.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
    selector: 'app-HistorialVentas',
    templateUrl: './HistorialVentas.component.html',
    styleUrls: ['./HistorialVentas.component.css'],
    providers: [MessageService, ConfirmationService],
})
export class HistorialVentasComponent implements OnInit {
    private _Auth = inject(AuthService);
    private _VentasService = inject(VentasService);
    private _Router = inject(Router);
    private _auth = inject(AuthService);
    private _messageService = inject(MessageService);
    private _ClienteService = inject(ClienteService);
    private _primengConfig = inject(PrimeNGConfig);
    private _ProductosService = inject(ProductosService);
    private _StockService = inject(StockService);
    private _ComprasService = inject(ComprasService);
    private _MessageService = inject(MessageService);

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

    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Ventas por sector', route: '/Ventas/Sectores' },
        { label: 'Clientes por sector', route: '/Ventas/SectorCliente/' + this._Auth.GetSectoresData().sectorId },
        { label: 'Historial de Ventas' },
    ];


    VentasData: any;
    loading: boolean = true;
    ////////////// Ediotar venta

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

    EditarReservaModal: boolean = false;

    Reservar_Modal: boolean = false;
    FechaReservaModal!: Date;
    ClienteId: number = this._auth.GetVentasData().clienteId;
    //////////////////////////////
    EquivalenciaData: any;
    EquivalenciaDataFilter: any[] = [];
    amortizacionlast: any;
    VentaDataTemporalObjeto!: VentasTempModel;
    VentaDataTemporal: any[] = [];
    cantidadObjetos_db: number = 0;

    ReservaSelectd: any;

    DeudaByClienteLoad: Message[] = [
        {
            severity: 'info',
            detail: 'Deuda Acumulada:  S/. ' + this._auth.GetVentasData().deudaActualizada,
        },
    ];

    ngOnInit() {
        this.ClienteName = [
            {
                severity: 'success',
                detail:
                    'Cliente:  ' +
                    '  ' +
                    this._Auth.GetVentasData().clienteName,
            },
        ];
        this.GetHistorialVentas();
        this.GetCargarDatosGenerales();
    }


    GetHistorialVentas() {
        this._VentasService
            .getListaVentasByCliente(this._Auth.GetVentasData().clienteId)
            .subscribe(
                (data) => {
                    this.VentasData = data;
                    console.log(data);

                    this.loading = false;
                },
                (error) => {
                    this.loading = false;
                }
            );
    }


    async obtenerdeuda() {
        let data = await this._ClienteService.getDeudaAnteriorByClient(this._auth.GetVentasData().clienteId).toPromise();
        this.DeudaByCliente = Number(data);

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

    CalcularTotalVenta() {
        this.TotalVentas = 0;
        for (let row of this.VentaDataTemporal) {
            this.TotalVentas += row.amortizacion;
        }
    }


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
                    x.unidadBase == this.unidadMedidaSelected.unidadBase &&
                    x.estado == true
                )[0].cantidadObjetos
            ).toFixed(2));
        });
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
    CantidadActualStock: number = 0;
    cargar() {
        this._ComprasService.getComprasMax(this.productoSelected.productId, this.unidadMedidaSelected.unidadBase).subscribe((data: any) => {
            this.cantidadObjetos_db = data[0].cantidadObjetos;
            debugger
            this.CostoCompra = Number(data[0].costo.toFixed(2));
            this.CantidadActualStock = data[0].cantidadActualStock;
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
    TitleBoton: string = '';
    ReservaOperacionModal: boolean = false;
    TitleModal: String = '';
    MensajeModal: string = '';
    Var_Operacion: number = 0;
    OpenModal(data: any, Operacion: number) {
        this.ReservaSelectd = data;
        console.log(data);

        if (Operacion === 1) {
            this.ReservaOperacionModal = true;
            this.TitleModal = 'Eliminar Venta';
            this.MensajeModal = 'Desea Eliminar la venta seleccionada';
            this.Var_Operacion = Operacion;
            this.TitleBoton = 'Si, Eiminar';
        }


        if (Operacion === 2) {
            debugger
            this.unidadMedidaSelected = [];
            this.EquivalenciaDataFilter = [];
            this.EquivalenciaData.forEach((equi: any) => {
                if (equi.productId == data.productId.productId) {
                    this.EquivalenciaDataFilter.push(equi);
                }
            });
            this.EditarReservaModal = true;
            this.cantidadPV = data.cantidadVenta;
            this.productoSelected = this.ProductosData.find((f: any) => f.productId == data.productId.productId);
            this.unidadMedidaSelected = this.EquivalenciaDataFilter.find((f: any) => f.unidadBase.trim() == data.unidadMedida.trim());
            this.precioPV = data.precioIngresadoVenta / data.cantidadVenta;
            // this.cantidadObjetos_db = data.pesoVenta;
            this.totalPV = data.precioIngresadoVenta;
            this.amortizacion = data.amortizacion;
            this.observacion = data.observacion;
            this.FechaVenta = data.fechaReserva;
            this.cambiarStockUnidadMedida();
            this.cargar();
        }



    }

    TotalVentas: number = 0;
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

    eliminarVenta() {
        try {
          this._VentasService.postEliminaVenta(Number(this.ReservaSelectd.ventaId)).subscribe(
            (data:any) => { 
              this.GetHistorialVentas();
            });
        } catch (e) {
          console.log("Error" + e);
        }
      }
    

    UpdateVenta() {
        debugger
        var cantidadequivalencia = this.cantidadObjetos_db;
        var stockactual = this.CantidadActualStock; //traer stock

        if (cantidadequivalencia == 1) {
            var cantidadactual: any = this.ReservaSelectd.cantidadVenta;
        } else {
            var cantidadactual: any = this.ReservaSelectd.cantidadVenta * cantidadequivalencia;
        }

        var cantidadactualmodificado = this.cantidadPV;

        var cantidadtotal = cantidadequivalencia * cantidadactualmodificado;
        var stockactualizado = stockactual + cantidadactual;

        var newstock = stockactualizado - cantidadtotal;

        var stockvalidator = stockactualizado - cantidadtotal;
        if (stockvalidator < 0) {
            this._MessageService.add({
                severity: 'info'
                , summary: 'advertencia'
                , detail: 'La cantidad Ingresada supera al stock actual'
                , key: 'Notificacion'
                , life: 5000
            });
            return;
        }
        const data = new Venta_SalidaModel();

        data.amortizacion = this.ReservaSelectd.amortizacion;
        data.cantidadVenta = this.cantidadPV;
        data.clienteId = parseFloat(this.ReservaSelectd.clienteId);
        data.deudaActualizada = this.deudaAnterior;
        data.unidadMedida = this.unidadMedidaSelected.unidadBase;
        data.precioIngresadoVenta = this.totalPV;
        data.precioRealVenta = 0;
        data.productId = this.productoSelected.productId;
        data.ventaId = this.ReservaSelectd.ventaId;
        data.observacion = this.observacion;
        data.pesoVenta = newstock;
        this._VentasService.updateVenta(data).subscribe(
            (x: any) => {
                this._MessageService.add({
                    severity: 'success'
                    , summary: 'Operacion Exitosa'
                    , detail: 'Reserva Actualizada correctamente'
                    , key: 'Notificacion'
                    , life: 5000
                });
                this.ClearField();
            });
    }

    CloseModal() {
        this.ReservaOperacionModal =false;
    }


}
