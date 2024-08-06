import { Component, OnInit, Input } from '@angular/core';
import { DistribucionService } from '../Shared/distribucion.service';
import { Subject } from 'rxjs/Subject';
import { FormControl, Validators, NgForm, FormBuilder, FormGroup } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Producto } from '../Shared/Producto';
import { Venta } from '../Shared/Venta';
import { Equivalencia } from '../Shared/Equivalencia';
import { Venta_Salida } from '../Shared/Venta_Salida';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DISABLED } from '@angular/forms/src/model';
import { disableDebugTools } from '@angular/platform-browser/src/browser/tools/tools';
import { Usuario } from '../Shared/Usuario';
import { StockPrecio } from '../Shared/stock-precio';
import { debug } from 'util';
import { Cliente } from '../Shared/Cliente';

import { GridDataResult, PageChangeEvent, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { GroupDescriptor, DataResult, process, State, aggregateBy } from '@progress/kendo-data-query';

declare function openModal(state: string): any;
declare function closeModal(state: string): any;
declare function confirmModal(opcion: string, rTitle: string, rText: string, uTitle: string, uText: string, dTitle: string, dText: string): any;

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {
  validarCambio: boolean = true;
  sect: string;
  cliente: string;
  activo: string = "";
  productosFilter: Producto[];
  subcategoriaFilter: Producto[];
  idVenta: number;
  precioPV: number = 0;
  precioPVTemp: number = 0;
  totalPV: number;
  cantidadPV: number = 0;
  nombrePV: string;
  frm: FormGroup;
  amortizacion: number = 0;
  deudaActualizada: number;
  deudaAnterior: number = 0;
  deudaAnteriorByClient: number = 0;
  unidadDeMedida: any;
  actualizar: boolean = true;
  stockActual: number = 0;
  stockActualTemp: number = 0;
  active: string = '';
  equivalenciaFilter: Equivalencia[];
  readonly: boolean = true;

  cliente1: Cliente;
  stockprecio: StockPrecio = new StockPrecio();

  public DeudaByClient: any;
  guardarIsDisabled: boolean = false;
  constructor(public distribucionService: DistribucionService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.distribucionService.currentStock.subscribe(c => this.stockActual = c);
    this.distribucionService.currentPrecio.subscribe(c => this.precioPV = c);
    this.distribucionService.changeValidarCambio(this.validarCambio);
    this.distribucionService.currentCliente.subscribe(c => this.cliente1 = c);
    try {
      this.actualizar;
      this.distribucionService.currentDeudaAnterior.subscribe(c => {
        if (c == null) {
          this.deudaAnterior = 0;
        }
        else {
          this.deudaAnterior = parseFloat(c);
        }

        //  //let localDeudAct = parseFloat(this.totalPV + (this.deudaAnterior - this.amortizacion).toFixed(2));
        //  //if (localDeudAct > 0)
        //  //  this.deudaActualizada = parseFloat((this.totalPV + this.deudaAnterior - this.amortizacion).toFixed(2));
        //  //else
        //  //  this.deudaActualizada = 0;

      });
      this.sect = this.route.snapshot.paramMap.get('sectorURL');
      this.cliente = this.route.snapshot.paramMap.get('clienteURL');

      this.obtenerdeuda();

      this.frm = this.formBuilder.group({
        stockAc: [null, [Validators.required, Validators.min(0.000000)]],
        cantidadPV: [null, [Validators.required]],
        unidadMedida: ['', [Validators.required]],
        precioPV: [null, [Validators.required]],
        totalPV: [null, [Validators.required, Validators.min(0)]],
        amortizacion: [null, [Validators.required, Validators.min(0)]]
      });

      this.listaProductos();
      this.listaEquivalencia();
      this.ventas;
      this.stockActual = 0;
      this.stockActualTemp = 0;
      this.precioPV = 0;
    } catch (e) {
      console.log('ngOnInit error: ', e)
    }

  }

  obtenerdeuda() {
    this.distribucionService.getDeudaAnteriorByClient(parseFloat(this.cliente)).subscribe(
      data => {
        this.DeudaByClient = data;
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
  }



  public dataTempProducto: any;
  //Muestra productos - subcategorias
  public listaProductos() {
    this.distribucionService.getListaProductos().subscribe(
      data => {
        this.dataTempProducto = data;

        for (let i = 0; i < this.dataTempProducto.length; i++) {
          this.dataTempProducto[i].bloq = true;
        }
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
  }

  public dataTempEquivalencia: any;
  //Muestra equivalencia
  public listaEquivalencia() {
    this.distribucionService.getListaEquivalencia().subscribe(
      data => {
        this.dataTempEquivalencia = data.filter(x => x.estado > 0);
      },
      error => {
        //this.sharedDataService.sessionExpired(error);
      }
    );
  }

  subcategorias(parentId) {
    try {
      this.calculoTotalInput();
      this.productoName = null;
      this.precioPV = null;
      this.cantidadPV = null;
      this.unidadDeMedida = null;
      this.totalPV = null;
      this.amortizacion = null;
      this.subcategoriaFilter = [];
      for (let i = 0; i < this.dataTempProducto.length; i++) {
        if (this.dataTempProducto[i].productId == parentId) {
          this.dataTempProducto[i].bloq = false;
        } else {
          this.dataTempProducto[i].bloq = true;
        }
      };
      this.dataTempProducto.forEach(
        objSubcate => {
          if (objSubcate.productParentId == parentId) {
            this.subcategoriaFilter.push(objSubcate);
          }
        }
      );

    } catch (e) {
      console.log(e)
    }
  }
  //Muestra productos - subcategorias

  //Detalle

  productoId: number;
  productoName: string;
  public seleccionaProducto(productId, productName) {
    this.precioPV = null;
    this.cantidadPV = null;
    this.stockActual = null;
    this.unidadDeMedida = null;
    this.totalPV = null;
    this.amortizacion = null;
    this.productoId = productId;
    this.productoName = productName;
    this.actualizar = true;
    this.readonly = false;
    this.obtenerEquivalencia(productId);
    this.getDeudaAnterior(productId);
    this.obtenerstockproducto(productId);

  }

  obtenerstockproducto(productId) {
    this.distribucionService.getStockByProductId(productId).subscribe(
      data => {
        this.stockprecio = data;
        this.stockActualTemp = this.stockprecio.stock;
        try {
          if (this.unidadDeMedida != null) {
            this.cambiarStockUnidadMedida();
          }
        } catch (e) { }
        //this.precioPVTemp = this.stockprecio.precio;
        //try {
        //  if (this.unidadDeMedida != null) {
        //    this.cambiarPrecioUnidadMedida();
        //  }
        //} catch (e) { }
      },
      error => {
        //this.distribucionService.sessionExpired(error);
      }
    );
  }

  obtenerEquivalencia(productId) {
    this.equivalenciaFilter = [];
    for (let i = 0; i < this.dataTempEquivalencia.length; i++) {
      if (this.dataTempEquivalencia[i].productId == productId) {
        this.dataTempEquivalencia[i].bloq = false;
      } else {
        this.dataTempEquivalencia[i].bloq = true;
      }
    };
    this.dataTempEquivalencia.forEach(
      objSubcate => {
        if (objSubcate.productId == productId) {
          this.equivalenciaFilter.push(objSubcate);
        }
      }
    );
  }



  calcularTotal() {
    let calculo = (this.cantidadPV * this.precioPV).toFixed(2);
    this.totalPV = parseFloat(calculo);
  }


  calculoLocal: number = 0.0;
  actualizarDeudaActualizada() {
    try {

      if (this.amortizacion == 0 || this.amortizacion == null) {

        this.calculoLocal = this.totalPV + this.deudaAnterior;
      }
      else {
        this.calculoLocal = this.totalPV + this.deudaAnterior - this.amortizacion;
      }
      this.deudaActualizada = this.calculoLocal;

    } catch (e) {
      console.log(e);
    }
  }


  venta;
  producto;
  ventas: Venta[] = [];
  calculoTotalVentas: number = 0;
  c: number = 0;
  noDuplicate: boolean = true;
  agregaProducto(cantidad, precio, total, nombreProducto, unidadMedida, agrega, opcion) {
    try {
      this.venta = new Venta();
      this.producto = new Producto();
      this.venta.idVenta = ++this.c;
      this.venta.cantidadVenta = cantidad;
      this.venta.clienteId = this.cliente;
      this.producto.productId = this.productoId;
      this.producto.productName = nombreProducto;
      this.producto.unidadMedidaId = unidadMedida;
      this.producto.precio = precio;
      this.producto.unidadMedidad = unidadMedida;
      this.venta.productId = this.producto;
      this.venta.precioRealVenta = parseFloat(cantidad) * parseFloat(precio);
      this.venta.precioIngresadoVenta = parseFloat(total);
      this.venta.amortizacion = parseFloat(this.amortizacion.toFixed(2));


      if (agrega) {
        this.noDuplicate = true;
        if (this.ventas.length < 1) {
          this.venta.deudaActualizada = parseFloat(this.DeudaByClient) + parseFloat(this.deudaActualizada.toFixed(2));
          this.ventas.push(this.venta);
          this.loadItems();
        } else {
          for (let i = 0; i < this.ventas.length; i++) {
            if (this.ventas[i].productId.productName == this.producto.productName && this.ventas[i].productId.unidadMedidad == this.producto.unidadMedidad) {
              this.noDuplicate = false;

            }
          }
          if (this.noDuplicate) {
            let agregaUltimaDeuda = this.ventas[this.ventas.length - 1].deudaActualizada;
            this.venta.deudaActualizada = parseFloat(total) + (parseFloat(agregaUltimaDeuda.toFixed(2)) - (this.amortizacion));
            this.ventas.push(this.venta);
          }
        }
      }

      this.loadItems();
      this.calculoTotalInput();
      this.precioPV = null;
      this.cantidadPV = null;
      this.totalPV = null;
      this.nombrePV = null;
      this.unidadDeMedida = null;
      this.amortizacion = null;
      this.deudaActualizada = null;
      this.productoId = -1;
      this.actualizar = true;
      this.productoName = null;
      this.stockActual = null;
      this.stockActualTemp = null;
      this.distribucionService.changeStock(0);
    } catch (e) {
      console.log(e);
    }
  }


  public ventaKendo: GridDataResult;
  public pageSize: number = 10;
  public skip: number = 0;
  private data: Object[];

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems();
  }

  private loadItems(): void {
    this.ventaKendo = {
      data: this.ventas.slice(this.skip, this.skip + this.pageSize),
      total: this.ventas.length
    };
  }

  actualizarProducto(cantidad, precio, total, nombreProducto, unidadMedida, agrega) {
    try {
      this.venta = new Venta();
      this.producto = new Producto();
      this.venta.idVenta = this.idVenta;
      this.venta.cantidadVenta = cantidad;
      this.venta.clienteId = this.cliente;
      this.producto.productId = this.productoId;
      this.producto.productName = nombreProducto;
      this.producto.unidadMedidaId = unidadMedida;
      this.producto.precio = precio;
      this.producto.unidadMedidad = unidadMedida;
      this.venta.productId = this.producto;
      this.venta.precioRealVenta = parseFloat(cantidad) * parseFloat(precio);
      this.venta.precioIngresadoVenta = parseFloat(total);
      this.venta.amortizacion = parseFloat(this.amortizacion.toFixed(2));

      for (let i = 0; i < this.ventas.length; i++) {
        if (this.ventas[i].idVenta == this.idVenta) {
          if (this.venta.idVenta == this.ventas[0].idVenta) {
            this.venta.deudaActualizada = parseFloat(this.DeudaByClient) + parseFloat(total) - parseFloat(this.amortizacion.toFixed(2));
          } else {
            let agregaUltimaDeuda = this.ventas[this.venta.idVenta - 2].deudaActualizada;
            this.venta.deudaActualizada = parseFloat(total) + (parseFloat(agregaUltimaDeuda.toFixed(2)) - (this.amortizacion));

          }
          this.ventas[i] = this.venta;
          this.loadItems();
          break
        }
      }

      this.actualizarDeudasEditar();
      this.calculoTotalInput();
      this.idVenta = -1;
      this.precioPV = null;
      this.cantidadPV = null;
      this.totalPV = null;
      this.nombrePV = null;
      this.unidadDeMedida = null;
      this.amortizacion = null;
      this.deudaActualizada = null;
      this.productoId = -1;
      this.actualizar = true;
      this.productoName = null;
      this.stockActual = null;
      this.stockActualTemp = null;
      this.distribucionService.changeStock(0);
    } catch (e) {
      console.log(e);
    }
  }


  ventaID = '';
  enviaIDVenta(id) {

    this.ventaID = id;

  }


  actualizarDeudasEditar() {
    for (let i = 1; i < this.ventas.length; i++) {
      let totalingresadoact = this.ventas[i].precioIngresadoVenta;
      let amortizacionact = this.ventas[i].amortizacion;
      let agregaUltimaDeuda = this.ventas[i - 1].deudaActualizada;

      this.ventas[i].deudaActualizada = parseFloat(agregaUltimaDeuda.toFixed(2)) + parseFloat(totalingresadoact.toFixed(2)) - parseFloat(amortizacionact.toFixed(2));

    }
  }


  calculoTotalInput() {
    this.calculoTotalVentas = 0;
    for (let i = 0; i < this.ventas.length; i++) {
      //this.calculoTotalVentas += (this.ventas[i].precioIngresadoVenta) - this.ventas[i].amortizacion;
      this.calculoTotalVentas += this.ventas[i].amortizacion;
    }
  }
  //Editar producto seleccionado(local)
  editaSeleccionProducto(idVenta) {
    try {
      this.actualizar = false;
      for (let i = 0; i < this.ventas.length; i++) {
        if (this.ventas[i].idVenta == idVenta) {
          this.idVenta = this.ventas[i].idVenta;
          this.productoId = this.ventas[i].productId.productId;
          this.nombrePV = this.ventas[i].productId.productName;
          this.cantidadPV = this.ventas[i].cantidadVenta;
          this.unidadDeMedida = this.ventas[i].productId.unidadMedidaId;
          this.precioPV = this.ventas[i].productId.precio;
          this.totalPV = this.cantidadPV * this.precioPV;
          this.amortizacion = this.ventas[i].amortizacion;
          this.deudaActualizada = this.ventas[i].deudaActualizada;
          this.obtenerEquivalencia(this.productoId);
          this.obtenerstockproducto(this.productoId);
          break
        }
      }
      this.calculoTotalInput();
    } catch (e) {
      console.log(e);
    }
  }

  cancelarEdicion() {
    try {
      this.precioPV = null;
      this.cantidadPV = null;
      this.totalPV = null;
      this.nombrePV = null;
      this.productoName = null;
      this.unidadDeMedida = null;
      this.productoId = -1;
      this.amortizacion = null;
      this.deudaActualizada = null;
      this.actualizar = true;
    } catch (e) {
      console.log(e);
    }
  }
  ///////////////////////////////
  eliminarProducto(idVenta) {
      for (var i = 0; i < this.ventas.length; i++) {
        if (this.ventas[i].idVenta == idVenta) {
          this.ventas.splice(i, 1);
        }
      }
      this.actualizarventadespueseliminar();
  }

  actualizarventadespueseliminar() {
    for (var i = 0; i < this.ventas.length; i++) {
      this.ventas[i].idVenta = i + 1;
      if (this.ventas[i].idVenta == 1) {
        this.ventas[i].deudaActualizada = (this.ventas[i].precioIngresadoVenta) + parseFloat(this.DeudaByClient) - (this.ventas[i].amortizacion);
      }
      else {
        let totalingresadoact = this.ventas[i].precioIngresadoVenta;
        let amortizacionact = this.ventas[i].amortizacion;
        let agregaUltimaDeuda = this.ventas[i - 1].deudaActualizada;
        this.ventas[i].deudaActualizada = parseFloat(agregaUltimaDeuda.toFixed(2)) + parseFloat(totalingresadoact.toFixed(2)) - parseFloat(amortizacionact.toFixed(2));
      }
    }

    this.confirmModal('delete');
    this.loadItems();
    this.calculoTotalInput();
  }

  venta_salida: Venta_Salida[] = [];
  guardarProductos() {
    this.venta_salida = [];
    try {
      this.guardarIsDisabled = true;
      let user = new Usuario();
      user = JSON.parse(sessionStorage.getItem('user'));

      for (let i = 0; i < this.ventas.length; i++) {
        this.venta_salida[i] = new Venta_Salida();
        this.venta_salida[i].amortizacion = this.ventas[i].amortizacion;
        this.venta_salida[i].cantidadVenta = this.ventas[i].cantidadVenta;
        this.venta_salida[i].unidadMedida = this.ventas[i].productId.unidadMedidad;
        this.venta_salida[i].clienteId = this.ventas[i].clienteId;
        this.venta_salida[i].deudaActualizada = this.ventas[i].deudaActualizada;
        this.venta_salida[i].pesoVenta = this.ventas[i].pesoVenta;
        this.venta_salida[i].precioIngresadoVenta = this.ventas[i].precioIngresadoVenta;
        this.venta_salida[i].precioRealVenta = this.ventas[i].precioRealVenta;
        this.venta_salida[i].productId = this.ventas[i].productId.productId;
        this.venta_salida[i].usuarioId = user.userID;
      }

      this.distribucionService.postInsertaVenta(this.venta_salida).subscribe(
        data => {
          this.guardarIsDisabled = false;
          this.confirmModal('register');
          this.venta_salida = [];
          this.ventas = [];
          this.loadItems();
          this.obtenerdeuda();
        },
        err => console.log(err),
      );
      this.venta_salida = [];
      this.ventas = [];
      this.productoName = null;
      this.calculoTotalVentas = 0;
      this.dataTempProducto.forEach(x => x.bloq = true);
    } catch (e) {
      console.log(e);
    }
  }

  guardarperdida() {
    try {
      let user = new Usuario();
      user = JSON.parse(sessionStorage.getItem("uDSS"));
      for (let i = 0; i < this.ventas.length; i++) {
        this.venta_salida[i] = new Venta_Salida();
        this.venta_salida[i].amortizacion = 0;
        this.venta_salida[i].cantidadVenta = this.ventas[i].cantidadVenta;
        this.venta_salida[i].clienteId = this.ventas[i].clienteId;
        this.venta_salida[i].deudaActualizada = this.deudaAnterior;
        this.venta_salida[i].pesoVenta = this.ventas[i].pesoVenta;
        this.venta_salida[i].precioIngresadoVenta = 0;
        this.venta_salida[i].precioRealVenta = 0;
        this.venta_salida[i].productId = this.ventas[i].productId.productId;
        this.venta_salida[i].usuarioId = user.userID;
      }
      this.distribucionService.postInsertaVenta(this.venta_salida).subscribe(x => console.log(x));
      this.ventas = [];
      this.productoName = null;
      this.calculoTotalVentas = 0;
      this.dataTempProducto.forEach(x => x.bloq = true);
    } catch (e) {
      console.log(e);
    }
  }


  getDeudaAnterior(idProd) {
    this.distribucionService.getDeudaAnterior(parseFloat(this.cliente), idProd);
  }

  openModal(state) {
    openModal(state);
  }

  closeMod(state) {
    closeModal(state);
  }

  confirmModal(opcion) {
    confirmModal(opcion, "Registrado", "La venta se realizo correctamente.", "Actualizado", "La venta se actualizo correctamente.", "Eliminado", "El producto se elimino correctamente.");
  }

  checkCantidad(val) {

    if (val > this.stockActual) {
      this.cantidadPV = null;
    }
  }

  cambiarStockUnidadMedida() {
    this.stockActual = parseFloat((this.stockActualTemp / this.dataTempEquivalencia.filter(x => (x.productId == this.productoId && x.unidadBase == this.unidadDeMedida && x.estado == true))[0].cantidadObjetos).toFixed(2));
    this.checkCantidad(this.cantidadPV);
  }

  //cambiarPrecioUnidadMedida() {
  //  this.precioPV = parseFloat((this.precioPVTemp * this.dataTempEquivalencia.filter(x => (x.productId == this.productoId && x.unidadBase == this.unidadDeMedida && x.estado == true))[0].cantidadObjetos).toFixed(3));
  //}
}
