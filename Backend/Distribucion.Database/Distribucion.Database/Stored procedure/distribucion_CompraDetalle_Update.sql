CREATE  PROCEDURE [dbo].[distribucion_CompraDetalle_Update]
@CompraId INT,
@CantidadCompra INT,
@UnidadMedida NVARCHAR(15),
@PrecioUnitario DECIMAL(18,2),
@PrecioCompra DECIMAL(18,2),
@TotalDeposito DECIMAL(18,2),
@SaldoDeposito DECIMAL(18,2),
@CostoFleteItemCompra DECIMAL(18,3),
@DocumentoCompra NVARCHAR(100)

AS

	UPDATE 
			CompraDetalle 
	SET 
			
			CantidadCompra = @CantidadCompra,
			--PesoCompra = CDT.PesoCompra,
			PrecioUnitario = @PrecioUnitario,
			PrecioCompra = @PrecioCompra,
			TotalDeposito = @TotalDeposito,
			SaldoDeposito = @SaldoDeposito,
			CostoFleteItemCompra = @CostoFleteItemCompra,
			CantidadBuenEstado = 0,
			CantidadMalEstado= 0,
			DocumentoCompra = @DocumentoCompra,
			UnidadMedida = @UnidadMedida,
			CantidadMinima = @CantidadCompra,
			CompraEstado = 2
   where 
			CompraId = @CompraId


			declare @totalcompra as decimal = (select sum(PrecioCompra) as PrecioCompra from CompraDetalle where CompraId = @CompraId)
			
	update 
			Compra
	set
			TotalCompra = @totalcompra,
			CostoFlete = @CantidadCompra * @CostoFleteItemCompra
			
	where
			CompraId = @CompraId