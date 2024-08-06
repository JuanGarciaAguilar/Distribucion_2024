CREATE PROCEDURE [dbo].[distribucion_Venta_RefreshDeudas]
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
        LOCAL STATIC READ_ONLY FORWARD_ONLY
FOR
SELECT
		VentaId,
		PrecioIngresadoVenta,
		Amortizacion,
		DeudaActualizada
FROM
        dbo.Venta
WHERE
		ClienteId  = @ClienteId
		AND VentaState = 1
		AND IsReserva = 0
ORDER BY
		FechaVenta ASC
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
		UPDATE Venta
		SET DeudaActualizada = @PrecioIngresadoVenta - @Amortizacion + @DeudaAnterior
		WHERE VentaId = @VentaId

		SELECT @DeudaAnterior = (SELECT DeudaActualizada FROM Venta WHERE VentaId = @VentaId)
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