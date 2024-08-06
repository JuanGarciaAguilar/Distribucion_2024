export class CierreDiarioReport {
    fechaVenta: Date;
    sectorName?: any;
    clienteId?: number;
    clienteName?: string;
    productParentId?: number;
    productParentName?: string;
    productId?: number;
    productName?: any;
    cantidadVenta?: number;
    unidadMedida?: string;
    unidades?: number;
    precioIngresadoVenta?: number;
    amortizacion?: number;
    stock?: number;
    stockSobrante?: number;
    deudaActualizada?: number;
    valor?: number;
    total?: number;
    saldo?: number;
  }
  
  export class CierreDiarioReportHeader {
    id?: number;
    headerGroup?: string;
    title?: string;
    field?: string;
    width?: string;
    cant?: { [key: number]: number };
    sol?:  { [key: number]: number };
  }
  