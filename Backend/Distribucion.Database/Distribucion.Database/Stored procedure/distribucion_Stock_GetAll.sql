CREATE PROCEDURE [dbo].[distribucion_Stock_GetAll]
AS

--SELECT 
--  sp.ProductId,  
--  p.ProductName,
--  (DATEADD(HOUR,-5,sp.FechaStock)) FechaStock,      
--  CantidadStockPrevioCompra =  ISNULL(( SELECT TOP 1 CantidadActualStock 
--            FROM dbo.Stock S WITH(NOLOCK) 
--            WHERE S.ProductId = sp.ProductId 
--             AND S.FechaStock < sp.FechaStock
--            ORDER BY FechaStock DESC ),0),
--  sp.CantidadIngresada,  
--  sp.CantidadActualStock CantidadActualStockFechaRelativa,
--  StockRealActual = (SELECT TOP 1 CantidadActualStock 
--       FROM dbo.Stock S WITH(NOLOCK) 
--       WHERE S.ProductId = sp.ProductId 
--        AND VentaId IS NOT NULL 
--       ORDER BY FechaStock DESC ),
--        sp.CostoUnitarioCompra,  
--        CASE  WHEN sp.CantidadIngresada > 0 THEN CAST(sp.FleteUnidadCompra/sp.CantidadIngresada AS DECIMAL(18,3))  
--              WHEN sp.PesoCompra > 0 THEN CAST(sp.FleteUnidadCompra/sp.PesoCompra AS DECIMAL(18,3))  
--              END AS FleteUnitario,  
--  sp.CostoUnitarioTotalCompra AS Total
--FROM dbo.Stock sp WITH(NOLOCK) 
--JOIN Producto P
--ON 		P.ProductId = sp.ProductId
--WHERE sp.DetalleCompraId is not null
--ORDER BY sp.ProductId, sp.FechaStock desc

SELECT 
	PP.ProductId AS ProductParentId,
	PP.ProductName AS ProductParentName,
	R.ProductId,
	P.ProductName,
	UnidadMedida = (SELECT TOP 1 UnidadBase FROM Equivalencia WITH (NOLOCK) WHERE R.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC),
	CAST(AVG(R.CantidadActualStock) AS DECIMAL (18,3)) AS CantidadActualStock,
	CAST(SUM(R.PrecioCompraRelativo)/AVG(R.CantidadActualStock) AS DECIMAL (18,5)) AS CostoUnitarioCompra,
	CAST(SUM(R.PrecioCompraRelativo) AS DECIMAL (18,5)) AS CostoCompra,
	CAST(SUM(R.CostoFleteItemCompraRelativo)/AVG(R.CantidadActualStock) AS DECIMAL (18,5)) AS CostoFleteUnitario,
	CAST(SUM(R.CostoFleteItemCompraRelativo) AS DECIMAL (18,5)) AS CostoFlete,
	CAST(SUM(R.PrecioCompraRelativo)/AVG(R.CantidadActualStock) + SUM(R.CostoFleteItemCompraRelativo)/AVG(R.CantidadActualStock) AS DECIMAL (18,5)) AS CostoUnitarioTotal,
	CAST(SUM(R.PrecioCompraRelativo) + SUM(R.CostoFleteItemCompraRelativo) AS DECIMAL (18,3)) AS ValorTotal

