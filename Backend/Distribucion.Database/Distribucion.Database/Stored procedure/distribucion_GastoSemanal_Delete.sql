CREATE PROCEDURE [dbo].[distribucion_GastoSemanal_Delete]
@GastoSemanalId INT
AS
--Se eliminan todos los gastos detalle
DELETE 
FROM GastoSemanalDetalle
WHERE GastoSemanalId = @GastoSemanalId
--Se elimina el gasto padre
DELETE 
FROM GastosSemanales
WHERE GastoSemanalId = @GastoSemanalId
