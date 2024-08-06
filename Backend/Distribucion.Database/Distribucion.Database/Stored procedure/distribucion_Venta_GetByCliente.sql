CREATE PROCEDURE [dbo].[distribucion_Venta_GetByCliente] 


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


--@ClienteId INT
--AS
--SELECT ProductId,
--       VentaId,
--       (DATEADD(hh,-5,[FechaVenta])) FechaVenta,
--       ClienteId,
--       ProductId,
--       CantidadVenta, 
--       PesoVenta,
--	   UnidadMedida,
--       PrecioRealVenta,
--       PrecioIngresadoVenta,
--       Amortizacion,
--       DeudaActualizada,
--	   IsReserva
--FROM	[dbo].[Venta] WITH(NOLOCK)
--WHERE	ClienteId = @ClienteId 
--		AND VentaState = 1
--		AND ProductId <> 1001
--ORDER BY [VentaId] DESC, [FechaVenta] DESC

