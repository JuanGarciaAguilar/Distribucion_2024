	CREATE PROCEDURE [dbo].[distribucion_Reporte_GananciaByProducto] 
	@FechaInicio DATETIME,
	@FechaFin DATETIME

	AS

	-- SET FechaFin to 24:00:00.00 (next day)
	SELECT @FechaFin = DATEADD(DAY, 1, @FechaFin)
	-- SET FechaFin to 23:59:59.990 (real day)
	SELECT @FechaFin = DATEADD(MILLISECOND, -10, @FechaFin)

	--Variables Generales
	DECLARE @TablaGananciaProducto [ReporteGananciaTipo]

	--Variables a Insertar
	DECLARE
			@ProductParentId INT,
			@ProductParentName VARCHAR(20),
			@ProductName VARCHAR(20),
			@CompraCantidad DECIMAL(18,3),
			@CompraPrecio DECIMAL(18,3),
			@CompraTotal DECIMAL(18,3),
			@VentaCantidad DECIMAL(18,3),
			@VentaPrecio DECIMAL(18,3),
			@VentaTotal DECIMAL(18,3),
			@GananciaParcial DECIMAL(18,3),
			@Flete DECIMAL(18,3),
			@GananciaTotal DECIMAL(18,3)

	DECLARE 
		@ProductId INT
	DECLARE MY_CURSOR CURSOR
		LOCAL STATIC READ_ONLY FORWARD_ONLY
  
	FOR
	SELECT DISTINCT
			ProductId
	FROM
			dbo.Producto
	WHERE
			ProductLevel = 1
	OPEN MY_CURSOR
	FETCH NEXT FROM 
		MY_CURSOR 
	INTO
		@ProductId
	WHILE
		@@FETCH_STATUS = 0
	BEGIN


	--Obtenemos datos del producto
	SELECT
			@ProductName = ProductName,
			@ProductParentId = ProductParentId
	FROM
			Producto WITH(NOLOCK)
	WHERE
			ProductId = @ProductId

	--Obtenemos nombre de Parent
	SELECT
			@ProductParentName = ProductName
	FROM
			Producto WITH(NOLOCK)
	WHERE
			ProductId = @ProductParentId

	--Obtenemos la data del stock hasta la fecha de inicio
	DECLARE @StockPrevio DECIMAL(18,3) = 
		(SELECT TOP 1 CantidadActualStock FROM Stock S WITH (NOLOCK)
		WHERE S.ProductId = @ProductId
		AND DATEADD(HOUR,-5,FechaStock) < @FechaInicio
		ORDER BY StockId DESC) / (SELECT TOP 1 CantidadObjetos FROM Equivalencia E WITH (NOLOCK) WHERE @ProductId = E.ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC)

	DECLARE @ComprasCursor DECIMAL(18,3),
			@PrecioCompraCursor DECIMAL(18,3),
			@CostoFleteItemCompraCursor DECIMAL(18,3),
			@ComprasPreviasAcumulada DECIMAL(18,3) = 0.00,
			@ComprasPreviasFaltante DECIMAL(18,3) = 0.00,
			@StockPrevioPrecio DECIMAL(18,3) = 0.00,
			@StockPrevioFlete DECIMAL(18,3) = 0.00
						
	DECLARE CURSOR_COMPRAS CURSOR
		LOCAL STATIC READ_ONLY FORWARD_ONLY
	FOR
		SELECT
			CantidadMinima / (SELECT TOP 1 CantidadObjetos FROM Equivalencia E WITH (NOLOCK) WHERE @ProductId = E.ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC),
			PrecioCompra,
			CostoFleteItemCompra
		FROM
			CompraDetalle WITH (NOLOCK)
			JOIN Compra ON CompraDetalle.CompraId = Compra.CompraId
		WHERE
			DATEADD(HOUR,-5,FechaEntrega) < @FechaInicio AND
			ProductId = @ProductId AND
			Compraestado = 1
		ORDER BY
			FechaEntrega DESC

	OPEN CURSOR_COMPRAS
		FETCH NEXT FROM 
			CURSOR_COMPRAS 
		INTO
			@ComprasCursor,
			@PrecioCompraCursor,
			@CostoFleteItemCompraCursor
		WHILE
			@ComprasPreviasAcumulada < @StockPrevio
			--@@FETCH_STATUS = 0
		BEGIN
			SELECT @ComprasPreviasFaltante = @StockPrevio - @ComprasPreviasAcumulada
			SELECT @ComprasPreviasAcumulada = @ComprasPreviasAcumulada + @ComprasCursor
			SELECT @StockPrevioPrecio = @StockPrevioPrecio + IIF(@StockPrevio > @ComprasPreviasAcumulada,
				(@PrecioCompraCursor),
				(@PrecioCompraCursor) / @ComprasCursor * @ComprasPreviasFaltante)
			SELECT @StockPrevioFlete = @StockPrevioFlete + IIF(@StockPrevio > @ComprasPreviasAcumulada,
				(@CostoFleteItemCompraCursor),
				(@CostoFleteItemCompraCursor) / @ComprasCursor * @ComprasPreviasFaltante)
		FETCH NEXT FROM 
			CURSOR_COMPRAS
		INTO
			@ComprasCursor,
			@PrecioCompraCursor,
			@CostoFleteItemCompraCursor
	END
	CLOSE CURSOR_COMPRAS
	DEALLOCATE CURSOR_COMPRAS

	--Obtenemos la data de compras
	SELECT
			@CompraCantidad = SUM(s.CantidadIngresada) / (SELECT TOP 1 CantidadObjetos FROM Equivalencia E WITH (NOLOCK) WHERE @ProductId = E.ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC),
			@CompraPrecio = AVG(s.CostoUnitarioCompra),
			@CompraTotal = SUM(s.PrecioCompra),
			@Flete = SUM(FleteUnidadCompra)
	FROM
			Stock s WITH(NOLOCK)
	JOIN
			Producto p
	ON
			s.ProductId = p.ProductId
	JOIN
			CompraDetalle cd
	ON
			s.DetalleCompraId = cd.DetalleCompraId
	WHERE
			s.ProductId = @ProductId AND
			s.DetalleCompraId IS NOT NULL AND
			cd.CompraEstado = 1 AND
			DATEADD(HOUR,-5,FechaStock) >= @FechaInicio AND
			DATEADD(HOUR,-5,FechaStock) <= @FechaFin

	--Acumulamos StockPrevio + data de Compras
	SELECT @CompraCantidad = ISNULL(@StockPrevio,0) + ISNULL(@CompraCantidad,0)
	--Se agrego la suma del flete en el monto de compra total (ADDED 2019-02-19 13:49)
	SELECT @CompraTotal = ISNULL(@StockPrevioPrecio,0) + ISNULL(@CompraTotal,0)
	SELECT @Flete = ISNULL(@StockPrevioFlete,0) + ISNULL(@Flete,0)
	--SELECT @CompraTotal = ISNULL(@StockPrevioPrecio,0) + ISNULL(@CompraTotal,0) + ISNULL(@StockPrevioFlete,0) + ISNULL(@Flete,0)
	--SELECT @Flete = 0
	SELECT @CompraPrecio = @CompraTotal / NULLIF(@CompraCantidad,0)

	--Obtenemos la data de ventas
	SELECT
			@VentaCantidad = SUM(s.CantidadVenta)  / (SELECT TOP 1 CantidadObjetos FROM Equivalencia E WITH (NOLOCK) WHERE @ProductId = E.ProductId AND Estado = 1 ORDER BY CantidadObjetos DESC),
			@VentaTotal = SUM(s.PrecioIngresadoVenta),
			@VentaPrecio = @VentaTotal/@VentaCantidad   
	FROM
			Stock s WITH(NOLOCK)
	JOIN
			Producto p
	ON
			s.ProductId = p.ProductId
	JOIN
			Venta v
	ON
			s.VentaId = v.VentaId
	WHERE
			s.ProductId = @ProductId AND
			s.VentaId IS NOT NULL AND
			v.VentaState = 1 AND V.IsReserva = 0
			AND DATEADD(HOUR,-5,FechaStock) >= @FechaInicio
			AND DATEADD(HOUR,-5,FechaStock) <= @FechaFin

	--CompraCantidad = VentaCantidad AND CompraTotal = VentaCantidad * CompraPrecio (ADDED 2019-02-19 13:44)
	SELECT
			@Flete = @Flete * @VentaCantidad / NULLIF(@CompraCantidad,0),
			@CompraCantidad = @VentaCantidad,
			@CompraPrecio = IIF(@VentaCantidad > 0, @CompraPrecio, 0),
			@CompraTotal = @VentaCantidad * @CompraPrecio

	--Calculamos Ganancias
	SELECT
			@GananciaParcial = @VentaTotal - @CompraTotal,
			@GananciaTotal = @GananciaParcial - @Flete

	INSERT INTO @TablaGananciaProducto (
			[ProductId],
			[ProductName],
			[ProductParentId],
			[ProductParentName],
			[CompraCantidad],
			[CompraPrecio],
			[CompraTotal],
			[VentaCantidad],
			[VentaPrecio],
			[VentaTotal],
			[GananciaParcial],
			[Flete],
			[GananciaTotal])
	VALUES (
			@ProductId,
			@ProductName,
			@ProductParentId,
			@ProductParentName,
			@CompraCantidad,
			@CompraPrecio,
			@CompraTotal,
			@VentaCantidad,
			@VentaPrecio,
			@VentaTotal,
			@GananciaParcial,
			@Flete,
			@GananciaTotal)

		FETCH NEXT FROM 
			MY_CURSOR 
		INTO
			@ProductId
	END
	CLOSE MY_CURSOR
	DEALLOCATE MY_CURSOR

	SELECT
		t.ProductId,
		p.RelevanceValue,
		t.ProductName,
		t.ProductParentId,
		t.ProductParentName,
		t.CompraCantidad,
		t.CompraPrecio,
		t.CompraTotal,
		t.VentaCantidad,
		t.VentaPrecio,
		t.VentaTotal,
		t.GananciaParcial,
		t.Flete,
		t.GananciaTotal
	FROM @TablaGananciaProducto t
	INNER JOIN ProductRelevance p
	ON t.ProductParentId = p.RelevanceProductId
	ORDER BY p.RelevanceValue
	GO