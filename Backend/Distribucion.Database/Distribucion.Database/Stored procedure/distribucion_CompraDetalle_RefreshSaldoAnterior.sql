CREATE PROCEDURE [dbo].[distribucion_CompraDetalle_RefreshSaldoAnterior]
@ProductoId INT,
@ProveedorId INT
AS
DECLARE @SaldoAux DECIMAL(18,3) = 0
DECLARE
    @DetalleCompraId INT,
    @FechaCompra DATETIME,
    @PrecioCompra DECIMAL(18,3),
    @TotalDeposito DECIMAL(18,3),
    @SaldoDeposito DECIMAL(18,3)
DECLARE MY_CURSOR CURSOR
FOR
SELECT
        cd.DetalleCompraId,
        c.FechaCompra,
        cd.PrecioCompra,
        cd.TotalDeposito,
        cd.SaldoDeposito
FROM
        compradetalle cd WITH(NOLOCK)
JOIN
        Compra c
ON
        cd.CompraId = c.CompraId
WHERE
        ProductId = @ProductoId AND
        ProveedorId= @ProveedorId
ORDER BY
        FechaCompra ASC
OPEN MY_CURSOR
FETCH NEXT FROM
    MY_CURSOR
INTO
        @DetalleCompraId,
        @FechaCompra,
        @PrecioCompra,
        @TotalDeposito,
        @SaldoDeposito
WHILE
    @@FETCH_STATUS = 0
BEGIN 
        IF (@TotalDeposito - @PrecioCompra + @SaldoAux) = @SaldoDeposito
        BEGIN
            SELECT @SaldoAux = @SaldoDeposito
        END
        ELSE
        BEGIN
            SELECT @SaldoAux = @TotalDeposito - @PrecioCompra + @SaldoAux
            UPDATE CompraDetalle
            SET
                    SaldoDeposito = @SaldoAux
            WHERE
                    DetalleCompraId = @DetalleCompraId
        END
        FETCH NEXT FROM
            MY_CURSOR
        INTO
            @DetalleCompraId,
            @FechaCompra,
            @PrecioCompra,
            @TotalDeposito,
            @SaldoDeposito
END
CLOSE MY_CURSOR
DEALLOCATE MY_CURSOR
