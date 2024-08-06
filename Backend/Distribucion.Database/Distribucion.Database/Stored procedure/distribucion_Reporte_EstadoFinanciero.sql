CREATE PROCEDURE dbo.distribucion_Reporte_EstadoFinanciero
AS

CREATE TABLE #TMPTABLE(
Fecha DATETIME,
Descripcion NVARCHAR(250),
Monto DECIMAL(10,3)
)

INSERT INTO #TMPTABLE(Fecha, Descripcion, Monto)
-------------- VENTAS
SELECT CAST(Fecha as DATETIME), Descripcion, Monto
FROM 
(
SELECT 
		CONVERT(VARCHAR(10), FechaStock, 111) Fecha, 
		'Ventas / Amortizaciones' Descripcion, 
		SUM(PrecioRealVenta) Monto 
FROM	Stock WITH(NOLOCK)
GROUP BY CONVERT(VARCHAR(10), FechaStock, 111), DetalleCompraId
HAVING DetalleCompraId IS NULL
-----------------------
UNION ALL
---------------------- GASTOS
SELECT 
	CONVERT(VARCHAR(10), FechaInicio, 111) Fecha, 
	('Gastos Diarios: ' + '- Insumo: ' +CAST((GSD.Insumo) AS NVARCHAR(20))+'- Comentario: ' + CAST((GSD.Comentario) AS NVARCHAR(20))) Descripcion,
	SUM(Gasto) Monto
FROM GastosSemanales GS INNER JOIN GastoSemanalDetalle GSD ON GS.GastoSemanalId = GSD.GastoSemanalId
GROUP BY CONVERT(VARCHAR(10), FechaInicio, 111),GS.GastoSemanalId, GSD.Insumo ,GSD.Comentario
-----------------------
UNION ALL
------------ PAGOS
SELECT
		CONVERT(VARCHAR(10), FechaVenta, 111) Fecha, 
		('Pagos')Descripcion, 
		(SUM(amortizacion) * -1 )Monto
	FROM Venta 
where VentaState = 1   
  AND ProductId = 1001   
 AND IsReserva = 0
 GROUP BY CONVERT(VARCHAR(10), FechaVenta, 111)
------------
UNION ALL
-------------------		FLETE	
SELECT 
CONVERT(VARCHAR(10),C.FechaCompra, 111) Fecha,
('Flete') Descripcion,
(SUM(C.CostoFlete)*-1)Monto
FROM Compra C INNER JOIN CompraDetalle CD ON C.CompraId=CD.CompraId
GROUP BY CONVERT(VARCHAR(10), C.FechaCompra, 111)

------------------
UNION ALL
------------------ COMPRAS
SELECT 
		CONVERT(VARCHAR(10), FechaStock, 111) Fecha, 
		('Compras: ' + PR.ProductName + ' - ' + ' Flete:' + CAST(CAST(SUM(CD.CostoFleteItemCompra) AS smallint) AS NVARCHAR(20)) + ' - ' + CAST(CAST(SUM(CD.CantidadCompra) AS smallint) AS NVARCHAR(20)) + ' ' +  CD.UnidadMedida + ' - ' + P.ProveedorName ) Descripcion, 
		(SUM(S.PrecioCompra)*-1) Monto 
FROM	dbo.Stock S WITH(NOLOCK)
INNER JOIN dbo.CompraDetalle CD WITH(NOLOCK) ON S.DetalleCompraId = CD.DetalleCompraId
INNER JOIN dbo.Proveedor P WITH(NOLOCK) ON CD.ProveedorId = P.ProveedorId
INNER JOIN dbo.Producto PR WITH(NOLOCK) ON S.ProductId = PR.ProductId
GROUP BY CONVERT(VARCHAR(10), FechaStock, 111), S.ProductId, PR.ProductName, CD.UnidadMedida, P.ProveedorName
) AS T
--------
SELECT * 
FROM #TMPTABLE
ORDER BY Fecha DESC


DROP TABLE #TMPTABLE