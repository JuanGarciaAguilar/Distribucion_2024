CREATE PROCEDURE [dbo].[distribucion_Reporte_GetEfectivo_All]

AS

CREATE TABLE #TMPTABLE(

Monto DECIMAL(10,3)
)

INSERT INTO #TMPTABLE(Monto)
-------------- VENTAS
SELECT Monto FROM 
(
SELECT  SUM(PrecioRealVenta) Monto FROM	Stock 
-----------------------
UNION ALL
---------------------- GASTOS
SELECT SUM(Gasto) Monto FROM GastosSemanales GS 
INNER JOIN GastoSemanalDetalle GSD ON GS.GastoSemanalId = GSD.GastoSemanalId
-----------------------
UNION ALL
------------ PAGOS
SELECT (SUM(amortizacion) * -1 )Monto FROM Venta  where VentaState = 1   
  AND ProductId = 1001   
 AND IsReserva = 0
------------
UNION ALL
-------------------		FLETE	
SELECT (SUM(C.CostoFlete)*-1)Monto
FROM Compra C INNER JOIN CompraDetalle CD ON C.CompraId=CD.CompraId

------------------
UNION ALL
------------------ COMPRAS
SELECT (SUM(S.PrecioCompra)*-1) Monto FROM	dbo.Stock S
) AS T
--------
SELECT * 
FROM #TMPTABLE

DROP TABLE #TMPTABLE
