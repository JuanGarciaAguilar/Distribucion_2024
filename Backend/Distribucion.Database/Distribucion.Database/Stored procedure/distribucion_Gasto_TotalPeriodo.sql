CREATE PROCEDURE [dbo].[distribucion_Gasto_TotalPeriodo]
	@FechaInicio DATETIME,
	@FechaFin DATETIME
AS

-- SET FechaFin to 24:00:00.00 (next day)
SELECT @FechaFin = DATEADD(DAY, 1, @FechaFin)
-- SET FechaFin to 23:59:59.990 (real day)
SELECT @FechaFin = DATEADD(MILLISECOND, -10, @FechaFin)

-- Gasto dentro del periodo
DECLARE @GastoPeriodo DECIMAL(18,3)

SELECT
	@GastoPeriodo = SUM(Gasto)
FROM
	GastosSemanales G WITH(NOLOCK)
JOIN
	GastoSemanalDetalle GD ON GD.GastoSemanalId = G.GastoSemanalId
WHERE
	G.FechaInicio >= @FechaInicio AND
	G.FechaFinal <= @FechaFin

-- Gasto con Fecha Final > @ Fecha Inicio

DECLARE @BeforeValue DECIMAL(18,3)

SELECT
	@BeforeValue = SUM(Gasto) / (DATEDIFF(DAY,FechaInicio,FechaFinal) + 1) * (DATEDIFF(DAY,@FechaInicio,FechaFinal) + 1)
FROM
	GastosSemanales G WITH(NOLOCK)
JOIN
	GastoSemanalDetalle GD ON GD.GastoSemanalId = G.GastoSemanalId
WHERE
	G.FechaFinal >= @FechaInicio AND
	G.FechaInicio < @FechaInicio
GROUP BY FechaInicio, FechaFinal

-- Gasto con Fecha Inicio < @ Fecha Final

DECLARE @AfterValue DECIMAL(18,3)

SELECT
	@AfterValue = SUM(Gasto) / (DATEDIFF(DAY,FechaInicio,FechaFinal) + 1) * (DATEDIFF(DAY,FechaInicio,@FechaFin) + 1)
FROM
	GastosSemanales G WITH(NOLOCK)
JOIN
	GastoSemanalDetalle GD ON GD.GastoSemanalId = G.GastoSemanalId
WHERE
	G.FechaFinal > @FechaFin AND
	G.FechaInicio <= @FechaFin
GROUP BY FechaInicio, FechaFinal

SELECT @GastoPeriodo = ISNULL(@GastoPeriodo,0) + ISNULL(@BeforeValue,0) + ISNULL(@AfterValue,0)
SELECT @GastoPeriodo