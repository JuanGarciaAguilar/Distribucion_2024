export class GastosModel {
    gastoSemanalId: number = 0;;
    fechaInicio: Date | undefined;
    fechaFinal: Date | undefined;
    gastoTotal: number = 0;
   //userId:String;
    gastoSemanalTabla: GastoDetalle[] = [];
}

export class GastoDetalle {
    gastoSemanalDetalleId: number = 0;
    gastoSemanalId: number = 0;
    insumo: string = '';
    gasto: number = 0;
    comentario:string = '';
    userId:string = '';
  }
