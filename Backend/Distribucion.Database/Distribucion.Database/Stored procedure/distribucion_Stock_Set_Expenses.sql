CREATE PROCEDURE [dbo].[distribucion_Stock_Set_Expenses]

AS

DECLARE
@Date DATE = DATEADD(HOUR, -5, GETUTCDATE())
--@Date DATE = '2018-07-01'

-- SET DATE to DATETIME
DECLARE
@EndWeekDate DATETIME = @Date
-- SET EndWeekDate to 24:00:00.00 (next day)
SELECT @EndWeekDate = DATEADD(DAY, 1, @EndWeekDate)
-- SET EndWeekDate to 23:59:59.990 (real day)
SELECT @EndWeekDate = DATEADD(MILLISECOND, -10, @EndWeekDate)

DECLARE
@StartWeekDate DATETIME = DATEADD(DAY, -7, @EndWeekDate),
@TotalBills DECIMAL (18,3) = 0,
@TotalSells DECIMAL (18,3) = 0
-- SET StartWeekDate 23:59:59.990 to 00:00:00.000 (next day)
SELECT @StartWeekDate = DATEADD(MILLISECOND, 10, @StartWeekDate)

-- SET UTC Dates for Stock and Ventas tables which works with GETUTCDATE()
DECLARE
	@StartWeekDateUTC DATETIME = DATEADD(HOUR, 5, @StartWeekDate),
	@EndWeekDateUTC DATETIME = DATEADD(HOUR, 5, @EndWeekDate)

--Gastos Semanales dentro del rango semanal
IF EXISTS(SELECT [GastoTotal]
	FROM
		[dbo].[GastosSemanales]
	WHERE
		[FechaInicio] >= @StartWeekDate
		AND [FechaFinal] <= @EndWeekDate
	)
BEGIN
	SELECT
		@TotalBills = @TotalBills + SUM([GastoTotal])
	FROM
		[dbo].[GastosSemanales]
	WHERE
		[FechaInicio] >= @StartWeekDate
		AND [FechaFinal] <= @EndWeekDate
END

--Ventas Totales dentro del rango semanal
SELECT
	@TotalSells = SUM([PrecioRealVenta])
FROM
	[dbo].[Stock]
WHERE
	[FechaStock] >= @StartWeekDateUTC
	AND [FechaStock] <= @EndWeekDateUTC
	AND [VentaId] IS NOT NULL

--Actualización del GastoDiarioOperacion en la tabla Stock
UPDATE
	[dbo].[Stock]
SET
	[GastoDiarioOperacion] = [PrecioRealVenta] / @TotalSells * @TotalBills
WHERE
	[FechaStock] >= @StartWeekDateUTC
	AND [FechaStock] <= @EndWeekDateUTC
	AND [VentaId] IS NOT NULL

SELECT [StockId], [FechaStock], [Stock].[ProductId], [ProductName], [VentaId], [CantidadVenta], [PesoVenta], [PrecioRealVenta], [PrecioIngresadoVenta], [GastoDiarioOperacion]
FROM [dbo].[Stock] JOIN [dbo].[Producto] ON [Stock].[ProductId] = [Producto].[ProductId] WHERE [VentaId] IS NOT NULL ORDER BY [FechaStock] ASC