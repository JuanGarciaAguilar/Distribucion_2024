CREATE PROCEDURE [dbo].[distribucion_GastoSemanalDetalle_GetByGastoId]
@GastoSemanalId INT
AS
SELECT  
    GastoSemanalDetalleId,
    GastoSemanalId,
    Insumo,
    Gasto
FROM [dbo].[GastoSemanalDetalle] WITH(NOLOCK)
WHERE [GastoSemanalId] = @GastoSemanalId
