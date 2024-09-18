export class EstadoFinanciero {
    fecha: Date | undefined;
    descripcion: string = '';
    monto: number = 0;
  }


  export class CierreDiarioReportHeader {
    id: number = 0;
    headerGroup: string = '';
    title: string = '';
    field: string = '';
    width: string = '';
    cant!: { [key: number]: number };
    sol!:  { [key: number]: number };
  }
