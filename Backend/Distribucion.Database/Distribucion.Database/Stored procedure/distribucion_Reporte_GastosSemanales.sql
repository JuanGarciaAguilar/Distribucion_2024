CREATE PROCEDURE [dbo].[distribucion_Reporte_GastosSemanales]
@Ini DATETIME,
@Fin DATETIME

AS
SELECT
	g.FechaInicio,
	g.FechaFinal,
	Diesel = SUM(g.Diesel),
	Ayudante = SUM(g.Ayudante),
	Casa = SUM(g.Casa),
	Otros = SUM(g.Otros),
	Sunat = SUM(g.Sunat)
FROM
(
SELECT
	gs.FechaInicio,
	gs.FechaFinal,
	Diesel = IIF(gd.Insumo = 'Diesel', SUM(Gasto), 0),
	Ayudante = IIF(CHARINDEX('Ayudante',gd.Insumo) > 0, SUM(Gasto), 0),
	Casa = IIF(gd.Insumo = 'Casa', SUM(Gasto), 0),
	Otros = IIF(gd.Insumo = 'Otros', SUM(Gasto), 0),
	Sunat = IIF(gd.Insumo = 'Sunat', SUM(Gasto), 0)
FROM
	GastoSemanalDetalle gd
JOIN
	GastosSemanales gs
ON
	gd.GastoSemanalId = gs.GastoSemanalId
WHERE
	gs.FechaInicio  >= @Ini AND
	gs.FechaFinal <= @Fin
GROUP BY
	gs.FechaInicio,
	gs.FechaFinal,
	gd.Insumo
) g
GROUP BY
	g.FechaInicio,
	g.FechaFinal
ORDER BY
	g.FechaInicio ASC