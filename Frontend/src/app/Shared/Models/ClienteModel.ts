export class ClienteModel {
    clienteId?: number;
    clienteName?: string;
    clienteAddress?: string;
    clientePhone?: string;
    sectorId?: number
    deudaActualizada?: number;
  }
  
  
  export class ClientePagosEntity {
    ClienteId ?: number;
    DeudaActualizada?: number;
    Observacion?: string;
    user?: string;
    FechaPago?: Date; 
  }
  
  
  