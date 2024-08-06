CREATE  PROCEDURE [dbo].[distribucion_Compra_Update]
@CompraId INT,
@FechaCompra DATETIME,
@FechaEntrega DATETIME,
@OrigenCompra NVARCHAR(100),
@TotalCompra DECIMAL(18,3),
@CostoFlete DECIMAL(18,3),
@CompraDetalleTabla CompraDetalleTipo READONLY
AS
--Actualiza cabecera de Compra
UPDATE dbo.Compra
SET
    FechaCompra = @FechaCompra,
    FechaEntrega = @FechaEntrega,
    OrigenCompra = @OrigenCompra,
    TotalCompra = @TotalCompra,
    CostoFlete = @CostoFlete
WHERE CompraId = @CompraId


MERGE INTO dbo.CompraDetalle CD
USING @CompraDetalleTabla CDT
    ON CD.DetalleCompraId = CDT.DetalleCompraId and CD.CompraId= @CompraId
    WHEN MATCHED 
     THEN
       UPDATE SET 
			ProveedorId = CDT.ProveedorId, 
			ProductId = CDT.ProductId,
			CantidadCompra = CDT.CantidadCompra,
			PesoCompra = CDT.PesoCompra,
			PrecioUnitario = CDT.PrecioUnitario,
			PrecioCompra = CDT.PrecioCompra,
			TotalDeposito = CDT.TotalDeposito,
			SaldoDeposito = CDT.SaldoDeposito,
			CostoFleteItemCompra = CDT.CostoFleteItemCompra,
			CantidadBuenEstado = 0,
			CantidadMalEstado= 0,
			DocumentoCompra = CDT.DocumentoCompra,
			UnidadMedida = CDT.UnidadMedida,
			CantidadMinima = CDT.CantidadMinima,
			CompraEstado = 2
    WHEN NOT MATCHED THEN
	INSERT 
	VALUES (
			@CompraId, 
			CDT.ProveedorId,
			CDT.ProductId,
			CDT.CantidadCompra,
			CDT.PesoCompra,
			CDT.PrecioCompra,
			CDT.TotalDeposito,
			CDT.SaldoDeposito,
			CDT.CostoFleteItemCompra,
			0,
			0,
			CDT.DocumentoCompra,
			CDT.UnidadMedida,
			CDT.CantidadMinima,
			2,
			CDT.PrecioUnitario
	);
