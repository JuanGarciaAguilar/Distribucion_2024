CREATE PROCEDURE [dbo].[distribucion_GastoSemanal_Insert]
@FechaInicio DATETIME,
@FechaFin DATETIME,
@GastoTotal DECIMAL(18,3),
@GastoSemanalTabla GastoSemanalDetalleTipo READONLY
AS
DECLARE
    @GastoDetalleID INT
INSERT INTO GastosSemanales (
    FechaInicio, 
    FechaFinal, 
    GastoTotal)
VALUES (
    @FechaInicio, 
    @FechaFin, 
    @GastoTotal
	)

SELECT 
    @GastoDetalleID = SCOPE_IDENTITY()
PRINT @GastoDetalleID
INSERT INTO GastoSemanalDetalle (
    GastoSemanalId, 
    Insumo, 
    Gasto,
	Comentario)
SELECT 
    @GastoDetalleID, 
    Insumo, 
    Gasto,
	Comentario
FROM 
    @GastoSemanalTabla