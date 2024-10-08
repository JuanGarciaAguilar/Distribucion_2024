import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MenuItem, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ClienteModel, ClientePagosEntity } from 'src/app/Shared/Models/ClienteModel';
import { ReservaDia } from 'src/app/Shared/Models/reserva-diamodel';
import { Venta_SalidaModel, VentasTempModel } from 'src/app/Shared/Models/VentasModel';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { ComprasService } from 'src/app/Shared/Service/Compras.service';
import { ProductosService } from 'src/app/Shared/Service/Productos.service';
import { StockService } from 'src/app/Shared/Service/Stock.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
    selector: 'app-ListaSectorCliente',
    templateUrl: './ListaSectorCliente.component.html',
    styleUrls: ['./ListaSectorCliente.component.css'],
    providers: [MessageService, ConfirmationService],
})
export class ListaSectorClienteComponent implements OnInit {
    private _ClienteService = inject(ClienteService);
    private _ActivatedRoute = inject(ActivatedRoute);
    private _VentasService = inject(VentasService);
    private _Router = inject(Router);
    private _auth = inject(AuthService);
    private _messageService = inject(MessageService);
    private _ConfirmationService = inject(ConfirmationService);

    private _primengConfig = inject(PrimeNGConfig);
    private _ProductosService = inject(ProductosService);
    private _StockService = inject(StockService);
    private _ComprasService = inject(ComprasService);
    private _MessageService = inject(MessageService);
    @ViewChild(ConfirmPopup) ConfirmarPopup!: ConfirmPopup;
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
        { label: 'Clientes por sector' }
    ];


    loading: boolean = true;

    searchValue: string | undefined;
    PagoDeudaModal: boolean = false;
    TitleBoton: string = '';
    ReservaOperacionModal: boolean = false;
    EditarReservaModal: boolean = false;
    ClienteBySectorData: ClienteModel[] = [];
    ReservasData: ReservaDia[] = [];
    Buscar!: Date;
    ListaTotalProductos: any;
    TitleModal: String = '';
    MensajeModal: string = '';



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

    DeudaByClienteLoad: Message[] = [
        {
            severity: 'info',
            detail: 'Deuda Acumulada:  S/. ' + this._auth.GetVentasData().deudaActualizada,
        },
    ];

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
    NroFila: number = 0;

    ngOnInit() {
        this.GetClientesBySector();
        this.GetReservasSector();
        this._primengConfig.ripple = true;
        this.GetCargarDatosGenerales();
        this.obtenerdeuda();
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
    async GetClientesBySector() {
        let sector = this._auth.GetSectoresData().sectorId;//this._ActivatedRoute.snapshot.paramMap.get('id');
        await this._ClienteService
            .getclientesBySector(sector!)
            .subscribe((data: any) => {
                this.ClienteBySectorData = data;
                this.loading = false;
            });
    }

    async GetReservasSector() {
        await this._VentasService.getreservas().subscribe((data: any) => {
            this.ReservasData = data;
            console.log('reservas', data);

        });
    }

    async GetReservasByDate() {
        await this._VentasService.getReservasByFecha(this.Buscar!).subscribe((data: any) => {
            this.ReservasData = data;
        });
    }

    FiltrarReserva() {
        if (this.Buscar == null) {
            this.GetReservasSector();
        } else {
            this.GetReservasByDate();
        }
    }

    nombreClientePago: string = '';
    FechaPago?: string = '';
    monto: number = 0;

    ModalAdelantoOpen(data: any) {
        this.ClienteId = data.clienteId;
        this.nombreClientePago = data.clienteName;
        this.deudaActualizada = data.deudaActualizada;
        this.PagoDeudaModal = true;
    }

    ModalAdelantoClose() {
        this.PagoDeudaModal = false;
        this.CleanFields();
    }

    cliente_Ent?: ClientePagosEntity;
    InsertPagoAdelanto() {

        if (this.FechaPago == '' || this.monto === 0 || this.observacion === '') {
            this._messageService.add({
                severity: 'error'
                , summary: 'Notificacion'
                , detail: 'Campos Vacios, llene los campos correctamente'
                , key: 'Notificacion'
                , life: 5000
            });
            return
        }

        this.FechaPago = this.FechaPago == undefined ? moment().format("YYYY/MM/DD HH:mm:ss") : moment(this.FechaPago).format("YYYY/MM/DD HH:mm:ss");
        try {
            this.cliente_Ent = new ClientePagosEntity();
            this.cliente_Ent.ClienteId = this.ClienteId;
            this.cliente_Ent.DeudaActualizada = this.monto;
            this.cliente_Ent.Observacion = this.observacion;
            this.cliente_Ent.user = this._auth.GetUsuario().userID;
            this.cliente_Ent.FechaPago = moment(this.FechaPago, 'YYYY-MM-DD HH:mm:ss').toDate();
            this._ClienteService
                .postActualizaDeudaCliente(this.cliente_Ent)
                .subscribe(
                    (data: any) => {
                        this._messageService.add({
                            severity: 'success'
                            , summary: 'Notificacion'
                            , detail: 'Pago procesado correctamente'
                            , key: 'Notificacion'
                            , life: 5000
                        });
                        this.ModalAdelantoClose();
                        this.GetClientesBySector();
                        this.ModalAdelantoClose();
                    });
        } catch (error: any) {
            this._messageService.add({
                severity: 'error'
                , summary: 'Notificacion'
                , detail: error
                , key: 'Notificacion'
                , life: 5000
            });
        }
    }


    GetReservas() {
        this._VentasService.getReservasDia().subscribe((data: any) => {
            this.ReservasData = data;
            //this.loadingReservas = false;
            // this.tablaClientesReserva = Object.assign([], this.listaReservas
            /*  this.calculoTotalReserva = 0;
             if (x.length > 0) {
               for (let i = 0; i < this.listaReservas.length; i++) {
                 this.calculoTotalReserva +=
                   this.listaReservas[i].precioIngresadoVenta;
               }
             } */

            /*  this.TotalProdutoDiakendo = {
               data: this.listaReservas.slice(
                 this.state.skip,
                 this.state.skip + this.pageSize
               ),
               total: this.listaReservas.length,
             }; */
            //  this.GetReservasTotalDia();
            //  this.GetClienteSectores();
        });

    }

    getReservasByDate() {
        // this.loadingReservas = true;
        //  debugger;
        this._VentasService.getReservasByFecha(this.Buscar).subscribe((data: any) => {
            //  debugger;
            this.ReservasData = data;
            /*  this.loadingReservas = false;
       
             this.tablaClientesReserva = Object.assign([], this.listaReservas);
       
             this.calculoTotalReserva = 0;
             for (let i = 0; i < this.listaReservas.length; i++) {
               this.calculoTotalReserva += this.listaReservas[i].precioIngresadoVenta;
             }
             this.GetReservasTotalDia(); */
            //this.TotalProdutoDiakendo
        });
    }
    ventasobj!: Venta_SalidaModel;

    ReservaSelectd: any;


    ConfirmarReserva() {


        if (this.Var_Operacion === 1) {

            this._VentasService.getVentasById(this.ReservaSelectd.ventaId).subscribe((data: any) => {

                this.ventasobj = new Venta_SalidaModel();
                for (let row of data) {
                    this.ventasobj.amortizacion = row.amortizacion;
                    this.ventasobj.cantidadVenta = row.cantidadVenta; //* this.ventas[i].pesoVenta;
                    this.ventasobj.pesoVenta = row.pesoVenta;
                    this.ventasobj.unidadMedida = row.unidadMedida;
                    this.ventasobj.clienteId = row.clienteId;
                    this.ventasobj.deudaActualizada = row.deudaActualizada;
                    this.ventasobj.precioIngresadoVenta = row.precioIngresadoVenta;
                    this.ventasobj.precioRealVenta = row.precioRealVenta;
                    this.ventasobj.productId = Number(row.productId);
                    this.ventasobj.usuarioId = row.usuarioId;
                    this.ventasobj.observacion = row.observacion;
                    this.ventasobj.fechaVenta = row.fechaVenta;
                }
            });
            this._VentasService.postInsertaVenta(this.ventasobj).subscribe(
                (x: any) => {
                    debugger;
                    this._VentasService.postEliminaVenta(this.ReservaSelectd.ventaId).subscribe(
                        (data: any) => {

                            this._messageService.add({
                                severity: 'success'
                                , summary: 'Operación Exitosa'
                                , detail: 'Venta reservada correctamente'
                                , key: 'Notificacion'
                                , life: 5000
                            });

                            /*  this.showToast();
                             this.getReservasDia();
                             this.GetReservasTotalDia();
                             this.GetClienteSectores(); */
                        });

                    /*t his.showToast();
                    this.getReservasDia();
                    this.GetClienteSectores(); */
                });
        }

        if (this.Var_Operacion === 2) {
            this._VentasService.postEliminaVenta(this.ReservaSelectd.ventaId).subscribe(
                (data: any) => {
                    this._messageService.add({
                        severity: 'success'
                        , summary: 'Operación Exitosa'
                        , detail: 'Reserva Eliminada correctamente'
                        , key: 'Notificacion'
                        , life: 5000
                    });
                    this.CloseModal();
                    // this.getReservasDia();
                    //this.GetReservasTotalDia();
                });
        }

        if (this.Var_Operacion === 4) {
            let EstadoReserva:boolean = false;

            for (let item of this.ReservasData){
                this._VentasService.getVentasById(Number(item.ventaId)).subscribe((data: any) => {

                    this.ventasobj = new Venta_SalidaModel();
                    for (let row of data) {
                        this.ventasobj.amortizacion = row.amortizacion;
                        this.ventasobj.cantidadVenta = row.cantidadVenta; //* this.ventas[i].pesoVenta;
                        this.ventasobj.pesoVenta = row.pesoVenta;
                        this.ventasobj.unidadMedida = row.unidadMedida;
                        this.ventasobj.clienteId = row.clienteId;
                        this.ventasobj.deudaActualizada = row.deudaActualizada;
                        this.ventasobj.precioIngresadoVenta = row.precioIngresadoVenta;
                        this.ventasobj.precioRealVenta = row.precioRealVenta;
                        this.ventasobj.productId = Number(row.productId);
                        this.ventasobj.usuarioId = row.usuarioId;
                        this.ventasobj.observacion = row.observacion;
                        this.ventasobj.fechaVenta = row.fechaVenta;
    
                        this._VentasService.postInsertaVenta(this.ventasobj).subscribe((x: any) => {
                            this._VentasService.postEliminaVenta(Number(item.ventaId)).subscribe(
                                (data: any) => {
                                    EstadoReserva = true;
                                });
                        });
    
                        
                    }
                });
            }
            if (!EstadoReserva){
                this._messageService.add({
                    severity: 'success'
                    , summary: 'Operación Exitosa'
                    , detail: 'Venta reservada correctamente'
                    , key: 'Notificacion'
                    , life: 5000
                });
                this.CleanFields();
                this.GetReservas();
            }
            
          
        }
    }

    DeleteReserva() {

    }


    Var_Operacion: number = 0;
    OpenModal(data: any, Operacion: number) {
        this.ReservaSelectd = data; 
        console.log(data);
        
        if (Operacion === 1) {
            this.ReservaOperacionModal = true;
            this.TitleModal = 'Confirmación de la reserva';
            this.MensajeModal = 'Desea Confirmar la reserva seleccionada';
            this.Var_Operacion = Operacion;
            this.TitleBoton = 'Confirmar la Reserva';
        }

        if (Operacion === 2) {
            this.ReservaOperacionModal = true;
            this.TitleModal = 'Eliminar la reserva';
            this.MensajeModal = 'Desea Eliminar la reserva seleccionada';
            this.Var_Operacion = Operacion;
            this.TitleBoton = 'Eliminar la Reserva';
        }

        if (Operacion === 3) {
            debugger
            this.unidadMedidaSelected = [];
            this.EquivalenciaDataFilter = [];
            this.EquivalenciaData.forEach((equi: any) => {
                if (equi.productId == this.ReservaSelectd.productId) {
                    this.EquivalenciaDataFilter.push(equi);
                }
            });
            this.EditarReservaModal = true;
            this.NroFila = data.NroFila;
            this.cantidadPV = data.cantidadVenta;
            this.productoSelected = this.ProductosData.find((f: any) => f.productId == data.productId);
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

        if (Operacion === 4) {

            if (this.ReservasData.length === 0){
                this._MessageService.add({
                    severity: 'info'
                    , summary: 'advertencia'
                    , detail: '!No hay reservas a confirmar!'
                    , key: 'Notificacion'
                    , life: 5000
                });
                return;
            }

            this.ReservaOperacionModal = true;
            this.TitleModal = 'Confirmación de reservas';
            this.MensajeModal = 'Desea Confirmar todas las reservas';
            this.Var_Operacion = Operacion;
            this.TitleBoton = 'Si, Confirmar';
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
                this.GetReservas();
                this.CleanFields();
            });
    }

    ConfirmarTodo() {

    }


    CloseModal() {
        this.ReservaOperacionModal = false;
        this.ReservaSelectd = [];
    }


    OpenUpdateReservaModal(data: any) {
        this.ReservaSelectd = data;


        this.EditarReservaModal = true;
        this.CleanFields();

    }


    GoMantenimientoVentas(Data: any) {
        this._Router.navigate(['/Ventas/MantenimientoVenta']);
        this._auth.SetVentasData(Data);
    }
    GoHistorialVentas(Data: any) {
        /*   this._Router.navigate(['/Ventas/HistorialVentas'], {
             queryParams: { id: Data.ventaId },MantenimientoVenta
           }); */

        this._Router.navigate(['/Ventas/HistorialVentas']);
        this._auth.SetVentasData(Data);


    }

    GoHistorialReservas(Data: any) {
        this._Router.navigate(['/Ventas/HistorialReservas']);
        this._auth.SetVentasData(Data);
    }

    GoHistorialAnulaciones(Data: any) {
        this._Router.navigate(['/Ventas/HistorialAnulaciones']);
        this._auth.SetVentasData(Data);
    }

    CleanFields() {
        this.nombreClientePago = '';
        this.deudaActualizada = 0;
        this.FechaPago = '';
        this.monto = 0;
        this.observacion = '';
        this.ReservaSelectd=[];
    }
}
