CREATE PROCEDURE [dbo].[distribucion_Fix_Manual_CantidadCompra_DetalleCompraId]
	@DetalleCompraId INT,
	@NuevaCantidad DECIMAL(18,3),
	@NuevaCantidadMinima DECIMAL(18,3)
AS

DECLARE @CompraId INT, @ProveedorId INT
SELECT @CompraId = CompraId, @ProveedorId = ProveedorId
FROM CompraDetalle
WHERE DetalleCompraId = @DetalleCompraId

DECLARE @SaldoDepositoAnterior DECIMAL(18,3), @SaldoDepositoDiferencia DECIMAL(18,3)
SELECT @SaldoDepositoAnterior = SaldoDeposito - (TotalDeposito - PrecioCompra),
@SaldoDepositoDiferencia = TotalDeposito - PrecioCompra
FROM CompraDetalle
WHERE DetalleCompraId = @DetalleCompraId

DECLARE @StockId INT, @ProductId INT, @CantidadDiferencia DECIMAL(18,3)
SELECT @StockId = StockId, @ProductId = ProductId, @CantidadDiferencia = @NuevaCantidadMinima - CantidadIngresada
FROM Stock
WHERE DetalleCompraId = @DetalleCompraId

UPDATE CompraDetalle
SET CantidadCompra = @NuevaCantidad,
PrecioCompra = PrecioCompra * @NuevaCantidad / CantidadCompra,
TotalDeposito = TotalDeposito * @NuevaCantidad / CantidadCompra,
CostoFleteItemCompra = CostoFleteItemCompra * @NuevaCantidad / CantidadCompra,
CantidadMinima = CantidadMinima * @NuevaCantidad / CantidadCompra
WHERE DetalleCompraId = @DetalleCompraId

UPDATE CompraDetalle
SET SaldoDeposito = SaldoDeposito + @SaldoDepositoDiferencia
WHERE DetalleCompraId >= @DetalleCompraId AND ProductId = @ProductId AND ProveedorId = @ProveedorId

UPDATE Compra
SET TotalCompra = (SELECT SUM(PrecioCompra) FROM CompraDetalle WHERE CompraId = @CompraId),
CostoFlete = (SELECT SUM(CostoFleteItemCompra) FROM CompraDetalle WHERE CompraId = @CompraId)
WHERE CompraId = @CompraId

UPDATE Stock
SET CantidadIngresada = CantidadIngresada * @NuevaCantidadMinima / CantidadIngresada,
PrecioCompra = PrecioCompra * @NuevaCantidadMinima / CantidadIngresada,
FleteUnidadCompra = FleteUnidadCompra * @NuevaCantidadMinima / CantidadIngresada,
PrecioTotalCompra = PrecioTotalCompra * @NuevaCantidadMinima / CantidadIngresada
WHERE DetalleCompraId = @DetalleCompraId

UPDATE Stock
SET CantidadActualStock = CantidadActualStock + @CantidadDiferencia
WHERE ProductId = @ProductId AND StockId >= @StockId