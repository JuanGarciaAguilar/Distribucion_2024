CREATE PROCEDURE [dbo].[distribucion_Venta_GetAll]
AS
SELECT 
       v.VentaId,
       (DATEADD(hh,-5,v.[FechaVenta])) FechaVenta,
       v.ClienteId,
       v.ProductId,
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
WHERE v.CantidadVenta > 0 AND IsReserva = 0 AND p.ProductId <> 1001
ORDER BY [FechaVenta]
DESC