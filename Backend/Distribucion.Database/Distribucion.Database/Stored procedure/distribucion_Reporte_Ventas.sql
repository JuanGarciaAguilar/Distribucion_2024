--[distribucion_Reporte_Ventas] '08/11/2020', '08/11/2020', 1051

CREATE PROCEDURE [dbo].[distribucion_Reporte_Ventas]        
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
 Prioridad = 3,        
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
 StockSobrante = (         
  SELECT TOP 1        
   CantidadActualStock        
  FROM Stock S   WITH(NOLOCK)      
  WHERE V.ProductId = S.ProductId        
  AND DATEADD(HOUR,-5,S.FechaStock) <= @FechaFin        
  ORDER BY FechaStock DESC        
  ),        
 StockInicial = (        
  SELECT TOP 1        
   CantidadActualStock        
  FROM Stock S   WITH(NOLOCK)      
  WHERE V.ProductId = S.ProductId        
  AND DATEADD(HOUR,-5,S.FechaStock) < @FechaInicio        
  ORDER BY FechaStock DESC        
  ) ,
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
 AND V.IsReserva = 0
        
UNION ALL    
        
--Stock Inicial        
SELECT DISTINCT        
 Prioridad = 1,        
 Fecha = @FechaInicio,        
 Descripcion = 'Stock Inicial',        
 'Stock Inicial',   
 PR.RelevanceValue,        
 ProductParentId = PP.ProductId,         
 ProductParentName = ' ' + PP.ProductName, --Artificio para que PagoDeuda se ubique al final        
 V.ProductId,        
 P.ProductName,        
 0,   
 '  Stock Inicial',     
 NULL,        
 NULL,       
 NULL,    
 NULL,     
 (SELECT TOP 1 UnidadBase FROM Equivalencia WITH (NOLOCK) WHERE V.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC),           
 NULL,     
 NULL,  
 NULL,  
 NULL,  
 StockInicial = (        
  SELECT TOP 1        
   CantidadActualStock / (SELECT TOP 1 CantidadObjetos FROM Equivalencia WITH(NOLOCK) WHERE V.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC)        
  FROM Stock S WITH(NOLOCK)       
  WHERE V.ProductId = S.ProductId        
  AND DATEADD(HOUR,-5,S.FechaStock) < @FechaInicio        
  ORDER BY FechaStock DESC        
  )      ,
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
 DATEADD(HOUR,-5,V.[FechaVenta]) <= @FechaFin    
 AND V.IsReserva = 0
        
UNION ALL 
        
--Compras        
SELECT        
 Prioridad = 2,        
 Fecha = DATEADD(HOUR,-5,C.FechaEntrega),        
 Descripcion = 'Compra',        
 'Compra',--C.ClienteName,        
 PR.RelevanceValue,        
 ProductParentId = PP.ProductId,         
 ProductParentName = ' ' + PP.ProductName, --Artificio para que PagoDeuda se ubique al final        
 CD.ProductId,        
 P.ProductName,        
 0,--S.SectorId,        
 '  Stock Inicial',--S.SectorName,        
 NULL,--V.[CantidadVenta],        
 NULL,--V.[CantidadMinima],        
 CantidadCompra = CD.[CantidadCompra],        
 CantidadCompraEstandar = CD.[CantidadMinima] / (SELECT TOP 1 CantidadObjetos FROM Equivalencia WITH (NOLOCK) WHERE CD.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC) ,             
 UnidadMedida = CD.[UnidadMedida],        
 --V.[PesoVenta],        
 NULL,--V.[PrecioIngresadoVenta],        
 NULL,--V.[Amortizacion],        
 NULL,--Stock = (SELECT CantidadActualStock FROM Stock WHERE Stock.VentaId = V.VentaId),        
 NULL,  
 NULL,
 NULL,
 NULL
FROM        
 [dbo].[Compra] C WITH (NOLOCK)        
JOIN        
 [dbo].[CompraDetalle] CD WITH(NOLOCK) ON CD.CompraId = C.CompraId        
JOIN        
 [dbo].[Producto] P WITH(NOLOCK) ON P.[ProductId] = CD.[ProductId]        
JOIN        
 [dbo].[Producto] PP WITH(NOLOCK) ON P.[ProductParentId] = PP.[ProductId]        
JOIN        
 [dbo].[ProductRelevance] PR WITH(NOLOCK) ON PR.[RelevanceProductId] = PP.[ProductId]        
WHERE        
 DATEADD(HOUR,-5,C.[FechaEntrega]) >= @FechaInicio        
 AND DATEADD(HOUR,-5,C.[FechaEntrega]) <= @FechaFin        
 AND CD.CompraEstado = 1        
        
UNION ALL    
        
--Stock Sobrante        
SELECT DISTINCT        
 Prioridad = 5,        
 Fecha = @FechaFin,        
 Descripcion = 'Stock Final',        
 'Stock Final',--C.ClienteName,        
 PR.RelevanceValue,        
 ProductParentId = PP.ProductId,         
 ProductParentName = ' ' + PP.ProductName, --Artificio para que PagoDeuda se ubique al final        
 V.ProductId,        
 P.ProductName,        
 (SELECT TOP 1 SectorId FROM Sector WITH(NOLOCK) ORDER BY SectorId DESC) + 1,--S.SectorId,        
 'Stock Final',--S.SectorName,        
 NULL,--V.[CantidadVenta],        
 NULL,--V.[CantidadMinima],        
 NULL,--CD.[CantidadCompra],        
 NULL,--CD.[CantidadMinima] / (SELECT TOP 1 CantidadObjetos FROM Equivalencia WITH (NOLOCK) WHERE V.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC)        
 (SELECT TOP 1 UnidadBase FROM Equivalencia WITH (NOLOCK) WHERE V.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC),--V.[UnidadMedida],        
 --V.[PesoVenta],        
 NULL,--V.[PrecioIngresadoVenta],        
 NULL,--V.[Amortizacion],        
 NULL,--Stock = (SELECT CantidadActualStock FROM Stock WHERE Stock.VentaId = V.VentaId),        
 StockSobrante = (         
  SELECT TOP 1        
    CantidadActualStock / (SELECT TOP 1 CantidadObjetos FROM Equivalencia WITH(NOLOCK) WHERE V.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC)        
  FROM Stock S WITH (NOLOCK)        
  WHERE V.ProductId = S.ProductId        
  AND DATEADD(HOUR,-5,S.FechaStock) <= @FechaFin        
  ORDER BY FechaStock DESC        
  ),        
 NULL,
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
 DATEADD(HOUR,-5,V.[FechaVenta]) <= @FechaFin  
 AND V.IsReserva = 0
        
UNION ALL     
        
--Pago de deudas        
SELECT        
 Prioridad = 4,        
 Fecha = DATEADD(HOUR,-5,V.FechaVenta),        
 Descripcion = 'Pago Deuda',        
 C.ClienteName,        
 (SELECT TOP 1 RelevanceValue FROM ProductRelevance WITH(NOLOCK) ORDER BY RelevanceValue DESC) + 1,        
 NULL,--PP.ProductId [ProductParentId],         
 'Pago Deuda',--PP.ProductName [ProductParentName],        
 NULL,--V.ProductId,        
 'Pago Deuda',--P.ProductName,        
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
 NULL,  
 NULL ,
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

