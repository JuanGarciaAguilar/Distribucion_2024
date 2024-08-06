CREATE PROCEDURE [dbo].[distribucion_Stock_InsertCompra]
@DetalleCompraId INT, --DetalleCompraId
@ProductId INT, --ProductId
@CantidadIngresada DECIMAL(18,3), --CantidadCompra
@PesoCompra DECIMAL(18,3), --PesoCompra
@PrecioCompra DECIMAL(18,3), --PrecioCompra
@FleteUnidadCompra DECIMAL(18,3), --CostoFleteItemCompra
@DocumentoCompra NVARCHAR(20)               
AS

DECLARE @CantidadIngresadaUltima DECIMAL(18,3) = 0
DECLARE @PesoCompraUltima DECIMAL(18,3) = 0
DECLARE @CantidadActualStockUltima DECIMAL(18,3) = 0

SELECT
        TOP 1
        @CantidadIngresadaUltima = ISNULL(CantidadIngresada,0),
        @PesoCompraUltima = ISNULL(PesoCompra,0),
        @CantidadActualStockUltima = ISNULL(CantidadActualStock,0)
FROM
        dbo.Stock
WHERE
        ProductId = @ProductId
ORDER BY
         StockId DESC
		      
INSERT INTO Stock (
		DocumentoCompra,
        FechaStock,
        DetalleCompraId,
        ProductId,
        CantidadIngresada,
        PesoCompra,
        PrecioCompra,
        CostoUnitarioCompra,
        FleteUnidadCompra,
        --CostoUnitarioTotalCompra,
        PrecioTotalCompra,
        CantidadActualStock
		)
VALUES(
		@DocumentoCompra,
        GETUTCDATE(),
        @DetalleCompraId,
        @ProductId,
        @CantidadIngresada,
        @PesoCompra,
        @PrecioCompra,
        CASE
            WHEN
                @CantidadActualStockUltima = 0 AND
                @PesoCompraUltima = 0
			  THEN
              CASE
                    WHEN @CantidadIngresada = 0
                   THEN @PrecioCompra/@PesoCompra
                    ELSE @PrecioCompra/@CantidadIngresada
                END
             ELSE
                CASE
                    WHEN @CantidadIngresadaUltima <> 0 
                    THEN @PrecioCompra/@CantidadIngresada
                    WHEN @PesoCompraUltima <> 0
                   THEN @PrecioCompra/@PesoCompra
                END
        END,
        @FleteUnidadCompra,
        --CASE	
        --    WHEN
        --        @CantidadActualStockUltima = 0 AND
        --        @PesoCompraUltima = 0
        --    THEN
        --        CASE
        --            WHEN @CantidadIngresada = 0
        --           THEN @PrecioCompra/@PesoCompra + @FleteUnidadCompra/@PesoCompra
        --            ELSE @PrecioCompra/@CantidadIngresada + @FleteUnidadCompra/@CantidadIngresada
        --        END
        --     ELSE
        --        CASE
        --            WHEN @CantidadIngresadaUltima <> 0 
        --            THEN @PrecioCompra/@CantidadIngresada
        --            ELSE @PrecioCompra/@PesoCompra
        --        END + 
        --       CASE
        --            WHEN @CantidadIngresadaUltima <> 0 
        --           THEN @FleteUnidadCompra/@CantidadIngresada
        --           ELSE @FleteUnidadCompra/@PesoCompra
        --        END
        --END,
        (@PrecioCompra + @FleteUnidadCompra),
        (@CantidadActualStockUltima + @CantidadIngresada)
    )
