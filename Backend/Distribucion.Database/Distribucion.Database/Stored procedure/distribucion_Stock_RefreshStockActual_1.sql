CREATE PROCEDURE [dbo].[distribucion_Stock_RefreshStockActual]
@ProductId INT
AS

DECLARE @CantStockAux DECIMAL(18,3) = 0
DECLARE
    @StockIdC INT,
    @DetalleCompraIdC INT,
    @VentaIdC INT,
    @CantidadIngresadaC DECIMAL(18,3),
    @PesoCompraC DECIMAL(18,3),
    @CantidadVentaC DECIMAL(18,3),
    @PesoVentaC DECIMAL(18,3),
    @CantidadActualStockC DECIMAL(18,3)
DECLARE MY_CURSOR CURSOR
FOR
SELECT
    StockId,
    DetalleCompraId,
    CantidadIngresada,
    PesoCompra,
    VentaId,
    CantidadVenta,
    PesoVenta,
    CantidadActualStock
 FROM
    dbo.Stock WITH(NOLOCK)
WHERE
    ProductId = @ProductId
ORDER BY
    FechaStock ASC
OPEN MY_CURSOR
FETCH NEXT FROM
    MY_CURSOR
INTO
    @StockIdC,
    @DetalleCompraIdC,
    @CantidadIngresadaC,
    @PesoCompraC,
    @VentaIdC,
    @CantidadVentaC,
    @PesoVentaC,
    @CantidadActualStockC
WHILE
    @@FETCH_STATUS = 0
BEGIN
    IF @VentaIdC IS NULL
    BEGIN
        IF @CantidadIngresadaC <> 0
        BEGIN
        EXEC distribucion_Stock_UpdateStockById @StockIdC, @CantStockAux, @CantidadIngresadaC,0 
        END
        IF @PesoCompraC <> 0
        BEGIN
        EXEC distribucion_Stock_UpdateStockById @StockIdC, @CantStockAux, @PesoCompraC, 0
        END
    END
    IF @DetalleCompraIdC IS NULL
    BEGIN
        IF @CantidadVentaC <> 0
        BEGIN
        EXEC distribucion_Stock_UpdateStockById @StockIdC, @CantStockAux, @CantidadVentaC,1 
        END
        IF @PesoVentaC <>0
        BEGIN
        EXEC distribucion_Stock_UpdateStockById @StockIdC, @CantStockAux, @PesoVentaC, 1
        END
    END
    SELECT
        @CantStockAux = CantidadActualStock
    FROM
        Stock
    WHERE
        StockId = @StockIdC
    FETCH NEXT FROM
        MY_CURSOR
    INTO
        @StockIdC,
        @DetalleCompraIdC,
        @CantidadIngresadaC,
        @PesoCompraC,
        @VentaIdC,
        @CantidadVentaC,
        @PesoVentaC,
        @CantidadActualStockC
END
CLOSE MY_CURSOR
DEALLOCATE MY_CURSOR
