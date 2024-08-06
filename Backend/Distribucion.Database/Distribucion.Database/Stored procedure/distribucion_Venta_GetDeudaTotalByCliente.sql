CREATE PROCEDURE [dbo].[distribucion_Venta_GetDeudaTotalByCliente]
@ClientId INT
AS

DECLARE @DeudaTotal DECIMAL(18,3) = 0;
DECLARE @DeudaActualizada DECIMAL(18,3) = 0;
DECLARE @ProductId INT
DECLARE MY_CURSOR CURSOR
        LOCAL STATIC READ_ONLY FORWARD_ONLY
FOR
SELECT DISTINCT
        ProductId
FROM
        dbo.Venta
WHERE   ClienteId = @ClientId
		AND VentaState = 1
		AND IsReserva = 0
OPEN MY_CURSOR
FETCH NEXT FROM
        MY_CURSOR
INTO
        @ProductId
WHILE
        @@FETCH_STATUS = 0
BEGIN
        DECLARE @t TABLE (deuda DECIMAL(18,3))
        INSERT INTO @t EXEC distribucion_Venta_GetDeudaActualizada @ProductId, @ClientId
        SELECT @DeudaActualizada = deuda FROM @t
        SELECT @DeudaTotal = @DeudaTotal + @DeudaActualizada
        FETCH NEXT FROM
                MY_CURSOR
        INTO
                @ProductId
END
CLOSE MY_CURSOR
DEALLOCATE MY_CURSOR
GO

