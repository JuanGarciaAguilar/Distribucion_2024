import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Cliente } from './Cliente';
import { Producto } from './Producto';
import { Venta } from './Venta';
import { Gasto } from './gasto';
import { Proveedor } from './Proveedor';
import { Usuario } from './Usuario';
import { GastoDetalle } from './gasto-detalle';
import { Compra } from './compra';
import { CompraDetalle } from './compra-detalle';
import { CookieService } from 'ngx-cookie-service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { $ } from 'protractor';
import { Router } from '@angular/router';
import { Stock } from './stock';
import { RepParent } from './rep-parent';
import { RepAmortDeuda } from './rep-amort-deuda';
import { forEach } from '@angular/router/src/utils/collection';
import { Ganancia } from './ganancia';
import { Equivalencia } from './equivalencia';
import { GastoReporte } from './gasto-reporte';
import { StockPrecio } from './stock-precio';
import { VentaReporte } from './venta-reporte';
import { VentaPadreRep } from './venta-padre-rep';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debug } from 'util';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  Authorization: "Bearer "
};

@Injectable()
export class DistribucionService {
  //private API: string = 'http://localhost:51628/api/';
  private API: string = 'https://distribuye.azurewebsites.net/api/api/';

  constructor(private  httpClient: HttpClient) { }

  //Login

  postLogin(u: Usuario): any {
    return this.httpClient.post(this.API + 'Usuario/Login', u).toPromise();
  }
  
  getListaClientes(): any {
    return this.httpClient.get(this.API + 'Cliente_nt/listaCliente');
  }

  getListaProductos(): any {    
    return this.httpClient.get(this.API + 'Producto');
   }

  getListaProductosPadre(): any {
    return this.httpClient.get(this.API + 'Producto/Padre');
  }

  getListaEquivalencia(): any {
    return this.httpClient.get(this.API + 'Producto/Equivalencia');
  }

  getListaSector(): any {
    return this.httpClient.get(this.API + 'Sector');
  }

  getclientesBySector(id): any {
    return this.httpClient.get(this.API + 'Cliente_nt/clientesBySector/' + id);
  }

  getDeudaClientesBySector(): any {
    return this.httpClient.get(this.API + 'Cliente_nt/deudaClientesBySector');
  }

  postInsertaCliente(client: Cliente): any {
    return this.httpClient.post(this.API + 'Cliente/InsertarCliente', client, httpOptions);
  }

  postActualizaDeudaCliente(idCliente, monto): any {
    return this.httpClient.get(this.API + 'Cliente/PagarDeuda/'+ idCliente + '/' + monto, httpOptions);
  }

  postActualizarCliente(client: Cliente): any {
    return this.httpClient.post(this.API + 'Cliente/UpdateCliente', client, httpOptions);
  }

  getDeudaAnteriorByClient(idCli: number) {
    return this.httpClient.get(this.API + 'Cliente/DeudaByCliente/' + idCli, httpOptions);
  }



  //---------------------Shared Components-----------------------------

  private validarCambio: boolean = false;
  private validarCambioSource = new BehaviorSubject<boolean>(this.validarCambio);
  currentValidarCambio = this.validarCambioSource.asObservable();

  changeValidarCambio(validarCambio: boolean) {
    this.validarCambioSource.next(validarCambio);
  }

  private compra: Compra = new Compra;
  private compraSource = new BehaviorSubject<Compra>(this.compra);
  currentCompra = this.compraSource.asObservable();

  changeCompra(compra: Compra) {
    this.compraSource.next(compra);
  }


  private producto: Producto = new Producto;
  private productoSource = new BehaviorSubject<Producto>(this.producto);
  currentProducto = this.productoSource.asObservable();

  changeProducto(producto: Producto) {
    this.productoSource.next(producto);
  }
  

  private stock: number = 0;
  private stockSource = new BehaviorSubject<number>(this.stock);
  currentStock = this.stockSource.asObservable();

  changeStock(stock: number) {
    this.stockSource.next(stock);
  }

  private precio: number = 0;
  private precioSource = new BehaviorSubject<number>(this.precio);
  currentPrecio = this.precioSource.asObservable();

  changePrecio(precio: number) {
    this.precioSource.next(precio);
  }

  private cliente1: Cliente = new Cliente;
  private clienteSource = new BehaviorSubject<Cliente>(this.cliente1);
  currentCliente = this.clienteSource.asObservable();

