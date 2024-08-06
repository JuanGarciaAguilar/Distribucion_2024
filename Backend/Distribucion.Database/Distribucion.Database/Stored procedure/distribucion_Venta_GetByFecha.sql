CREATE PROCEDURE [dbo].[distribucion_Venta_GetByFecha]
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
WHERE CONVERT(DATE,(CAST(DATEADD(hh,-5,[FechaVenta]) AS DATETIME))) >= CONVERT(DATE,@FechaInicio)
       AND CONVERT(DATE,(CAST(DATEADD(hh,-5,[FechaVenta]) AS DATETIME))) <= CONVERT(DATE,@FechaFin)
	   AND ProductId <> 1001
ORDER BY [FechaVenta] DESC
