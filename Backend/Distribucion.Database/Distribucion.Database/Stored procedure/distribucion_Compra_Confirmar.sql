CREATE PROCEDURE [dbo].[distribucion_Compra_Confirmar]
@CompraId INT,
@FechaCompra DATETIME,
@TotalCompra DECIMAL(18,3),
@CompraDetalleTabla CompraDetalleTipo READONLY
AS
DECLARE @FechaEntrega DATETIME

--modificar estado compradetalle, en tabla CompraDetalle.
UPDATE	dbo.CompraDetalle
SET
		CompraEstado = 1,
		CantidadCompra = CDT.CantidadCompra,
		PrecioCompra = CDT.PrecioCompra,
		SaldoDeposito = CDT.SaldoDeposito,
		CantidadMinima = CDT.CantidadMinima
FROM	dbo.CompraDetalle CD
INNER JOIN @CompraDetalleTabla CDT
ON		CD.DetalleCompraId = CDT.DetalleCompraId
WHERE	CDT.CompraEstado <> 2

--Actualiza cabecera de Compra
UPDATE dbo.Compra
SET
    FechaCompra = @FechaCompra,
    FechaEntrega = GETUTCDATE(),
	TotalCompra = (SELECT SUM(PrecioCompra)
					FROM CompraDetalle
					WHERE CompraId = @CompraId)
WHERE CompraId = @CompraId

SELECT @FechaEntrega = FechaEntrega FROM dbo.Compra WHERE CompraId= @CompraId

----Actualizacion de flete
--UPDATE dbo.CompraDetalle
--SET
--	CostoFleteItemCompra = C.CostoFlete / C.TotalCompra * PrecioCompra
--FROM dbo.CompraDetalle CD
--JOIN dbo.Compra C
--ON CD.CompraId = C.CompraId
--WHERE C.CompraId = @CompraId


--Insercion de nuevos detalles a tabla Stock
DECLARE 
    @DetalleCompraIdCursor INT,
    @ProductIdCursor INT,
    @CantidadMinimaCursor DECIMAL(18,3),
    @PesoCompraCursor DECIMAL(18,3),
    @PrecioCompraCursor DECIMAL(18,3),
    @CostoFleteItemCompraCursor DECIMAL(18,3),
	@DocumentoCompraCursor varchar(20)
DECLARE MY_CURSOR CURSOR
    LOCAL STATIC READ_ONLY FORWARD_ONLY

FOR
SELECT
    CD.DetalleCompraId,
    CD.ProductId,
    CD.CantidadMinima,
    CD.PesoCompra,
	CD.PrecioCompra,
    CD.CostoFleteItemCompra,
	CD.DocumentoCompra
FROM
    dbo.CompraDetalle CD
WHERE CD.DetalleCompraId NOT IN(SELECT DTC.DetalleCompraId FROM CompraDetalle DTC JOIN stock s ON s.detallecompraid= dtc.detallecompraid) AND CompraId = @CompraId AND CompraEstado= 1
OPEN MY_CURSOR
FETCH NEXT FROM 
    MY_CURSOR 
INTO
    @DetalleCompraIdCursor,
    @ProductIdCursor,
    @CantidadMinimaCursor,
    @PesoCompraCursor,
    @PrecioCompraCursor,
    @CostoFleteItemCompraCursor,
	@DocumentoCompraCursor 
WHILE
    @@FETCH_STATUS = 0
BEGIN
    EXEC distribucion_Stock_InsertCompra 
                @DetalleCompraIdCursor, 
                @ProductIdCursor, 
                @CantidadMinimaCursor, 
                @PesoCompraCursor, 
                @PrecioCompraCursor, 
                @CostoFleteItemCompraCursor,
				@DocumentoCompraCursor 
    FETCH NEXT FROM 
        MY_CURSOR 
    INTO
        @DetalleCompraIdCursor,
        @ProductIdCursor,
        @CantidadMinimaCursor,
        @PesoCompraCursor,
        @PrecioCompraCursor,
        @CostoFleteItemCompraCursor,
		@DocumentoCompraCursor 
END
CLOSE MY_CURSOR
DEALLOCATE MY_CURSOR
