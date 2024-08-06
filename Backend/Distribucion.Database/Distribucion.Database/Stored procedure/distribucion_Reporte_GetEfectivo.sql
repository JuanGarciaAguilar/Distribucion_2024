CREATE PROCEDURE [dbo].[distribucion_Reporte_GetEfectivo]


@fechainicio date,
@fechafinal date
AS

CREATE TABLE #TMPTABLE(
Fecha DATETIME,
Descripcion NVARCHAR(250),
Monto DECIMAL(10,3)
)

INSERT INTO #TMPTABLE( Monto)
-------------- VENTAS
SELECT  Monto
FROM 
(
SELECT  SUM(PrecioRealVenta) Monto 
FROM Stock WITH(NOLOCK) where FechaStock between @fechainicio and @fechafinal
-----------------------
UNION ALL
---------------------- GASTOS
SELECT SUM(Gasto) Monto
FROM GastosSemanales GS INNER JOIN GastoSemanalDetalle GSD ON GS.GastoSemanalId = GSD.GastoSemanalId
 where FechaInicio between @fechainicio and @fechafinal
-----------------------
UNION ALL
------------ PAGOS
SELECT  (SUM(amortizacion) * -1 )Monto FROM Venta  where VentaState = 1   
  AND ProductId = 1001   AND IsReserva = 0 and (FechaVenta between @fechainicio and @fechafinal)
------------
UNION ALL
-------------------		FLETE	
SELECT 
(SUM(C.CostoFlete)*-1)Monto FROM Compra C INNER JOIN CompraDetalle CD ON C.CompraId=CD.CompraId
 where FechaCompra between @fechainicio and @fechafinal

------------------
UNION ALL
------------------ COMPRAS
SELECT (SUM(S.PrecioCompra)*-1) Monto  FROM	dbo.Stock S 
where  FechaStock between @fechainicio and @fechafinal
) AS T
--------
SELECT * 
FROM #TMPTABLE

DROP TABLE #TMPTABLE







--DECLARE
--	@Amortizacion DECIMAL(18,5),
--	@Compras DECIMAL(18,5),
--	@Flete DECIMAL(18,5),
--	@Gastos DECIMAL(18,5)
	
--SELECT
--	@Amortizacion = ISNULL(SUM(Amortizacion),0)
--FROM
--	[dbo].[Venta] WITH(NOLOCK)
--WHERE
--	[VentaState] = 1 AND IsReserva = 0

--SELECT
--	@Flete = ISNULL(SUM(CostoFlete),0)
--FROM
--	[dbo].[Compra] WITH(NOLOCK)

--SELECT
--	@Compras = ISNULL(SUM(TotalDeposito),0)
--FROM
--	[dbo].[CompraDetalle] WITH(NOLOCK)
--WHERE
--	[CompraEstado] IN (1,2)

--SELECT
--	@Gastos = ISNULL(SUM(GastoTotal),0)
--FROM
--	[dbo].[GastosSemanales] WITH(NOLOCK)

--select 
--	 @Amortizacion - @Compras - @Flete - @Gastos as total

