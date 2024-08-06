import { Equivalencia } from "./equivalencia";
import { CierreDiarioReportHeader } from './cierre-diario.report';

export class Producto {
  productId?: number;
  productName?: string;
  productImage?: string;
  productParentId?: number;
  productLevel?: number;
  grupo?: string;

  precio?: number;
  unidadMedidaId?: number;
  unidadMedidad?: string;
  subcategoria?: string;

  equivalenciaDetalleTabla?: Equivalencia[];
  bloq?: boolean;

  //helpers
  hijos?: CierreDiarioReportHeader[];
}
