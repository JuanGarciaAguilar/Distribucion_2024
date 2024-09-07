import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/Shared/Service/auth.service';
import { ProductosService } from 'src/app/Shared/Service/Productos.service';
import { StockService } from 'src/app/Shared/Service/Stock.service';
import { VentasService } from 'src/app/Shared/Service/ventas.service';

@Component({
  selector: 'app-MantemientoVentas',
  templateUrl: './MantemientoVentas.component.html',
  styleUrls: ['./MantemientoVentas.component.css']
})
export class MantemientoVentasComponent implements OnInit {
    home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };
    items: MenuItem[] = [{ label: 'Ventas' },{ label: 'Lista Clientes' },{ label: 'Nueva Venta' }];

    private _auth = inject(AuthService);
    private _ProductosService = inject(ProductosService);
    private _VentasService = inject(VentasService);
    private _StockService = inject(StockService);

    _FormGroup: FormGroup;

    FechaVenta: string= '';
    precioPV: number = 0;
    productoSelected:any;
    totalPV: number = 0;
    unidadMedidaSelected: any;
    amortizacion: number = 0;
    cantidadPV: number = 0;
    observacion: string = '';
    stockActual: number = 0;
    CostoCompra : number = 0;

    deudaActualizada: number=0;
    deudaAnterior: number = 0;
  constructor() {

    console.log('modulo historial ventas', this._auth.GetVentasData());
    this._FormGroup =  new FormGroup({
          FechaVenta:     new FormControl(null),
          stockActual:    new FormControl({value: '', disabled: true}, [Validators.required, Validators.min(0.0)]),
          cantidadPV:     new FormControl(null, [Validators.required]),
          productoSelected:       new FormControl(null, [Validators.required]),
          unidadMedidaSelected:   new FormControl("", [Validators.required]),
          precioPV:       new FormControl(null, [Validators.required]),
          totalPV:        new FormControl(null, [Validators.required, Validators.min(0)]),
          amortizacion:   new FormControl(null, [Validators.required, Validators.min(0)]),
          observacion:    new FormControl(null),
          CostoCompra:    new FormControl(null),
  });
}
  cities:any = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
];
products:any;
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
    console.log('producto seleccionado',this.productoSelected);
    
    this.precioPV = 0; 
   // this.stockActual = 0;
    this.totalPV = 0;
    this.amortizacion = 0;
    /* this.productoId = productId;
    this.productoName = ProductDescripcion[0].productName; */
    
   /*  this.actualizar = true;
    this.readonly = false; */
   this.obtenerEquivalencia(this.productoSelected.productId);
   /*  this.getDeudaAnterior(this.productoSelected.productId); */  
    this.obtenerstockproducto(this.productoSelected.productId);
  }

  stockActualTemp: number = 0;
  cambiarStockUnidadMedida() {

    let data =  this.EquivalenciaData.filter(
      (x :any) =>
        x.productId == this.productoSelected.productId &&
      x.unidadBase == this.unidadMedidaSelected.unidadBase &&
      x.estado == true
    )[0].cantidadObjetos

    console.log('probando',data);
    

    this.stockActual = parseFloat(( 
        this.stockActualTemp /
         this.EquivalenciaData.filter(
          (x :any) =>
            x.productId == this.productoSelected.productId &&
            x.unidadBase == this.unidadMedidaSelected.unidadBase.replace(/ /g, "") &&
            x.estado == true
        )[0].cantidadObjetos
      ).toFixed(2) 
    ); 
   console.log('hjhjh',this.EquivalenciaData);
   
  }

  cargar() {
    let CantidadCompra;
    let costoFleteItemCompra;
    let cantidadObjetos;
    let CantidadIngresada;
    let objetosUnidadMedida;
    /* const ventaId = this.route.snapshot.queryParamMap.get("ventaId");
    this.distribucionService
      .getComprasMax(this.productoId, this.unidadDeMedida)
      .subscribe(
        (data) => {
          this.CompraMax = data;
          let cantidad = this.dataTempEquivalencia.filter(
            (f) =>
              f.unidadBase == this.unidadDeMedida &&
              f.productId == this.productoId
          );

          for (let i = 0; i < cantidad.length; i++) {
            this.EquilanciaCantidad = cantidad[i].cantidadObjetos;
          }
          debugger;
          for (let i = 0; i < this.CompraMax.length; i++) {
            CantidadCompra = this.CompraMax[i].cantidadCompra;
            costoFleteItemCompra = this.CompraMax[i].costoFleteItemCompra;
            cantidadObjetos = this.CompraMax[i].cantidadObjetos;
            objetosUnidadMedida = this.CompraMax[i].objetosUnidadMedida;
            this.preciocomprabd = this.CompraMax[i].precioCompra;
            var costo = this.CompraMax[i].costo;
            this.cantidadObjetos_db = cantidadObjetos;

            CantidadIngresada = this.CompraMax[i].cantidadIngresada;
            this.UnidadBase_db = this.CompraMax[i].unidadBase;
            this.CantidadActualStock = this.CompraMax[i].cantidadActualStock;
          } */
          // this.precioPV = this.preciocomprabd;

          /* try {
            for (let i = 0; i < this.equivalenciaFilter.length; i++) {
              if (
                this.unidadDeMedida === this.equivalenciaFilter[i].unidadBase
              ) {
                this.amortizacionlast =
                  this.equivalenciaFilter[i].cantidadObjetos;
              }
            }
          } catch (error) {}

          this.CostoCompra = costo;
        },
        (error) => {
          //this.sharedDataService.sessionExpired(error);
        }
      ); */
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
async GetCargarDatosGenerales(){
  await  this._ProductosService.GetListaProductos().subscribe(
    (data :any) => {
      this.ProductosData = data.filter((f:any) => f.productParentId !== 0);
      //this.productoent = this.dataTempProducto;
 
    });

    this.listaEquivalencia();
}

EquivalenciaData: any;
EquivalenciaDataFilter:any[]=[];
obtenerEquivalencia(productId :number) {
  this.EquivalenciaDataFilter = [];
  /* for (let i = 0; i < this.dataTempEquivalencia.length; i++) {
    if (this.dataTempEquivalencia[i].productId == productId) {
      this.dataTempEquivalencia[i].bloq = false;
    } else {
      this.dataTempEquivalencia[i].bloq = true;
    }
  } */
  this.EquivalenciaData.forEach((objSubcate:any) => {
    if (objSubcate.productId == productId) {
      this.EquivalenciaDataFilter.push(objSubcate);
    }
  });
  console.log('EquivalenciaData',this.EquivalenciaData);
  
 // this.cambiarStockUnidadMedida();
  
}
amortizacionlast: any;
listaEquivalencia() {
  this._ProductosService.getListaEquivalencia().subscribe((data:any) => {
    try {
    //  this.VentasId();
      this.EquivalenciaData = data.filter((x:any) => x.estado > 0); 
      this.EquivalenciaData.fleteUnitario;
      this.amortizacionlast = this.EquivalenciaData.cantidadObjetos;
    } catch (error) {}
  });
}
obtenerstockproducto(productId:number) {
  this._StockService.getStockByProductId(productId).subscribe(
    (data:any) => {
      //this.stockprecio = data;
      console.log('getStockByProductId',data);
      
      this.stockActualTemp = data.stock;
      try {
        if (this.unidadMedidaSelected !== null) {
          this.cambiarStockUnidadMedida();
        }
      } catch (e) {}
      //this.precioPVTemp = this.stockprecio.precio;
      //try {
      //  if (this.unidadDeMedida != null) {
      //    this.cambiarPrecioUnidadMedida();
      //  }
      //} catch (e) { }
    } 
  );
}
 
}
