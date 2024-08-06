CREATE PROCEDURE [dbo].[distribucion_CompraDetalle_Insert]
@CompraId INT,
@ProveedorId INT,
@ProductId INT,
@CantidadCompra INT,
@PrecioCompra DECIMAL(18,2),
@TotalDeposito DECIMAL(18,2),
@SaldoDeposito DECIMAL(18,2),
@CostoFleteItemCompra DECIMAL(18,3),
@DocumentoCompra NVARCHAR(100),
@UnidadMedida NVARCHAR(15),
@PrecioUnitario DECIMAL(18,2)

AS
INSERT INTO CompraDetalle(
    CompraId, 
    ProveedorId, 
    ProductId,
    CantidadCompra,
    PrecioCompra,
	TotalDeposito,
	SaldoDeposito,
	CostoFleteItemCompra,
	DocumentoCompra	,
	UnidadMedida,
	PrecioUnitario
	)
VALUES (
    @CompraId,
    @ProveedorId,
    @ProductId,
    @CantidadCompra,
    @PrecioCompra,
	@TotalDeposito,
	@SaldoDeposito,
	@CostoFleteItemCompra,
	@DocumentoCompra,
	@UnidadMedida,
	@PrecioUnitario)
