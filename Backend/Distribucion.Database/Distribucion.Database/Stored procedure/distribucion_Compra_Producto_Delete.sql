CREATE PROCEDURE [dbo].[distribucion_Compra_Producto_Delete]
@CompraDetalleId INT
AS

--Eliminar Producto de tabla CompraDetalle
UPDATE CompraDetalle
SET 
		CompraEstado = 0
WHERE
		DetalleCompraId = @CompraDetalleId


----Eliminar de tabla stocks, el detalle de la compra a modificar.
--DECLARE 
--        @DetalleCompraIdC INT
--DECLARE 
--        MY_CURSOR0 CURSOR
--        LOCAL STATIC READ_ONLY FORWARD_ONLY
--FOR
--SELECT
--        DetalleCompraId
--FROM
--        dbo.CompraDetalle
--WHERE
--        CompraId = @CompraId
--OPEN
--        MY_CURSOR0
--        FETCH NEXT FROM 
--        MY_CURSOR0
--INTO
--        @DetalleCompraIdC
--WHILE
--        @@FETCH_STATUS = 0
--BEGIN
--        DELETE FROM dbo.Stock
--        WHERE DetalleCompraId = @DetalleCompraIdC
--        FETCH NEXT FROM 
--            MY_CURSOR0 
--        INTO
--            @DetalleCompraIdC
--END
--CLOSE MY_CURSOR0
--DEALLOCATE MY_CURSOR0

----Actualizar stock de productos cuyo detalle sera eliminado (y cuyo registro de stock ya se eliminó)
--DECLARE 
--        @ProductIdC INT
--DECLARE 
--        MY_CURSOR1 CURSOR
--        LOCAL STATIC READ_ONLY FORWARD_ONLY
--FOR
--SELECT
--        ProductId
--FROM
--        dbo.CompraDetalle
--WHERE
--        CompraId = @CompraId
--OPEN
--        MY_CURSOR1
--        FETCH NEXT FROM 
--        MY_CURSOR1
--INTO
--        @DetalleCompraIdC
--WHILE
--        @@FETCH_STATUS = 0
--BEGIN
--        EXEC distribucion_Stock_RefreshStockActual @ProductIdC
--        FETCH NEXT FROM
--            MY_CURSOR1 
--        INTO
--            @ProductIdC
--END
--CLOSE MY_CURSOR1
--DEALLOCATE MY_CURSOR1

----Eliminar el detalle de la compra a modificar, en tabla CompraDetalle.
--DELETE FROM 
--        CompraDetalle
--WHERE 
--        CompraDetalle.CompraId = @CompraId