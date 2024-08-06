CREATE PROCEDURE [dbo].[distribucion_GastoSemanal_GetUntilToday]
AS
SELECT  GastosSemanales.GastoSemanalId,
        FechaInicio,
        FechaFinal,
        GastoTotal,
        GastoSemanalDetalleId,
        Insumo,
        Gasto,
		Comentario
FROM [dbo].[GastosSemanales] WITH(NOLOCK)
LEFT JOIN 
        GastoSemanalDetalle 
ON 
        GastosSemanales.GastoSemanalId = GastoSemanalDetalle.GastoSemanalId
WHERE
        GastosSemanales.FechaInicio <= GETUTCDATE()
ORDER BY 
        GastosSemanales.FechaInicio DESC
GO
