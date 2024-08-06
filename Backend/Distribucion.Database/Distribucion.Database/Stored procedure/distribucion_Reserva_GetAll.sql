ALTER PROCEDURE [dbo].[distribucion_Reserva_GetAll]
AS
SELECT 
       v.VentaId,
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
	   c.sectorname
FROM [dbo].[Venta] v WITH(NOLOCK)
JOIN dbo.Cliente b WITH(NOLOCK) ON v.ClienteId = b.ClienteId
INNER JOIN Producto p WITH(NOLOCK) ON v.productid= p.productid
INNER JOIN dbo.Sector c WITH(NOLOCK) ON b.SectorId = c.SectorId	
WHERE v.CantidadVenta > 0 
	AND IsReserva = 1 
	AND VentaState = 1
	AND p.ProductId <> 1001
    AND CONVERT(varchar, v.FechaReserva,1) = CONVERT(varchar, GETDATE(),1)
	--AND v.FechaReserva > DATEADD(day, -1, GETDATE())
ORDER BY [FechaVenta]
DESC