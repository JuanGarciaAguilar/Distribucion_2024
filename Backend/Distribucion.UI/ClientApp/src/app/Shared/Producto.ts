import { Equivalencia } from "./equivalencia";

export class Producto {
  productId: number;
  productName: string;
  productImage: string;
  productParentId: number;
  productLevel: number;


  precio: number;
  unidadMedidaId: number;
  unidadMedidad: string;
  subcategoria: string;

  equivalenciaDetalleTabla: Equivalencia[];
  bloq: boolean;
}
