CREATE PROCEDURE [dbo].[distribucion_Reporte_GetAmortizacionDeuda]
AS
SELECT
		a.SectorName,
		a.Amortizacion,
		b.DeudaTotal AS DeudaActualizada
FROM

(
SELECT
	S.[SectorName],
	--ISNULL(SUM(PrecioIngresadoVenta),0) AS VentaTotal,
	ISNULL(SUM(v.Amortizacion),0) AS Amortizacion
FROM [dbo].[Venta] V WITH(NOLOCK)
JOIN [dbo].[Cliente] C ON V.[ClienteId] = C.[ClienteId]
JOIN [dbo].[Sector] S ON C.[SectorId] = S.[SectorId]

WHERE V.[VentaState] = 1 AND V.IsReserva = 0
GROUP BY S.[SectorName]
) a

JOIN

(
SELECT 
        s.SectorName as Sector,
        SUM(DeudaActualizada) as DeudaTotal
FROM
        Cliente c
JOIN
        Sector s
ON
        c.SectorId = s.SectorId
GROUP BY
        s.SectorName
) b

ON a.SectorName = b.Sector
