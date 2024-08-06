CREATE PROCEDURE [dbo].[distribucion_Compra_GetAll]  
AS  
SELECT  
    C.CompraId,  
    FechaCompra,  
    FechaEntrega,  
    OrigenCompra,  
    TotalCompra,  
    CostoFlete,  
    DetalleCompraId,  
    P.ProveedorId,  
    ProductId,  
    CantidadCompra,  
    PesoCompra,  
 PrecioUnitario,  
    PrecioCompra,  
    TotalDeposito,  
    SaldoDeposito,  
    CostoFleteItemCompra,  
    CantidadBuenEstado,  
    CantidadMalEstado,  
 DocumentoCompra,  
 CD.UnidadMedida,  
 CantidadMinima,  
 CompraEstado,
 P.ProveedorName
FROM [dbo].[Compra] C WITH(NOLOCK)  
    LEFT JOIN CompraDetalle CD ON C.CompraId = CD.CompraId  
	INNER JOIN dbo.Proveedor P ON P.ProveedorId = CD.ProveedorId
ORDER BY FechaCompra DESC, C.CompraId DESC  