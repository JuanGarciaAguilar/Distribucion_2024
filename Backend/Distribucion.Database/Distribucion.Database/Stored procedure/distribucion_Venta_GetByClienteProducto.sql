CREATE PROCEDURE [dbo].[distribucion_Venta_GetByClienteProducto]
@ClienteId INT,
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
WHERE ClienteId = @ClienteId
    AND ProductId = @ProductId
ORDER BY [FechaVenta] DESC