  changeCliente(cliente: Cliente) {
    this.clienteSource.next(cliente);
  }
  

  private deudaTotal: number = 0;
  private deudaTotalSource = new BehaviorSubject<number>(this.deudaTotal);
  currentDeudaTotal = this.deudaTotalSource.asObservable();

  changeDeudaTotal(deudaTotal: number) {
    this.deudaTotalSource.next(deudaTotal);
  }

  private deudaAnterior: string = '0';
  private deudaAnteriorSource = new BehaviorSubject<string>(this.deudaAnterior);
  currentDeudaAnterior = this.deudaAnteriorSource.asObservable();

  changeDeudaAnterior(deudaAnterior: string) {
    this.deudaAnteriorSource.next(deudaAnterior);
  }

  private capitalTotal: number = 0;
  private capitalTotalSource = new BehaviorSubject<number>(this.capitalTotal);
  currentCapitalTotal = this.capitalTotalSource.asObservable();

  changeCapitalTotal(capitalTotal: number) {
    this.capitalTotalSource.next(capitalTotal);
  }
  
  //-------------------------Clientes----------------------------------

//  //-----------------------Equivalencia-------------------------------------


//  //-----------------------Producto-------------------------------------
//  producto: Producto[];
//  //----------------

  postInsertaCategoria(product: Producto): any {
    return this.httpClient.post(this.API + 'Producto/InsertCategoria', product, httpOptions);
  }

  postInsertaProducto(producto): any {
    return this.httpClient.post(this.API + 'Producto/InsertProducto', producto, httpOptions);
  }


  postActualizaCategoria(product: Producto): any {
    return this.httpClient.post(this.API + 'Producto/UpdateCategoria', product, httpOptions);
  }

  postActualizaProducto(product: Producto): any {
    return this.httpClient.post(this.API + 'Producto/UpdateProducto', product, httpOptions);
  }

  postEliminaCategoria(idProducto): any {
    return this.httpClient.get(this.API + 'Producto/DeleteCategoria/'+ idProducto, httpOptions);
  }


  postEliminaProducto(idProducto): any {
    return this.httpClient.get(this.API + 'Producto/DeleteProducto/' + idProducto, httpOptions);
  }

  postEliminarEquivalencia(idEquivalencia): any {
    return this.httpClient.get(this.API + 'Producto/DeleteEquivalencia/' + idEquivalencia, httpOptions);
  }


  getReporteGanancia(i, f): any {
      return this.httpClient.get(this.API + 'Producto/ReporteGanancia/' + i + '/' + f);
  }

  
//  //----------------------Gastos-----------------------------------
//  gastos: Gasto[];
//  gastoDetalles: GastoDetalle[];
//  deleteHolder: number;
//  reporteGastos: GastoReporte[];

  insertNewGasto(gasto: Gasto): any {
    return this.httpClient.post(this.API + 'Gasto/insert', gasto, httpOptions);
  }


  updateGasto(gasto: Gasto): any {
    return this.httpClient.post(this.API + 'Gasto/update', gasto, httpOptions);
  }


  getGastosAll(): any {
    return this.httpClient.get(this.API + 'Gasto');
  }
  
  getGastosHastaHoy(): any {
    return this.httpClient.get(this.API + 'Gasto/toHoy');
  }

  getGastoDetalleById(id): any {
    return this.httpClient.get(this.API + 'Gasto/' + id);
  }

  deleteGastoById(id): any {
    return this.httpClient.get(this.API + 'Gasto/delete/' + id);
  }



  getReporteGastos(repGastosFechaInicio, repGastosFechaFin) {
    return this.httpClient.get(this.API + 'Gasto/' + repGastosFechaInicio + '/' + repGastosFechaFin)
  }

  getGastoTotalPeriodo(fechaInicio, fechaFin): any {
    return this.httpClient.get(this.API + 'Gasto/TotalPeriodo/' + fechaInicio + '/' + fechaFin)
  }

  
//  //-----------------------------Venta----------------------------------------------------
  //venta: Venta[];

  postInsertaVenta(venta): any {
    return this.httpClient.post(this.API + 'Venta/IngresarVenta', venta, httpOptions);
  }

  getListaVentasByCliente(idCliente): any {
    return this.httpClient.get(this.API + 'Venta/' + idCliente, httpOptions);
  }

