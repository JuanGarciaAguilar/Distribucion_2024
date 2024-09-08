import { ProductoEntity } from './Producto'
import { ReservaDia } from './reserva-diamodel';

export class VentasTempModel {
  NroFila: number = 0;
  cantidadVenta: number = 0;
  clienteId: number = 0;
  productId: number = 0;
  productName: string = ''; 
  precio: number = 0;
  unidadMedidad: string = '';
  pesoVenta: number = 0;
  precioRealVenta: number = 0;
  precioIngresadoVenta: number = 0;
  amortizacion: number = 0;
  observacion: string = '';
  deudaActualizada : number = 0;
}

export class VentasModel {

  idVenta?: number;
  ventaId?: number;
  fechaVenta?: string;
  clienteId?: number;
  productId?: ProductoEntity;
  productName?: string;
  cantidadVenta?: number;
  unidadMedida?: string;
  pesoVenta?: number;
  precioRealVenta?: number;
  precioIngresadoVenta?: number;
  amortizacion?: number;
  deudaActualizada?: number;
  isReserva?: boolean;
  observacion?: string;
  usuarioId?: string;
  adelanto?: string;
}

export class VentaEntity {
  ventaId?: number;
  fechaVenta?: Date;
  clienteId?: number;
  productId?: number;
  cantidadVenta?: number;
  unidadMedida?: string;
  pesoVenta?: number;
  precioRealVenta?: number;
  precioIngresadoVenta?: number;
  amortizacion?: number;
  deudaActualizada?: number;
  usuarioId?: string;
  cantidadMinima?: number;
  isReserva?: boolean;
  Observacion?: string;
  UsuarioId?: string;
  adelanto?: string;
  private constructor() {
  }

  static fromReservaDia(d: ReservaDia): VentaEntity {
    const r = new VentaEntity();
    r.ventaId = d.ventaId;
    r.fechaVenta = d.fecha;
    r.clienteId = d.clienteId;
    r.productId = d.productId;
    r.cantidadVenta = d.cantidadVenta;
    r.unidadMedida = d.unidadMedida;
    r.pesoVenta = 0;
    r.precioRealVenta = 0;
    r.precioIngresadoVenta = d.precioIngresadoVenta;
    r.amortizacion = d.amortizacion;
    r.deudaActualizada = 0;
    r.usuarioId = '0';
    r.cantidadMinima = 0;
    r.Observacion = d.observacion;
    r.isReserva = true;

    return r;
  }

  /*   static fromVenta(d: Venta): VentaEntity {
      const r = new VentaEntity();
      r.ventaId = d.ventaId;
      r.fechaVenta = new Date(d.fechaVenta);
      r.clienteId = d.clienteId;
      r.productId = d.productId.productId;
      r.cantidadVenta = d.cantidadVenta;
      r.unidadMedida = d.unidadMedida;
      r.pesoVenta = d.pesoVenta;
      r.precioRealVenta = d.precioRealVenta;
      r.precioIngresadoVenta = d.precioIngresadoVenta;
      r.amortizacion = d.amortizacion;
      r.deudaActualizada = d.deudaActualizada;
      r.usuarioId = '0';
      r.cantidadMinima = 0;
      r.Observacion = d.observacion;
      r.isReserva = true;
  
      return r;
    } */




}
