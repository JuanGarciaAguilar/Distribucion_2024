CREATE PROCEDURE [dbo].[distribucion_Venta_RefreshDeudas_Last10]
@ClienteId INT
AS

--CURSOR
DECLARE
@VentaId INT,
@PrecioIngresadoVenta DECIMAL(18,3),
@Amortizacion DECIMAL(18,3),
@DeudaActualizada DECIMAL(18,3),
@DeudaAnterior DECIMAL(18,3) = 0
DECLARE MY_CURSOR1 CURSOR

FOR
SELECT
VentaId,
PrecioIngresadoVenta,
Amortizacion,
DeudaActualizada
FROM (
SELECT
TOP 1000
VentaId,
FechaVenta,
PrecioIngresadoVenta,
Amortizacion,
DeudaActualizada
FROM
dbo.Venta
WHERE
ClienteId = @ClienteId
AND VentaState = 1
AND IsReserva = 0
ORDER BY
VentaId DESC
) a
ORDER BY
a.FechaVenta ASC
OPEN MY_CURSOR1
FETCH NEXT FROM
MY_CURSOR1
INTO
@VentaId,
@PrecioIngresadoVenta,
@Amortizacion,
@DeudaActualizada
WHILE
@@FETCH_STATUS = 0
BEGIN
--DO
--print 'Deuda anterior INICIAL == ' + cast(@DeudaAnterior as nvarchar)
-- Evalua si el pago es solo una amortizacion

UPDATE Venta
SET DeudaActualizada = @PrecioIngresadoVenta - @Amortizacion + @DeudaAnterior
WHERE VentaId = @VentaId





SELECT @DeudaAnterior = (SELECT DeudaActualizada FROM Venta WHERE VentaId = @VentaId)
--print 'Deuda anterior == ' + cast(@DeudaAnterior as nvarchar)
--!DO
FETCH NEXT FROM
MY_CURSOR1
INTO
@VentaId,
@PrecioIngresadoVenta,
@Amortizacion,
@DeudaActualizada
END
CLOSE MY_CURSOR1
DEALLOCATE MY_CURSOR1



--UPDATE Cliente
UPDATE Cliente
SET DeudaActualizada = @DeudaAnterior
WHERE ClienteId = @ClienteId