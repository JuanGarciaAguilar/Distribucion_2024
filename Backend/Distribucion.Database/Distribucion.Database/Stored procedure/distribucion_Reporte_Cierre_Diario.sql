CREATE PROCEDURE [dbo].[distribucion_Reporte_Cierre_Diario]
@FechaInicio DATETIME,
@SectorId INT
AS

DECLARE @FechaFin DATETIME
-- SET FechaFin to 24:00:00.00 (next day)
SELECT @FechaFin = DATEADD(DAY, 1, @FechaInicio)
-- SET FechaFin to 23:59:59.990 (real day)
SELECT @FechaFin = DATEADD(MILLISECOND, -10, @FechaFin)

SELECT
	DA.ClienteId,
	DA.ClienteName,
	DA.ProductParentName,
	DA.UnidadMedida,
	ISNULL(SUM(DA.Valor),0) AS Valor,
	ISNULL(SUM(DA.DeudaActualizada),0) AS DeudaActualizada,
	ISNULL(SUM(DA.Total),0) AS Total,
	ISNULL(SUM(DA.Amortizacion),0) AS Amortizacion,
	Saldo = ISNULL(SUM(DA.DeudaActualizada),0) + ISNULL(SUM(DA.Total),0) - ISNULL(SUM(DA.Amortizacion),0)
