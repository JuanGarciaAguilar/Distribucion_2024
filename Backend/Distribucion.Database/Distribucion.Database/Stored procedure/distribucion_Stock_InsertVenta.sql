CREATE PROCEDURE [dbo].[distribucion_Stock_InsertVenta]
@FechaStock DATETIME, --FechaVenta
@VentaId INT, --VentaId
@ProductId INT, --ProductId
@CantidadVenta DECIMAL(18,3), --CantidadVenta
@PesoVenta DECIMAL(18,3), --PesoVenta
@PrecioRealVenta DECIMAL(18,3), --PrecioRealVenta
@PrecioIngresadoVenta DECIMAL (18,3) --PrecioIngresadoVenta

AS
DECLARE  @CantidadVentaUltima DECIMAL(18,3) = 0
DECLARE @PesoVentaUltima DECIMAL(18,3) = 0
DECLARE @CantidadActualStockUltima DECIMAL(18,3) = 0

SELECT
        TOP 1
        @CantidadVentaUltima = ISNULL(CantidadVenta,0),
        @PesoVentaUltima = ISNULL(PesoVenta,0),
        @CantidadActualStockUltima = ISNULL(CantidadActualStock,0)
FROM
        dbo.Stock 
WHERE
        ProductId = @ProductId
ORDER BY
        StockId DESC

INSERT INTO Stock (
        FechaStock,
        ProductId,
        VentaId,    
        CantidadVenta,
        PesoVenta,
        PrecioRealVenta,
        PrecioIngresadoVenta,
        CantidadActualStock)
VALUES(
        @FechaStock,
        @ProductId,
        @VentaId,
        @CantidadVenta,
        @PesoVenta,
        @PrecioRealVenta,
        @PrecioIngresadoVenta,
        --CantidadActualStock
        @CantidadActualStockUltima -
		@CantidadVenta
        --CASE
        --    WHEN @CantidadVenta <> 0 
        --    THEN @CantidadVenta
        --    ELSE @PesoVenta
        --END
    )
