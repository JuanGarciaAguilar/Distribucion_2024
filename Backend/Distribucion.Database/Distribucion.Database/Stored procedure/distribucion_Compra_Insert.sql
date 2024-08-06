CREATE PROCEDURE [dbo].[distribucion_Compra_Insert]
@FechaCompra DATETIME,
@FechaEntrega DATETIME,
@OrigenCompra NVARCHAR(100),
@TotalCompra DECIMAL(18,3),
@CostoFlete DECIMAL(18,3),
@UsuarioID nvarchar(100),
@CompraDetalleTabla CompraDetalleTipo READONLY,
@Observacion nvarchar(100)
AS
DECLARE @CompraId INT
INSERT INTO Compra (
    FechaCompra, 
    FechaEntrega, 
    OrigenCompra,
    TotalCompra,
    CostoFlete,
	UsuarioId,
	Observacion)
VALUES (
    @FechaCompra,
    @FechaEntrega,
    @OrigenCompra,
    @TotalCompra,
    @CostoFlete,
	@UsuarioID,
	@Observacion)

SELECT @CompraId = SCOPE_IDENTITY()

INSERT INTO CompraDetalle(
    CompraId, 
    ProveedorId, 
    ProductId,
    CantidadCompra,
    PesoCompra,
	PrecioUnitario,
    PrecioCompra,
    TotalDeposito,
    SaldoDeposito,
    CostoFleteItemCompra,
    CantidadBuenEstado,
    CantidadMalEstado,
	DocumentoCompra,
	UnidadMedida,
	CantidadMinima,
	CompraEstado)
SELECT 
    @CompraId,
    ProveedorId,
    ProductId,
    CantidadCompra,
    PesoCompra,
	PrecioUnitario,
    PrecioCompra,
    TotalDeposito,
    SaldoDeposito,
    CostoFleteItemCompra,
    0,
    0,
	DocumentoCompra,
	UnidadMedida,
	CantidadMinima,
	CompraEstado
FROM 
    @CompraDetalleTabla