import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { CompraDetalleModel, CompraModel } from 'src/app/Shared/Models/ComprasModel';
import { Equivalencia } from 'src/app/Shared/Models/equivalencia';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { CiudadService } from 'src/app/Shared/Service/Ciudad.service';
import { ComprasService } from 'src/app/Shared/Service/Compras.service';
import { EquivalenciasService } from 'src/app/Shared/Service/Equivalencias.service';
import { ProductosService } from 'src/app/Shared/Service/Productos.service';
import { ProveedorService } from 'src/app/Shared/Service/Proveedor.service';

@Component({
    selector: 'app-ConfirmarCompras',
    templateUrl: './ConfirmarCompras.component.html',
    styleUrls: ['./ConfirmarCompras.component.css'],
    providers: [MessageService],
})
export class ConfirmarComprasComponent implements OnInit {
    items: MenuItem[] = [
        { icon: 'pi pi-home', route: '/' },
        { label: 'Confirmar Compras Pendientes' },
    ];

    private _ComprasService = inject(ComprasService);
    private _ProductosService = inject(ProductosService);
    private _ProveedorService = inject(ProveedorService);
    private _Router = inject(Router);
    private _AuthService = inject(AuthService);
    private _MessageService = inject(MessageService);
    private _CiudadService = inject(CiudadService);

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
            FechaCompra: new FormControl(null, [Validators.required]),
            FechaEntrega: new FormControl(null, [Validators.required]),
            CiudadSelected: new FormControl(null, [Validators.required]),
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
    ComprasData: any[] = [];
    ComprasDetalleSelected!: any;
    ComprasTemp: any[] = [];
    // ProductosData:any;

    FechaCompra!: Date;
    FechaEntrega!: Date;
    Ciudad: string = '';
    TotalCompra: number = 0;
    TotalFlete: number = 0;
    EditarCompraModal: boolean = false;

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
    ProductoData: any;
    ProveedorData: any;
    UnidadMedidaData: any;
    CiudadData: any;
    equivalenciaFilter: Equivalencia[] = [];
    dataCiudades: any;
    async ngOnInit() {

        let ProductosData: any = await this._ProductosService.GetListaProductos().toPromise();
        let ProveedorData: any = await this._ProveedorService.getProveedoresAll().toPromise();
        this.ComprasTemp.push(this._AuthService.GetCompraData());

        this.dataCiudades = await this._CiudadService.getAllNewCiudad().toPromise();
        let Cuidades = this.dataCiudades.filter((f: any) => f.ciudadId == this.ComprasTemp[0].origenCompra);
        console.log('cudades', Cuidades);
        this.FechaCompra = this.ComprasTemp[0].fechaCompra;
        this.FechaEntrega = this.ComprasTemp[0].fechaEntrega;
        this.Ciudad = Cuidades[0].ciudadName;
        this.TotalCompra = this.ComprasTemp[0].totalCompra;
        this.TotalFlete = this.ComprasTemp[0].costoFlete;
        for (let row of this.ComprasTemp[0].compraDetalleTabla) {

            let Producto = ProductosData.filter((f: any) => f.productId == row.productId && f.productParentId !== 0);
            let Proveedor = ProveedorData.filter((f: any) => f.proveedorId == row.proveedorId);
            row.ProductName = Producto[0].productName;
            row.ProveedorName = Proveedor[0].proveedorName;
            this.ComprasData.push(row);
        }

        this.GetProductos();
        this.UnidadMedidaData = await this._ProductosService.getListaEquivalencia().toPromise();
        this.ProveedorData = await this._ProveedorService.getProveedoresAll().toPromise();
        this.CiudadData = await this._CiudadService.getAllNewCiudad().toPromise();
    }

    async GetProductos() {
        let data = await this._ProductosService.GetListaProductos().toPromise();
        this.ProductoData = data.filter((f: any) => f.productParentId !== 0);
    }
    CompraId: number = 0;
    CompraDetalleId: number = 0;
    SelectedComopra(data: any) {
        this.CompraId = data.compraId;
        this.CompraDetalleId = data.detalleCompraId;
        this.ProveedorSelected = this.ProveedorData.find((f: any) => f.proveedorId == data.proveedorId);
        this.ProductoSelected = this.ProductoData.find((f: any) => f.productId == data.productId);
        this.CiudadSelected = this.dataCiudades.find((f: any) => f.ciudadId == this.ComprasTemp[0].origenCompra);
        this.UnidadMedidaSelected = this.UnidadMedidaData.find((f: any) => f.unidadBase == data.unidadMedida && f.productId == data.productId);
        this.FleteUnitario = data.costoFleteItemCompra;
        this.CantidadCompra = data.cantidadCompra;
        this.PrecioUnitario = data.precioUnitario;
        this.CostoTotalCompra = data.precioCompra;
        this.Amortizacion = data.totalDeposito;
        this.Saldo = data.saldoDeposito;
        this.DocumentoCompraSelected = this.DocumentoCompra.find((f: any) => f.label == data.documentoCompra)
        this.NumeroDocumento = data.numeroDocumento;
        this.EditarCompraModal = true;

    }

