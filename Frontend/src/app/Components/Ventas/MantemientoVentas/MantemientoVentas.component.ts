import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { VentaEntity, VentasModel, VentasTempModel } from 'src/app/Shared/Models/VentasModel';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { ClienteService } from 'src/app/Shared/Service/Cliente.service';
import { ComprasService } from 'src/app/Shared/Service/Compras.service';
import { ProductosService } from 'src/app/Shared/Service/Productos.service';
import { StockService } from 'src/app/Shared/Service/Stock.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
  selector: 'app-MantemientoVentas',
  templateUrl: './MantemientoVentas.component.html',
  styleUrls: ['./MantemientoVentas.component.css'],
  providers: [MessageService],
})
export class MantemientoVentasComponent implements OnInit {
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
  items: MenuItem[] = [{ label: 'Ventas' }, { label: 'Lista Clientes' }, { label: 'Nueva Venta' }];

  private _auth = inject(AuthService);
  private _ProductosService = inject(ProductosService);
  private _VentasService = inject(VentasService);
  private _StockService = inject(StockService);
  private _ComprasService = inject(ComprasService);
  private _ClienteService = inject(ClienteService);
  private _MessageService = inject(MessageService);

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


  constructor() {

    console.log('modulo historial ventas', this._auth.GetVentasData());
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
      CostoCompra: new FormControl(null),
    });
  }
  cities: any = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ];
  products: any;
  ngOnInit() {
    this.GetCargarDatosGenerales();
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
    /*  let ProductDescripcion = this.dataTempProducto.filter(
       (f: any) => f.productId == productId
     ); */
    console.log('producto seleccionado', this.productoSelected);

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
    console.log('EquivalenciaData', this.EquivalenciaData);
    //////////////////////////////////////////////

    // this.obtenerstockproducto(this.productoSelected.productId);
    this._StockService.getStockByProductId(this.productoSelected.productId).subscribe((data: any) => {
      this.stockActualTemp = data.stock;
      if (this.unidadMedidaSelected !== null || this.unidadMedidaSelected !== undefined) {
        this.cambiarStockUnidadMedida();
      }
    }
    );
  }

  stockActualTemp: number = 0;
  cambiarStockUnidadMedida() {

    this.stockActual = parseFloat((
      this.stockActualTemp /
      this.EquivalenciaData.filter(
        (x: any) =>
          x.productId == this.productoSelected.productId &&
          x.unidadBase == this.unidadMedidaSelected.unidadBase.replace(/ /g, "") &&
          x.estado == true
      )[0].cantidadObjetos
    ).toFixed(2));
    console.log('hjhjh', this.EquivalenciaData);

  }

  cargar() { 
    this._ComprasService.getComprasMax(this.productoSelected.productId, this.unidadMedidaSelected.unidadBase).subscribe((data: any) => {
      this.cantidadObjetos_db = data[0].cantidadObjetos;;
      this.CostoCompra = Number(data[0].costo.toFixed(2));
    });
  }

  VALIDAD_STOCK() {
    /* const Idventa = this.route.snapshot.queryParamMap.get("ventaId");
    if (Idventa == null) {
      if (this.cantidadPV > this.stockActual) {
        this.cantidadPV = null;
      }
    } */
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


  clienteId: number = 0;
  VentaDataTemporalObjeto!: VentasTempModel;
  VentaDataTemporal: VentasTempModel[] = [];
  cantidadObjetos_db: number = 0;
  agregaProducto() {

    for(let row of this.VentaDataTemporal){
        if (row.productName == this.productoSelected.productName){
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

    this.VentaDataTemporalObjeto = new VentasTempModel();
    this.VentaDataTemporalObjeto.cantidadVenta = this.cantidadPV;
    this.VentaDataTemporalObjeto.clienteId = this.clienteId;
    this.VentaDataTemporalObjeto.productId = this.productoSelected.productId;
    this.VentaDataTemporalObjeto.productName = this.productoSelected.productName;
    this.VentaDataTemporalObjeto.unidadMedidad = this.unidadMedidaSelected.unidadBase;
    this.VentaDataTemporalObjeto.precio = this.precioPV;
    this.VentaDataTemporalObjeto.pesoVenta = this.cantidadObjetos_db;
    this.VentaDataTemporalObjeto.precioRealVenta = this.cantidadPV * this.precioPV;
    this.VentaDataTemporalObjeto.precioIngresadoVenta = this.totalPV;
    this.VentaDataTemporalObjeto.amortizacion = this.amortizacion;
    this.VentaDataTemporalObjeto.observacion = this.observacion;
    this.VentaDataTemporalObjeto.deudaActualizada = this.DeudaByClient + parseFloat(this.deudaActualizada.toFixed(2));
    console.log('objeto',this.VentaDataTemporalObjeto);
    
    this.VentaDataTemporal.push(this.VentaDataTemporalObjeto);



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
  DeudaByClient:number = 0;
  obtenerdeuda() {
  
    
    this.DeudaByClient = Number(this._ClienteService.getDeudaAnteriorByClient(this._auth.GetVentasData().clienteId).toPromise());

     
  }

}