FROM
	(
--Se obtiene las Unidades Vendidas
SELECT
	DATEADD(HOUR,-5,V.FechaVenta) [FechaVenta],
	C.ClienteId,
	C.ClienteName,
	PP.ProductId [ProductParentId], 
	P.ProductName [ProductParentName],
	V.ProductId,
	P.ProductName,
	S.SectorName,
	'Unidades' AS UnidadMedida,
	Valor = V.[CantidadMinima] / (SELECT TOP 1 CantidadObjetos FROM Equivalencia WITH (NOLOCK) WHERE V.ProductId = ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC),
	NULL AS Amortizacion,--V.[Amortizacion],
	NULL AS DeudaActualizada,--V.[DeudaActualizada]
	NULL AS Total--V.[PrecioIngresadoVenta]
FROM
	[dbo].[Venta] V WITH (NOLOCK)
JOIN
	[dbo].[Producto] P ON P.[ProductId] = V.[ProductId]
JOIN
	[dbo].[Producto] PP ON P.[ProductParentId] = PP.[ProductId]
JOIN
	[dbo].[Cliente] C ON C.[ClienteId] = V.[ClienteId]
JOIN
	[dbo].[Sector] S ON S.[SectorId] = C.[SectorId]
WHERE
	DATEADD(HOUR,-5,V.[FechaVenta]) >= @FechaInicio
	AND DATEADD(HOUR,-5,V.[FechaVenta]) <= @FechaFin
	AND S.[SectorId] = @SectorId
	AND V.VentaState = 1
	AND V.IsReserva = 0

UNION ALL
--Se obtiene el valor de la venta y su amortizacion
SELECT
	DATEADD(HOUR,-5,V.FechaVenta) [FechaVenta],
	C.ClienteId,
	C.ClienteName,
	PP.ProductId [ProductParentId], 
	P.ProductName [ProductParentName],
	V.ProductId,
	P.ProductName,
	S.SectorName,
	'Soles' AS UnidadMedida,
	V.[PrecioIngresadoVenta] AS Valor,
	V.[Amortizacion],
	NULL,
	NULL
FROM
	[dbo].[Venta] V WITH (NOLOCK)
JOIN
	[dbo].[Producto] P ON P.[ProductId] = V.[ProductId]
JOIN
	[dbo].[Producto] PP ON P.[ProductParentId] = PP.[ProductId]
JOIN
	[dbo].[Cliente] C ON C.[ClienteId] = V.[ClienteId]
JOIN
	[dbo].[Sector] S ON S.[SectorId] = C.[SectorId]
WHERE
	DATEADD(HOUR,-5,V.[FechaVenta]) >= @FechaInicio
	AND DATEADD(HOUR,-5,V.[FechaVenta]) <= @FechaFin
	AND S.[SectorId] = @SectorId
	AND V.VentaState = 1
	AND V.IsReserva = 0

UNION ALL
--Se obtiene los pagos de deuda
SELECT
	DATEADD(HOUR,-5,V.FechaVenta) [FechaVenta],
	C.ClienteId,
	C.ClienteName,
	NULL,--PP.ProductId [ProductParentId], 
	NULL,--'Pago Deuda',--PP.ProductName [ProductParentName],
	NULL,--V.ProductId,
	NULL,--'Pago Deuda',--P.ProductName,
	S.SectorName,
	NULL,
	NULL,
	V.[Amortizacion],
	NULL,
	NULL
FROM
	[dbo].[Venta] V WITH (NOLOCK)
JOIN
	[dbo].[Producto] P ON P.[ProductId] = V.[ProductId]
JOIN
	[dbo].[Cliente] C ON C.[ClienteId] = V.[ClienteId]
JOIN
	[dbo].[Sector] S ON S.[SectorId] = C.[SectorId]
WHERE
	DATEADD(HOUR,-5,V.[FechaVenta]) >= @FechaInicio
	AND DATEADD(HOUR,-5,V.[FechaVenta]) <= @FechaFin
	--AND P.ProductName = 'NONProduct'
	AND S.[SectorId] = @SectorId
	AND V.VentaState = 1
	AND V.IsReserva = 0

UNION ALL
--Se obtiene la deudaActualizada de la fecha
SELECT DISTINCT
	@FechaInicio [FechaVenta],
	C.ClienteId,
	C.ClienteName,
	NULL,--PP.ProductId [ProductParentId], 
	NULL,--'Saldo Anterior',--PP.ProductName [ProductParentName],
	NULL,--V.ProductId,
	NULL,--'Saldo Anterior',--P.ProductName,
	S.SectorName,
	NULL,
	NULL,
	NULL,
	DeudaActualizada = ISNULL(( 
		SELECT TOP 1
			DeudaActualizada
		FROM Venta V WITH (NOLOCK)
		WHERE C.ClienteId = V.ClienteId
		AND DATEADD(MILLISECOND, -10, DATEADD(HOUR,-5,V.FechaVenta)) <= @FechaInicio
		AND V.VentaState = 1 AND V.IsReserva = 0
		ORDER BY V.VentaId DESC
		), 0),
	NULL
FROM
	[dbo].[Cliente] C WITH (NOLOCK)
JOIN
	[dbo].[Sector] S ON S.[SectorId] = C.[SectorId]
WHERE
	C.SectorId = @SectorId
	
UNION ALL
--Se obtiene el Total de Ingresos de la fecha
SELECT
	NULL,--@FechaInicio [FechaVenta],
	C.ClienteId,
	C.ClienteName,
	NULL,--PP.ProductId [ProductParentId], 
	NULL,--'Total Ingreso',--PP.ProductName [ProductParentName],
	NULL,--V.ProductId,
	NULL,--'Pago Deuda',--P.ProductName,
	S.SectorName,
	NULL,
	NULL,
	NULL,
	NULL,
	Total = (
		ISNULL((
		SELECT
			SUM(PrecioIngresadoVenta)
		FROM
			[dbo].[Venta] V WITH (NOLOCK)
		WHERE C.ClienteId = V.ClienteId
			AND DATEADD(HOUR,-5,V.[FechaVenta]) >= @FechaInicio
			AND DATEADD(HOUR,-5,V.[FechaVenta]) <= @FechaFin
			AND V.VentaState = 1 AND V.IsReserva = 0
			),0) 
		--	+
		--ISNULL(( 
		--SELECT TOP 1
		--	DeudaActualizada
		--FROM Venta V WITH (NOLOCK)
		--WHERE C.ClienteId = V.ClienteId
		--AND DATEADD(MILLISECOND, -10, DATEADD(HOUR,-5,V.FechaVenta)) <= @FechaInicio
		--AND V.VentaState = 1
		--ORDER BY V.VentaId DESC
		--), 0)
		)
FROM
	[dbo].[Cliente] C WITH (NOLOCK)
JOIN
	[dbo].[Sector] S ON S.[SectorId] = C.[SectorId]
WHERE
	S.[SectorId] = @SectorId
	) DA

WHERE
	ClienteName IS NOT NULL
GROUP BY DA.ClienteId, DA.ClienteName, DA.ProductParentName, DA.UnidadMedida
ORDER BY DA.ClienteName
