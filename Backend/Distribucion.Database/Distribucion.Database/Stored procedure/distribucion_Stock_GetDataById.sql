CREATE PROCEDURE [dbo].[distribucion_Stock_GetDataById]
@ProductId INT
AS
DECLARE @GastoVentaUnitario DECIMAL(18,3)
DECLARE @PorcentajeGanancia DECIMAL(18,3)
DECLARE @PrecioCompra DECIMAL(18,3)
DECLARE @PrecioVenta DECIMAL(18,3)
DECLARE @StockActual DECIMAL(18,3)

--Obtenemos el GastoVentaUnitario del producto
SELECT
        TOP 1
        @GastoVentaUnitario = ISNULL((GastoDiarioOperacion/(CantidadVenta)),0)
FROM
        dbo.Stock WITH(NOLOCK)
WHERE
        ProductId = @ProductId AND
        VentaId IS NOT NULL
ORDER BY
        FechaStock DESC
SELECT @GastoVentaUnitario = ISNULL(@GastoVentaUnitario,0)


--Obtenemos el procentaje de ganacia del producto
SELECT
        TOP 1
        @PorcentajeGanancia = PorcentajeGanancia
FROM
        dbo.Producto WITH(NOLOCK)
WHERE
        ProductId = @ProductId

--Obtenemos PrecioCompra (PrecioCompra = PrecioUnitario + FleteUnitario + GastoVentaUnitario
SELECT
        TOP 1
        --@PrecioCompra = ISNULL((CostoUnitarioTotalCompra/(1-@PorcentajeGanancia) + @GastoVentaUnitario),0)
		@PrecioCompra = ISNULL((PrecioTotalCompra/CantidadIngresada/(1-@PorcentajeGanancia) + @GastoVentaUnitario),0)
FROM
        dbo.Stock WITH(NOLOCK)
WHERE
        ProductId = @ProductId AND
        VentaId IS NULL
ORDER BY
        FechaStock DESC
SELECT @PrecioCompra = ISNULL(@PrecioCompra,0)


--Obtenemos PrecioVenta
SELECT
        TOP 1
        @PrecioVenta = 0--ISNULL(PrecioIngresadoVenta/CantidadVenta,0)
FROM
        dbo.Stock WITH(NOLOCK)
WHERE
        ProductId = @ProductId AND
        DetalleCompraId IS NULL
ORDER BY
        FechaStock DESC
SELECT @PrecioVenta = ISNULL(@PrecioVenta,0)


--Obtenemos el stock
SELECT
        TOP 1
        @StockActual = CantidadActualStock
FROM
        dbo.Stock WITH(NOLOCK)
WHERE
        ProductId = @ProductId
		AND FechaStock <= GETUTCDATE()
ORDER BY
        FechaStock DESC

--Enviamos datos
SELECT
        @StockActual AS Stock,
        CASE
            WHEN @PrecioCompra >= @PrecioVenta
            THEN @PrecioCompra 
            WHEN @PrecioCompra < @PrecioVenta
            THEN @PrecioVenta
        END AS Precio