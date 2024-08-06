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
    @CantidadActualStockC DECIMAL(18,3),
	@CompraEstadoC INT,
	@VentaStateC INT
DECLARE MY_CURSOR CURSOR
FOR
SELECT
    S.StockId,
    S.DetalleCompraId,
    S.CantidadIngresada,
    S.PesoCompra,
    S.VentaId,
    S.CantidadVenta,
    S.PesoVenta,
    S.CantidadActualStock,
	CD.CompraEstado,
	V.VentaState
FROM
	[dbo].[Stock] S WITH (NOLOCK)
LEFT JOIN
	[dbo].[CompraDetalle] CD ON CD.DetalleCompraId = S.DetalleCompraId
LEFT JOIN
	[dbo].[Venta] V ON V.VentaId = S.VentaId
WHERE
    S.ProductId = @ProductId AND DATEDIFF(M, FechaStock, GETDATE()) <= 1
ORDER BY
    S.FechaStock ASC
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
    @CantidadActualStockC,
	@CompraEstadoC,
	@VentaStateC
WHILE
    @@FETCH_STATUS = 0
BEGIN
    IF @VentaIdC IS NULL AND @CompraEstadoC = 0
	BEGIN
		UPDATE [dbo].[Stock]
		SET CantidadActualStock = @CantStockAux
		WHERE StockId = @StockIdC
	END
	IF @VentaIdC IS NULL AND @CompraEstadoC = 1
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
	IF @DetalleCompraIdC IS NULL AND @VentaStateC = 0
	BEGIN
		UPDATE [dbo].[Stock]
		SET CantidadActualStock = @CantStockAux
		WHERE StockId = @StockIdC
	END
    IF @DetalleCompraIdC IS NULL AND @VentaStateC = 1
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
        @CantidadActualStockC,
		@CompraEstadoC,
		@VentaStateC
END
CLOSE MY_CURSOR
DEALLOCATE MY_CURSOR