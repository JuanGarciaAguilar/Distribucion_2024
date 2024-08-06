CREATE PROCEDURE [dbo].[distribucion_Reporte_Pagos]
	@FechaInicio DATETIME,        
@FechaFin DATETIME,
@ProductId INT
AS

-- SET FechaFin to 24:00:00.00 (next day)        
SELECT @FechaFin = DATEADD(DAY, 1, @FechaFin)        
-- SET FechaFin to 23:59:59.990 (real day)        
SELECT @FechaFin = DATEADD(MILLISECOND, -10, @FechaFin)        
        
SELECT *
INTO #TempData
FROM
(
--Data de ventas        
SELECT        
 Prioridad = 2,        
 Fecha = DATEADD(HOUR,-5,V.FechaVenta),        
 Descripcion = 'Venta',        
 ClienteName = C.ClienteName,        
 PR.RelevanceValue,        
 ProductParentId = PP.ProductId,         
 ProductParentName = ' ' + PP.ProductName, --Artificio para que PagoDeuda se ubique al final        
 ProductId = V.ProductId,        
 ProductName = P.ProductName,        
 SectorId = S.SectorId,        
 SectorName = ' ' + S.SectorName,        
 CantidadVenta = V.[CantidadVenta],        
 CantidadVentaEstandar =  V.[CantidadMinima] / (SELECT TOP 1 CantidadObjetos FROM Equivalencia WITH (NOLOCK) WHERE V.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC),
 CantidadCompra = NULL,      
 CantidadCompraEstandar = NULL,
 --Observacion,
 UnidadMedida = V.[UnidadMedida],            
 V.[PrecioIngresadoVenta],        
 V.[Amortizacion],        
 Stock = (SELECT CantidadActualStock FROM Stock WITH(NOLOCK) WHERE Stock.VentaId = V.VentaId),        
  v.UsuarioId,
  v.Observacion
FROM        
 [dbo].[Venta] V WITH (NOLOCK)        
JOIN        
 [dbo].[Producto] P WITH(NOLOCK) ON P.[ProductId] = V.[ProductId]        
JOIN        
 [dbo].[Producto] PP WITH(NOLOCK) ON P.[ProductParentId] = PP.[ProductId]        
JOIN        
 [dbo].[ProductRelevance] PR WITH(NOLOCK) ON PR.[RelevanceProductId] = PP.[ProductId]        
JOIN        
 [dbo].[Cliente] C WITH(NOLOCK) ON C.[ClienteId] = V.[ClienteId]        
JOIN        
 [dbo].[Sector] S WITH(NOLOCK) ON S.[SectorId] = C.[SectorId]        
WHERE        
 DATEADD(HOUR,-5,V.[FechaVenta]) >= @FechaInicio        
 AND DATEADD(HOUR,-5,V.[FechaVenta]) <= @FechaFin        
 AND V.VentaState = 1   
  AND P.ProductName = 'NONProduct'   
 AND V.IsReserva = 0

UNION ALL     
        
--Pago de deudas        
SELECT        
 Prioridad = 1,        
 Fecha = DATEADD(HOUR,-5,V.FechaVenta),        
 Descripcion = 'Pago Deuda',        
 C.ClienteName,        
 (SELECT TOP 1 RelevanceValue FROM ProductRelevance WITH(NOLOCK) ORDER BY RelevanceValue DESC) + 1,        
 NULL,--PP.ProductId [ProductParentId],         
 'Pago Deuda',--PP.ProductName [ProductParentName],        
 V.ProductId,        
 P.ProductName,        
 S.SectorId,        
 ' ' + S.SectorName,        
 NULL,--V.[CantidadVenta],        
 NULL,--V.[CantidadMinima],        
 NULL,--CD.[CantidadCompra],        
 NULL,--CD.[CantidadMinima] / (SELECT TOP 1 CantidadObjetos FROM Equivalencia WITH (NOLOCK) WHERE V.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC)        
 NULL,--V.[UnidadMedida],        
 --V.[PesoVenta],        
 NULL,--V.[PrecioIngresadoVenta],        
 V.[Amortizacion],        
 NULL,--Stock = (SELECT CantidadActualStock FROM Stock WHERE Stock.VentaId = V.VentaId),        
 
 v.UsuarioId,
 v.Observacion
FROM        
 [dbo].[Venta] V WITH (NOLOCK)        
JOIN        
 [dbo].[Producto] P WITH(NOLOCK) ON P.[ProductId] = V.[ProductId]        
JOIN        
 [dbo].[Cliente] C WITH(NOLOCK) ON C.[ClienteId] = V.[ClienteId]        
JOIN        
 [dbo].[Sector] S WITH(NOLOCK) ON S.[SectorId] = C.[SectorId]        
WHERE        
 DATEADD(HOUR,-5,V.[FechaVenta]) >= @FechaInicio        
 AND DATEADD(HOUR,-5,V.[FechaVenta]) <= @FechaFin        
 AND P.ProductName = 'NONProduct'        
 AND V.VentaState = 1        
 AND V.IsReserva = 0
 ) AS T
 
IF @ProductId = 0
BEGIN
	SELECT * FROM #TempData
	ORDER BY [RelevanceValue] ASC, [ProductId] ASC, Prioridad ASC, SectorId ASC, [Fecha] ASC 
END
ELSE
BEGIN
	SELECT * FROM #TempData
	WHERE ProductId = @ProductId
	ORDER BY [RelevanceValue] ASC, [ProductId] ASC, Prioridad ASC, SectorId ASC, [Fecha] ASC 
END

DROP TABLE #TempData
GO