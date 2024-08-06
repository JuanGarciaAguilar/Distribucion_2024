CREATE PROCEDURE [dbo].[distribucion_Venta_GetById]
@VentaId INT
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
WHERE VentaId = @VentaId
		AND ProductId <> 1001
ORDER BY [FechaVenta] DESC
