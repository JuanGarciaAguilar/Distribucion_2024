CREATE PROCEDURE [dbo].[distribucion_Stock_GetTotalCapital]

AS

DECLARE @Amort DECIMAL(18,3) = 0.00
DECLARE @Deuda DECIMAL(18,3) = 0.00
DECLARE @ValorStock DECIMAL(18,3) = 0.00

SELECT
		--ISNULL(SUM(PrecioIngresadoVenta),0) AS VentaTotal,
        @Amort = ISNULL(SUM(V.Amortizacion),0),
        @Deuda = SUM(V.PrecioIngresadoVenta - V.Amortizacion)
FROM
		[dbo].[Venta] V WITH(NOLOCK)
JOIN
		[dbo].[Cliente] C
ON
		V.[ClienteId] = C.[ClienteId]
WHERE
		V.[VentaState] = 1
		AND V.IsReserva = 0

        PRINT @Amort
        PRINT @Deuda


--SELECT --Select General
--        @Otro = SUM(
--        CAST((f.FleteUnitario + f.CostoUnitarioCompra )*s.CantidadActualStock AS DECIMAL(18,3)))
        
--FROM
--       (SELECT --Select Stocks actuales
--                s.ProductId,
--                s.FechaStock,
--                s.CantidadActualStock
--        FROM
--                dbo.Stock s WITH(NOLOCK)
--        INNER JOIN (
--                SELECT
--                        ProductId, 
--                        MAX(FechaStock) AS LastFecha
--                FROM 
--                        dbo.Stock WITH(NOLOCK)
--                GROUP BY ProductId) tm 
--        ON
--                s.ProductId = tm.ProductId AND
--                s.FechaStock = tm.LastFecha ) s
--INNER JOIN
--       (SELECT --Select costosUnitarios compra y flete
--                s.ProductId,
--                s.FechaStock,
--                s.CostoUnitarioCompra,
--                CASE 
--                WHEN s.CantidadIngresada >0
--                THEN CAST(s.FleteUnidadCompra/s.CantidadIngresada AS DECIMAL(18,3))
--                WHEN s.PesoCompra >0
--                THEN CAST(s.FleteUnidadCompra/s.PesoCompra AS DECIMAL(18,3))
--                END AS FleteUnitario,
--                s.CostoUnitarioTotalCompra

--        FROM
--                dbo.Stock s WITH(NOLOCK)
--        INNER JOIN (
--                SELECT
--                        ProductId, 
--                        MAX(FechaStock) AS LastFecha
--                FROM 
--                        dbo.Stock WITH(NOLOCK)
--                WHERE
--                        VentaId IS NULL
--                GROUP BY ProductId) tm 
--        ON
--                s.ProductId = tm.ProductId AND
--                s.FechaStock = tm.LastFecha ) f
--ON s.ProductId = f.ProductId

SELECT 
	@ValorStock = CAST(SUM(R.PrecioCompraRelativo) + SUM(R.CostoFleteItemCompraRelativo) AS DECIMAL (18,3))

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
					WHEN SA.CantidadActualStock < DP.StockAcumulado AND SA.CantidadActualStock < CantidadMinima THEN SA.CantidadActualStock
				END
		),
		DP.CantidadMinima,
		DP.PrecioCompra,
		PrecioCompraRelativo = (
			SELECT
				CASE
					WHEN SA.CantidadActualStock >= DP.StockAcumulado THEN DP.PrecioCompra
					WHEN SA.CantidadActualStock < DP.StockAcumulado AND SA.CantidadActualStock > CantidadMinima THEN DP.PrecioCompra * (DP.CantidadMinima - (DP.StockAcumulado - SA.CantidadActualStock)) / DP.CantidadMinima
					WHEN SA.CantidadActualStock < DP.StockAcumulado AND SA.CantidadActualStock < CantidadMinima THEN DP.PrecioCompra * SA.CantidadActualStock / DP.CantidadMinima
				END
		),
		DP.CostoFleteItemCompra,
		CostoFleteItemCompraRelativo = (
			SELECT
				CASE
					WHEN SA.CantidadActualStock >= DP.StockAcumulado THEN DP.CostoFleteItemCompra
					WHEN SA.CantidadActualStock < DP.StockAcumulado AND SA.CantidadActualStock > CantidadMinima THEN DP.CostoFleteItemCompra * (DP.CantidadMinima - (DP.StockAcumulado - SA.CantidadActualStock)) / DP.CantidadMinima
					WHEN SA.CantidadActualStock < DP.StockAcumulado AND SA.CantidadActualStock < CantidadMinima THEN DP.CostoFleteItemCompra * SA.CantidadActualStock / DP.CantidadMinima
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
			)
		FROM
			[dbo].[Stock] S WITH (NOLOCK)) SA
	
	INNER JOIN

		(SELECT
			CD.ProductId,
			C.FechaEntrega,
			CD.CantidadMinima,
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
				Compra ON CompraDetalle.CompraId = Compra.CompraId
			WHERE
				CD.ProductId = ProductId
				AND C.FechaEntrega <= Compra.FechaEntrega
				AND CompraEstado = 1
			)
		FROM
			CompraDetalle CD WITH (NOLOCK)
		JOIN
			Compra C ON CD.CompraId = C.CompraId
		WHERE
			CD.CompraEstado = 1
		) DP
	
	ON SA.ProductId = DP.ProductId
	
	WHERE
		SA.CantidadActualStock - DP.StockAcumulado + DP.CantidadMinima > 0
	--ORDER BY
		--DP.ProductId ASC, DP.FechaEntrega DESC
	) R

DECLARE @Compras DECIMAL (18,5)

SELECT
	@Compras = ISNULL(SUM(TotalDeposito),0)
FROM
	[dbo].[CompraDetalle] WITH(NOLOCK)
WHERE
	[CompraEstado] IN (1,2)

DECLARE @Flete DECIMAL (18,5)

SELECT
	@Flete = ISNULL(SUM(CostoFlete),0)
FROM
	[dbo].[Compra] WITH(NOLOCK)

SELECT
    @Amort + @Deuda + @ValorStock - @Compras - @Flete AS Total