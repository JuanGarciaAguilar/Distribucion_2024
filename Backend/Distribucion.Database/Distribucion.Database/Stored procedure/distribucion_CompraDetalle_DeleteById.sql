CREATE PROCEDURE [dbo].[distribucion_CompraDetalle_DeleteById]
@DetalleCompraId INT
AS

DECLARE @ProductId INT

SELECT
        @ProductId = ProductId
FROM
        dbo.CompraDetalle
WHERE
        DetalleCompraId = @DetalleCompraId

DELETE FROM
        CompraDetalle
WHERE
        DetalleCompraId = @DetalleCompraId

EXEC distribucion_Stock_RefreshStockActual @ProductId
