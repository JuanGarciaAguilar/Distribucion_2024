CREATE PROCEDURE [dbo].[distribucion_Venta_GetDeudaByCliente] 
@ClienteId INT,
@Producto varchar(50)=''
AS



SELECT venta.ProductId,
       venta.VentaId,
	   FechaReserva,
       (DATEADD(hh,-5,[FechaVenta])) FechaVenta,
	   venta.PrecioIngresadoVenta,
       venta.ClienteId,
       venta.ProductId,
       Amortizacion,
       DeudaActualizada,
	   Observacion 
FROM	[dbo].[Venta] WITH(NOLOCK) inner join Producto p
on Venta.ProductId=p.ProductId 
WHERE	venta.ClienteId = @ClienteId 
		AND VentaState = 1
		AND IsReserva = 0
ORDER BY [VentaId] DESC, [FechaVenta] DESC
