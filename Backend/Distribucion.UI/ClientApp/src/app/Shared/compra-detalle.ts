import { Producto } from '../Shared/Producto';
import { Proveedor } from './proveedor';

export class CompraDetalle {
  detalleCompraId: number;
  compraId: number;
  //proveedor: Proveedor;
  proveedorId: number;
  //producto: Producto;
  productId: number;
  unidadMedidaId: number;
  unidadMedida: string;
  cantidadCompra : number;
  pesoCompra: number;
  precioUnitario: number;
  precioCompra : number;
  totalDeposito : number;
  saldoDeposito : number;
  costoFleteItemCompra : number;
  cantidadBuenEstado : number;
  cantidadMalEstado: number;
  documentoCompra: string;
  compraEstado: number;
  btnEstado: boolean;
  opcionConfirmar: string;
}
