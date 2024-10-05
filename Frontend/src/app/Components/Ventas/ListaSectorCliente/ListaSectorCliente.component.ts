import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ClienteModel, ClientePagosEntity } from 'src/app/Shared/Models/ClienteModel';
import { ReservaDia } from 'src/app/Shared/Models/reserva-diamodel';
import { Venta_SalidaModel } from 'src/app/Shared/Models/VentasModel';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
    selector: 'app-ListaSectorCliente',
    templateUrl: './ListaSectorCliente.component.html',
    styleUrls: ['./ListaSectorCliente.component.css'],
    providers: [MessageService,ConfirmationService],
})
export class ListaSectorClienteComponent implements OnInit {
    private _ClienteService = inject(ClienteService);
    private _ActivatedRoute = inject(ActivatedRoute);
    private _VentasService = inject(VentasService);
    private _Router = inject(Router);
    private _auth = inject(AuthService);
    private _messageService = inject(MessageService);
    private _ConfirmationService = inject(ConfirmationService);

    constructor() { }

    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Ventas por sector', route: '/Ventas/Sectores' },
        { label: 'Clientes por sector' }
    ];


    loading: boolean = true;

    searchValue: string | undefined;
    PagoDeudaModal: boolean = false;
    ClienteBySectorData: ClienteModel[] = [];
    ReservasData: ReservaDia[] = [];
    Buscar!: Date;
    ListaTotalProductos : any;
    ngOnInit() {
        this.GetClientesBySector();
        this.GetReservasSector();
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
            console.log('reservas',data);

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
    deudaActualizada: number = 0;
    FechaPago?: string = '';
    monto: number = 0;
    observacion: string = '';
    ClienteId: number = 0;

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


    GetReservas(){
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
        this._VentasService.getReservasByFecha(this.Buscar).subscribe((data:any) => {
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
      confirmarReserva(venta:any) {
        
       
      }
      ReservaSelectd :any;
      DeleteConfirm(event: Event, data: any) {
         this.ReservaSelectd = data;
        this._ConfirmationService.confirm({
          target: event.target as EventTarget,
          message: 'Desea Confirmar la reserva?',
        });
      }
    
      ConfirmarReserva(){
        this._VentasService.getVentasById(this.ReservaSelectd.ventaId).subscribe((data:any) => {
            debugger
            this.ventasobj = new Venta_SalidaModel();
            for (let row of data) {
              this.ventasobj.amortizacion = row.amortizacion;
              this.ventasobj.cantidadVenta = row.cantidadVenta; //* this.ventas[i].pesoVenta;
              this.ventasobj.pesoVenta =row.pesoVenta;
              this.ventasobj.unidadMedida = row.unidadMedida;
              this.ventasobj.clienteId = row.clienteId;
              this.ventasobj.deudaActualizada =row.deudaActualizada;
              this.ventasobj.precioIngresadoVenta = row.precioIngresadoVenta;
              this.ventasobj.precioRealVenta = row.precioRealVenta;
              this.ventasobj.productId = Number(row.productId);
              this.ventasobj.usuarioId = row.usuarioId;
              this.ventasobj.observacion = row.observacion;
              this.ventasobj.fechaVenta = row.fechaVenta;
            }
          });
          this._VentasService.postInsertaVenta(this.ventasobj).subscribe(
            (x:any) => {
              debugger;
              this._VentasService.postEliminaVenta(this.ReservaSelectd.ventaId).subscribe(
                (data:any) => {

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
            }          );
      }
    
      NotConfirm(){
         
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
    }
}
