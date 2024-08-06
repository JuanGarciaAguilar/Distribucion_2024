CREATE PROCEDURE [dbo].[distribucion_Venta_EliminacionVenta]
@VentaId INT
AS

DECLARE @StockId INT
SET @StockId = (SELECT StockId
							FROM Stock
							WHERE VentaId = @VentaId)

DECLARE @PrecioIngresadoVenta DECIMAL(18,3)
SET @PrecioIngresadoVenta = (SELECT PrecioIngresadoVenta
							FROM Venta
							WHERE VentaId = @VentaId)

DECLARE @PrecioReal DECIMAL(18,3)
SET @PrecioReal = (SELECT PrecioRealVenta
							FROM Venta
							WHERE VentaId = @VentaId)

DECLARE @Amortizacion DECIMAL(18,3)
SET @Amortizacion = (SELECT Amortizacion
							FROM Venta
							WHERE VentaId = @VentaId)

DECLARE @Product INT
SET @Product = (SELECT ProductId
				FROM Venta
				WHERE VentaId = @VentaId)

DECLARE @Cantidad DECIMAL(18,3)
SET @Cantidad = (SELECT CantidadMinima
				FROM Venta
				WHERE VentaId = @VentaId)

DECLARE @Cliente INT
SET @Cliente = (SELECT ClienteId
				FROM Venta
				WHERE VentaId = @VentaId)

DECLARE @UltimoStockProducto INT
SET @UltimoStockProducto = (SELECT TOP 1(StockId) 
							FROM Stock 
							WHERE ProductId = @Product
							ORDER BY StockId DESC)

DECLARE @CantidadActualStock INT
SET @CantidadActualStock =(SELECT TOP 1(CantidadActualStock) 
							FROM Stock 
							WHERE ProductId = @Product
							ORDER BY StockId DESC)

UPDATE Stock 
SET 
	CantidadActualStock = CantidadActualStock + @Cantidad
WHERE StockId >= @StockId AND ProductId = @Product

UPDATE Cliente
SET
DeudaActualizada = DeudaActualizada - @PrecioIngresadoVenta + @Amortizacion
WHERE ClienteId = @Cliente

Declare @UltimaVenta INT
SET @UltimaVenta = (SELECT TOP 1(VentaId) 
					FROM Venta 
					WHERE ClienteId = @Cliente 
					ORDER BY VentaId DESC)

UPDATE Venta
SET
	DeudaActualizada = DeudaActualizada - @PrecioIngresadoVenta + @Amortizacion
WHERE 
VentaId > @VentaId AND ClienteId = @Cliente

UPDATE Venta
SET VentaState = 0
WHERE VentaId = @VentaId

EXEC distribucion_Venta_RefreshDeudas @Cliente



