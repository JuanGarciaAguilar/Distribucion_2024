CREATE PROCEDURE [dbo].[distribucion_GastoSemanal_Update]
@GastoSemanalId INT,
@FechaInicio DATETIME,
@FechaFinal DATETIME,
@GastoTotal DECIMAL(18,3),
@GastoSemanalTabla GastoSemanalDetalleTipo READONLY
AS
UPDATE GastosSemanales
SET
    FechaInicio = @FechaInicio, 
    FechaFinal = @FechaFinal, 
    GastoTotal = @GastoTotal
WHERE GastoSemanalId = @GastoSemanalId

DELETE FROM GastoSemanalDetalle
WHERE GastoSemanalDetalle.GastoSemanalId = @GastoSemanalId

INSERT INTO GastoSemanalDetalle (
    GastoSemanalId, 
    Insumo, 
    Gasto,
	Comentario)
SELECT 
    @GastoSemanalId, 
    Insumo, 
    Gasto,
	Comentario 
FROM 
    @GastoSemanalTabla