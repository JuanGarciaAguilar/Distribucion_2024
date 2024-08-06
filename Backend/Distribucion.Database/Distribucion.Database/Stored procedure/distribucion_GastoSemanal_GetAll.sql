CREATE PROCEDURE [dbo].[distribucion_GastoSemanal_GetAll]
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
ORDER BY 
        GastosSemanales.FechaInicio DESC