CREATE PROCEDURE [dbo].[distribucion_CompraDetalle_GetSaldoAnterior]
@ProductId INT,
@ProveedorId INT

AS
EXEC distribucion_CompraDetalle_RefreshSaldoAnterior @ProductId, @ProveedorId
SELECT
        TOP 1 
        SaldoDeposito 
FROM
        CompraDetalle
LEFT JOIN
        Compra
ON
    Compra.CompraId = CompraDetalle.CompraId
WHERE
        ProductId = @ProductId AND
        ProveedorId = @ProveedorId
ORDER BY
        FechaCompra DESC
