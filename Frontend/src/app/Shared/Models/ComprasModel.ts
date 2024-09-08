export class Compra {
    compraId : number = 0 ;
    fechaCompra!: Date;
    fechaEntrega!: Date;
    origenCompra : string= '' ;
    totalCompra : number = 0 ;
    costoFlete: number = 0 ;
    usuarioId: string= '' ;
    compraEstado: number = 0 ;
    compraStatus: string= '' ;
    compraDetalleTabla!: CompraDetalle[];
    index: number = 0 ;
    btnEstado!: boolean;
    Observacion: string= '' ;
  }
  


export class CompraDetalle {
    detalleCompraId: number = 0 ;
    compraId: number = 0 ;
    //proveedor: Proveedor;
    proveedorId: number = 0 ;
    //producto: Producto;
    productId: number = 0 ;
    unidadMedidaId: number = 0 ;
    unidadMedida: string= '' ;
    cantidadCompra : number = 0 ;
    pesoCompra: number = 0 ;
    precioUnitario: number = 0 ;
    precioCompra : number = 0 ;
    totalDeposito : number = 0 ;
    saldoDeposito : number = 0 ;
    saldoAnterior : number = 0 ;
    costoFleteItemCompra : number = 0 ;
    FleteCompra: number = 0 ;
    cantidadBuenEstado : number = 0 ;
    cantidadMalEstado: number = 0 ;
    documentoCompra: string= '' ;
    compraEstado: number = 0 ;
    btnEstado!: boolean;
    opcionConfirmar: string= '' ;
    Observacion: string= '' ;
    numeroDocumento: string= '' ;
  }
  
  
  export class CostosEntity {
    ProductId: number = 0 ;
    FechaCompra!: Date;
    TotalPrecioCompra: number = 0 ;
    TotalFleteCompra: number = 0 ;
    TotalCantidadCompra: number = 0 ;
    Stock: number = 0 ;
    Costo : number = 0 ;
    ValorTotal: number = 0 ; 
    EquivalenciaMayor:number = 0 ;
  }


  export class CompraEquivalencia {
    detalleCompraId: number = 0 ;
    cantidadCompra : number = 0 ;
    precioCompra : number = 0 ;
    unidadBase:string= '' ;
    unidadDestino: string= '' ;
    cantidadObjetos: string= '' ;
    costoFleteItemCompra : number = 0 ;
    PrecioUnitario: number = 0 ;
    unidadMedida: string= '' ;
    ///// variable para validar update de venta
    cantidadActualStock:number = 0 ;
    cantidadIngresada: number = 0 ;
    precioComprasinflete: number = 0 ;
    CantidadActualStock: number = 0 ;
    CostoFleteItemCompra: number = 0 ;
    objetosUnidadMedida: number = 0 ;
    equivalenciaMayor: number = 0 ;
    costo: number = 0 ;
  }
  