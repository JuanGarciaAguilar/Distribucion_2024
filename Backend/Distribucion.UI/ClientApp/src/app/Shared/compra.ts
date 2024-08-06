import { CompraDetalle } from "./compra-detalle";
export class Compra {
  compraId : number;
  fechaCompra : Date;
  fechaEntrega : Date;
  origenCompra : string;
  totalCompra : number;
  costoFlete: number;
  usuarioId: string;
  compraEstado: number;
  compraStatus: string;
  compraDetalleTabla: CompraDetalle[];
  index: number;
  btnEstado: boolean;
}
