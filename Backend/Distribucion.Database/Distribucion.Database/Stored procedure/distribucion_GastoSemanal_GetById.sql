CREATE PROCEDURE [dbo].[distribucion_GastoSemanal_GetById]
@GastoSemanalId INT
AS
SELECT  
    GastosSemanales.GastoSemanalId,
    FechaInicio,
    FechaFinal,
    GastoTotal,
    GastoSemanalDetalleId,
    Insumo,
    Gasto
FROM [dbo].[GastosSemanales] WITH(NOLOCK)
    INNER JOIN GastoSemanalDetalle ON GastosSemanales.GastoSemanalId = GastoSemanalDetalle.GastoSemanalId
WHERE GastosSemanales.GastoSemanalId = @GastoSemanalId
