CREATE PROCEDURE [dbo].[distribucion_Venta_GetByClienteProductoFecha]
@ClienteId INT,
@ProductId INT,
@FechaInicio DATETIME,
@FechaFin DATETIME
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
    AND CONVERT(DATE,(CAST(DATEADD(hh,-5,[FechaVenta]) AS DATETIME))) >= CONVERT(DATE,@FechaInicio)
    AND CONVERT(DATE,(CAST(DATEADD(hh,-5,[FechaVenta]) AS DATETIME))) <= CONVERT(DATE,@FechaFin)   
	
ORDER BY [FechaVenta] DESC
