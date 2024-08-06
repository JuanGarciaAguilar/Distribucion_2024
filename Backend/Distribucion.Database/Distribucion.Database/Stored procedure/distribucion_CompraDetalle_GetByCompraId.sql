CREATE PROCEDURE [dbo].[distribucion_CompraDetalle_GetByCompraId]
@CompraId INT
AS
SELECT  DetalleCompraId,
        CompraId,
        Proveedor.ProveedorName,
        Producto.ProductName,
        CantidadCompra,
        PesoCompra,
		PrecioUnitario,
        PrecioCompra,
        TotalDeposito,
        SaldoDeposito,
        CostoFleteItemCompra,
        CantidadBuenEstado,
        CantidadMalEstado
FROM [dbo].[CompraDetalle] WITH(NOLOCK)
INNER JOIN Producto ON Producto.ProductId = CompraDetalle.ProductId
INNER JOIN Proveedor ON Proveedor.ProveedorId = CompraDetalle.ProveedorId
WHERE [CompraId] = @CompraId