FROM
	(SELECT
		SA.ProductId,
		SA.CantidadActualStock,
		DP.StockAcumulado,
		DP.FechaEntrega,
		CantidadCompra = (
			SELECT
				CASE
					WHEN SA.CantidadActualStock >= DP.StockAcumulado THEN DP.CantidadMinima
					WHEN SA.CantidadActualStock < DP.StockAcumulado AND SA.CantidadActualStock > CantidadMinima THEN DP.CantidadMinima - (DP.StockAcumulado - SA.CantidadActualStock)
					WHEN SA.CantidadActualStock < DP.StockAcumulado AND SA.CantidadActualStock < CantidadMinima THEN SA.CantidadActualStock - (DP.StockAcumulado - DP.CantidadMinima)
				END
		),
		DP.CantidadMinima,
		DP.PrecioCompra,
		PrecioCompraRelativo = (
			SELECT
				CASE
					WHEN SA.CantidadActualStock >= DP.StockAcumulado THEN DP.PrecioCompra
					WHEN SA.CantidadActualStock < DP.StockAcumulado AND SA.CantidadActualStock > CantidadMinima THEN DP.PrecioCompra * (DP.CantidadMinima - (DP.StockAcumulado - SA.CantidadActualStock)) / DP.CantidadMinima
					WHEN SA.CantidadActualStock < DP.StockAcumulado AND SA.CantidadActualStock < CantidadMinima THEN DP.PrecioCompra * (SA.CantidadActualStock - (DP.StockAcumulado - DP.CantidadMinima)) / DP.CantidadMinima
				END
		),
		DP.CostoFleteItemCompra,
		CostoFleteItemCompraRelativo = (
			SELECT
				CASE
					WHEN SA.CantidadActualStock >= DP.StockAcumulado THEN DP.CostoFleteItemCompra
					WHEN SA.CantidadActualStock < DP.StockAcumulado AND SA.CantidadActualStock > CantidadMinima THEN DP.CostoFleteItemCompra * (DP.CantidadMinima - (DP.StockAcumulado - SA.CantidadActualStock)) / DP.CantidadMinima
					WHEN SA.CantidadActualStock < DP.StockAcumulado AND SA.CantidadActualStock < CantidadMinima THEN DP.CostoFleteItemCompra * (SA.CantidadActualStock - (DP.StockAcumulado - DP.CantidadMinima)) / DP.CantidadMinima
				END
		),
		DP.TotalDeposito

	FROM

		(SELECT DISTINCT
			S.[ProductId],
			CantidadActualStock = (
				SELECT TOP 1
					[CantidadActualStock]
				FROM
					[dbo].[Stock] WITH (NOLOCK)
				WHERE
					S.[ProductId] = [ProductId]
				ORDER BY
					[FechaStock] DESC
			)  / (SELECT TOP 1 CantidadObjetos FROM Equivalencia WITH (NOLOCK) WHERE S.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC)
		FROM
			[dbo].[Stock] S WITH (NOLOCK)) SA
	
	INNER JOIN

		(SELECT
			CD.ProductId,
			C.FechaEntrega,
			CD.CantidadMinima / (SELECT TOP 1 CantidadObjetos FROM Equivalencia WITH (NOLOCK) WHERE CD.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC) AS CantidadMinima,
			CD.PrecioCompra,
			--PrecioUnitario = CAST(PrecioCompra / CantidadMinima AS DECIMAL(18,3)),
			CD.CostoFleteItemCompra,
			--CostoFleteUnitario = CAST(CostoFleteItemCompra / CantidadMinima AS DECIMAL(18,3)),
			CD.TotalDeposito,
			StockAcumulado = (
			SELECT
				SUM(CantidadMinima)
			FROM
				CompraDetalle WITH (NOLOCK)
			JOIN
				Compra WITH(NOLOCK) ON CompraDetalle.CompraId = Compra.CompraId
			WHERE
				CD.ProductId = ProductId
				AND C.FechaEntrega <= Compra.FechaEntrega
				AND CompraEstado = 1
			) / (SELECT TOP 1 CantidadObjetos FROM Equivalencia WITH (NOLOCK) WHERE CD.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC)
		FROM
			CompraDetalle CD WITH (NOLOCK)
		JOIN
			Compra C WITH(NOLOCK) ON CD.CompraId = C.CompraId
		WHERE
			CD.CompraEstado = 1
		) DP
	
	ON SA.ProductId = DP.ProductId
	
	WHERE
		SA.CantidadActualStock - DP.StockAcumulado + DP.CantidadMinima > 1
	--ORDER BY
		--DP.ProductId ASC, DP.FechaEntrega DESC
	) R

JOIN
	[dbo].[Producto] P WITH(NOLOCK) ON R.ProductId = P.ProductId

JOIN
	[dbo].[Producto] PP WITH(NOLOCK) ON P.ProductParentId = PP.ProductId

GROUP BY
	PP.ProductId, PP.ProductName, R.ProductId, P.ProductName