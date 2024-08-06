CREATE PROCEDURE [dbo].[distribucion_Reserva_GetAll]
	AS
SELECT 
       v.VentaId,
	   v.FechaReserva,
       (DATEADD(hh,-5,v.FechaReserva)) Fecha,
       v.ClienteId,
	   b.ClienteName,
       v.ProductId,
	   p.ProductName,
       v.CantidadVenta, 
       v.PesoVenta, 
       v.PrecioRealVenta,
       v.PrecioIngresadoVenta,
       v.Amortizacion,
	   p.productname,
       v.DeudaActualizada,
	   v.UnidadMedida,
	   c.sectorname,
	   v.Observacion
FROM [dbo].[Venta] v WITH(NOLOCK)
JOIN dbo.Cliente b WITH(NOLOCK) ON v.ClienteId = b.ClienteId
INNER JOIN Producto p WITH(NOLOCK) ON v.productid= p.productid
INNER JOIN dbo.Sector c WITH(NOLOCK) ON b.SectorId = c.SectorId	
WHERE v.CantidadVenta > 0 
	AND IsReserva = 1 
	AND VentaState = 1
	AND CONVERT(varchar, v.FechaReserva,1) = CONVERT(varchar, GETDATE(),1)
	---AND CONVERT(varchar, v.FechaReserva,1) = CONVERT(varchar,  DATEADD(DAY,-1,GETDATE()),1)
ORDER BY [FechaVenta]
DESC

