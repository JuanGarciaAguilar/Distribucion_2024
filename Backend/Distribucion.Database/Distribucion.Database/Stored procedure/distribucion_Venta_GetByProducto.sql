CREATE PROCEDURE [dbo].[distribucion_Venta_GetByProducto]
@ProductId INT
AS
SELECT 
    VentaId,
    FechaVenta,
    ClienteId,
    ProductId,
    CantidadVenta,
    PesoVenta,
    PrecioRealVenta,
    PrecioIngresadoVenta,
    Amortizacion,
    DeudaActualizada,
	IsReserva
FROM [dbo].[Venta] WITH(NOLOCK)
WHERE ProductId = @ProductId
ORDER BY [FechaVenta] DESC
