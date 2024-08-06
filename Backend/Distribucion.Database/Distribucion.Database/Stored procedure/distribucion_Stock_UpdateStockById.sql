CREATE PROCEDURE [dbo].[distribucion_Stock_UpdateStockById]
@StockId INT,
@StockAnteriorValue DECIMAL(18,3),
@StockActualAdquirido DECIMAL(18,3),
@Decision INT

AS

UPDATE Stock
SET CantidadActualStock = @StockAnteriorValue + 
    CASE
        WHEN @Decision = 0
        THEN @StockActualAdquirido
        WHEN @Decision = 1
        THEN @StockActualAdquirido * -1
    END
WHERE StockId = @StockId