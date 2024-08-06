import { GastoDetalle } from "./gasto-detalle";

export class Gasto {
  gastoSemanalId: number;
  fechaInicio: Date;
  fechaFinal: Date;
  gastoTotal: number;
  gastoSemanalTabla: GastoDetalle[];
}
