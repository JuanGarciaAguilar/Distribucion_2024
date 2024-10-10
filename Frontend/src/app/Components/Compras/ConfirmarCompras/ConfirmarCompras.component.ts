import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
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
    ComprasDetalleSelected: any;
    ComprasTemp: any[] = [];
    // ProductosData:any;

    FechaCompra: string = '';
    FechaEntrega: string = '';
    Ciudad: string = '';
    TotalCompra: number = 0;
    TotalFlete: number = 0;
    EditarCompraModal: boolean = false;


    /*     FechaCompra!: Date;
        FechaEntrega!: Date; */
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
    dataCiudades:any;
    async ngOnInit() {
        let ProductosData: any = await this._ProductosService.GetListaProductos().toPromise();
        let ProveedorData: any = await this._ProveedorService.getProveedoresAll().toPromise();
        this.ComprasTemp.push(this._AuthService.GetCompraData());
       

        this.dataCiudades = await this._CiudadService.getAllNewCiudad().toPromise();
        let Cuidades = this.dataCiudades.filter((f:any)=>f.ciudadId  == this.ComprasTemp[0].origenCompra);
        console.log('cudades',Cuidades);
        this.FechaCompra = this.ComprasTemp[0].fechaCompra;
        this.FechaEntrega = this.ComprasTemp[0].fechaCompra;
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
    SelectedComopra(data: any) {

        console.log('datexx', data);
        debugger
        this.ProveedorSelected = this.ProveedorData.find((f: any) => f.proveedorId == data.proveedorId);
        this.ProductoSelected = this.ProductoData.find((f: any) => f.productId == data.productId);
        this.UnidadMedidaSelected = this.equivalenciaFilter.find((f: any) => f.unidadBase == data.unidadMedida && f.productId == data.productId);
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
}