    field(name: string) {
        return this._FormGroup?.get(name);
    }

    UpdateCompra() {
        debugger

        if (
            this.ProductoSelected == undefined ||
            this.ProveedorSelected == undefined ||
            this.CompraDetalleId == null ||
            this.CompraId == null ||
            this.CantidadCompra == null ||
            this.UnidadMedidaSelected == undefined ||
            this.PrecioUnitario == null ||
            this.CostoTotalCompra == null ||
            this.DocumentoCompraSelected == undefined ||
            this.Amortizacion == undefined ||
            this.FleteUnitario == undefined
        ) {
            this._MessageService.add({
                severity: 'error'
                , summary: 'Error'
                , detail: 'Campos Vacios'
                , key: 'Notificacion'
                , life: 5000
            });
            return;
        }
        const datacompra = new CompraModel();
        datacompra.fechaCompra = this.field("FechaCompra")?.value == null ? this.FechaCompra : this.field("FechaCompra")?.value;
        datacompra.fechaEntrega = this.field("FechaEntrega")?.value == null ? this.FechaEntrega : this.field("FechaEntrega")?.value;
        datacompra.origenCompra = this.CiudadSelected.ciudadId;


        datacompra.compraId = this.CompraId;
        const data = new CompraDetalleModel();
        data.productId = this.ProductoSelected.productId;
        data.proveedorId = this.ProveedorSelected.proveedorId;
        data.detalleCompraId = this.CompraDetalleId;
        data.compraId = this.CompraId;
        data.cantidadCompra = this.CantidadCompra;
        data.unidadMedida = this.UnidadMedidaSelected.unidadBase;
        data.precioUnitario = this.PrecioUnitario;
        data.precioCompra = this.CostoTotalCompra;
        data.totalDeposito = this.Amortizacion;
        data.saldoDeposito = this.Saldo;
        data.costoFleteItemCompra = this.FleteUnitario;
        data.documentoCompra = this.DocumentoCompraSelected.label;
        data.numeroDocumento = this.NumeroDocumento;
        ///variable declarada para almacenar el valor del flete total
        data.pesoCompra = this.FleteUnitario;

        this._ComprasService.updateCompraDetalle(data).subscribe(
            (x: any) => {
                this._ComprasService.updateCompraFechas(datacompra).subscribe((Z: any) => {
                    this._MessageService.add({
                        severity: 'error'
                        , summary: 'Operación Exitosa'
                        , detail: 'Compra Actualizada Correctamente'
                        , key: 'Notificacion'
                        , life: 5000
                    });

                    this._AuthService.DestroyData("CompraData");
                    this._Router.navigate(['/Compras/Historial']);
                });
            });
    }

    calcular() {
        this.CostoTotalCompra = this.CantidadCompra * this.PrecioUnitario;
        this.Saldo = this.CostoTotalCompra - this.Amortizacion;
    }

    ConfirmarCompras() {

        const Data = new CompraModel();

        for (let row of this.ComprasTemp) {
            Data.compraId = row.compraId;
            Data.compraStatus = row.compraStatus;
            Data.costoFlete = row.costoFlete;
            Data.fechaCompra = row.fechaCompra;
            Data.fechaEntrega = row.fechaEntrega;
            Data.Observacion = row.observacion;
            Data.origenCompra = row.origenCompra;
            Data.totalCompra = row.totalCompra;
            Data.usuarioId = row.usuarioId;


            for (let child of row.compraDetalleTabla) {
                for (let selected of this.ComprasDetalleSelected) {
                    if (selected.compraEstado == 2) {
                        child.compraEstado = 1
                    } else{
                        child.compraEstado = 2
                    }

                }
                Data.compraDetalleTabla.push(child);
            }


        }



        this._ComprasService.confirmarCompra(Data).subscribe(
            (res: any) => {
                this._AuthService.DestroyData("CompraData");
                this._Router.navigate(['/Compras/Historial']);
            })
    }
}