  getDeudaAnterior(idCli, idProd): any {
    return this.httpClient.get(this.API + 'Venta/' + idCli + '/' + idProd, httpOptions);
  }


  getDeudaTotal(idCli): any {
    return this.httpClient.get(this.API + 'Venta/DeudaTotal/' + idCli, httpOptions);
  }

  getReporteVentas(fIni, fFin, producto): any {
    return this.httpClient.get(this.API + 'Venta/Reporte/' + fIni + '/' + fFin + '/' + producto);
  }

  getReporteCierreDiario(fIni, cSector): any {
    return this.httpClient.get(this.API + 'Venta/ReporteCierreDiario/' + fIni + '/' + cSector);
  }

  getReporteCierreDiarioCabecera(): any {
    return this.httpClient.get(this.API + 'Venta/ReporteCierreDiarioCabecera');
  }

  postEliminaVenta(ventaId): any {
    return this.httpClient.get(this.API + 'Venta/EliminaVenta/' + ventaId, httpOptions);
  }


//  //----------------------Usuario----------------------
//  usuario: Usuario[];


  getListaUsuario(): any {
    return this.httpClient.get(this.API + 'Usuario');
  }


  postInsertaUsuario(usuario: Usuario): any {
    return this.httpClient.post(this.API + 'Usuario/InsertUsuario', usuario, httpOptions);
  }


  postActualizarUsuario(usuario: Usuario): any {
    return this.httpClient.post(this.API + 'Usuario/UpdateUsuario', usuario, httpOptions);
  }

  postEliminaUsuario(idUsuario): any {
    return this.httpClient.get(this.API + 'Usuario/DeleteUsuario/' + idUsuario, httpOptions);
  }




//  //------------------------------Compras-------------------------------------
//  compras: Compra[];
//  compraDetalles: CompraDetalle[];
//  reporteCompras: RepParent[];

  insertNewCompra(compra: Compra): any {
    return this.httpClient.post(this.API + 'Compra/insert', compra, httpOptions);
  }

  getComprasAll(): any {
    return this.httpClient.get(this.API + 'Compra');
  }


  getVentasAll(): any {
    return this.httpClient.get(this.API + 'Venta');
  }


  updateCompra(compra: Compra): any {
    return this.httpClient.post(this.API + 'Compra/update', compra, httpOptions);
  }


  confirmarCompra(compra: Compra): any {
    return this.httpClient.post(this.API + 'Compra/confirmar', compra, httpOptions);
  }


  deleteCompraById(id): any {
    return this.httpClient.get(this.API + 'Compra/delete/' + id, httpOptions);
  }


  deleteCompraProductoById(cdid): any {
    return this.httpClient.get(this.API + 'Compra/deletepc/' + cdid, httpOptions);
  }


  getCompraSaldoAnterior(idProd, idProv): any {
    return this.httpClient.get(this.API + 'Compra/saldo/' + idProd + '/' + idProv, httpOptions);
  }

  getReporteCompras(fIni, fFin, nProveedor): any {
    return this.httpClient.get(this.API + 'Compra/reporte/' + fIni + '/' + fFin + '/"undefined"/' + nProveedor);
  }


//  //----------------------------Proveedores-----------------------------------
//  proveedores: Proveedor[];

  getProveedoresAll(): any {
    return this.httpClient.get(this.API + 'Proveedor');
  }


//  //---------------------------Stock-------------------------------------
//  stocks: Stock[];
//  totalCapital: number;
//  stockDeProducto: number;
//  stockPrecio: StockPrecio;

  getStockAll():any {
    return this.httpClient.get(this.API + 'Stock/StockAll/')
  }

  getStockByProductId(id): any {
    return this.httpClient.get(this.API + 'Stock/' + id)
  }

//  //------------------------Some Reports-----------------------------

  getTotalCapital(): any {
    return this.httpClient.get(this.API + 'Stock/total/')
  }

  getMoneyAmortizadoDeuda(): any {
    return this.httpClient.get(this.API + 'Stock/amort-deuda')
  }


  getReporteSaldoDeposito(): any {
    return this.httpClient.get(this.API + 'Stock/saldo-deposito')
  }

  getEfectivo(): any {
    return this.httpClient.get(this.API + 'Stock/efectivo')
  }

}
