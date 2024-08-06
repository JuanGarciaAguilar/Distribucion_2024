CREATE PROCEDURE [dbo].[distribucion_Venta_Insert]
@ventadetalle ventaDetalleTipo READONLY,
@ClientId int
AS
DECLARE
    @VentaIdCursor INT,
	@FechaVentaCursor DATETIME = GETUTCDATE(),
	@ClienteIdCursor int,
	@ProductIdCursor int,
	@CantidadVentaCursor decimal(18,3),
	@PesoVentaCursor decimal(18,3),
	@PrecioRealVentaCursor decimal(18,3),
	@PrecioIngresadoVentaCursor decimal(18,3),
	@AmortizacionCursor decimal(18,3),
	@DeudaActualizadaCursor decimal(18,3),
	@UsuarioId nvarchar(100),
	@UnidadMedida nvarchar(10),
	@CantidadMinima decimal(18,3),
	@Observacion nvarchar(800)
DECLARE
    MY_CURSOR CURSOR
	LOCAL STATIC READ_ONLY FORWARD_ONLY
	
	FOR
	SELECT
		ClienteId ,
		ProductId ,
		CantidadVenta ,
		PesoVenta ,
		PrecioRealVenta ,
		PrecioIngresadoVenta ,
		Amortizacion ,
		DeudaActualizada,
		UsuarioId,
		UnidadMedida,
		CantidadMinima,
		Observacion
	FROM
	    @ventadetalle
	
	OPEN MY_CURSOR
	    FETCH NEXT FROM	MY_CURSOR
		INTO
		    @ClienteIdCursor,
		    @ProductIdCursor ,
		    @CantidadVentaCursor,
		    @PesoVentaCursor ,
		    @PrecioRealVentaCursor ,
		    @PrecioIngresadoVentaCursor ,
		    @AmortizacionCursor ,
		    @DeudaActualizadaCursor,
		    @UsuarioId,
			@UnidadMedida,
			@CantidadMinima,
			@Observacion
		WHILE @@FETCH_STATUS = 0
		BEGIN
		    INSERT INTO Venta(
		        FechaVenta,
		        ClienteId,
		        ProductId,
		        CantidadVenta,
		        PesoVenta,
		        PrecioRealVenta,
		        PrecioIngresadoVenta,
		        Amortizacion,
		        DeudaActualizada,
		        UsuarioId,
				UnidadMedida,
				CantidadMinima,
				Observacion)
			VALUES (
				@FechaVentaCursor,
			    @ClienteIdCursor,
				@ProductIdCursor,
				@CantidadVentaCursor,
				@PesoVentaCursor,
				@PrecioRealVentaCursor,
				@PrecioIngresadoVentaCursor,
				@AmortizacionCursor,
				@DeudaActualizadaCursor,
				@UsuarioId,
				@UnidadMedida,
				@CantidadMinima,
				@Observacion)
			SELECT
			    @VentaIdCursor = SCOPE_IDENTITY()
				
				EXEC distribucion_Stock_InsertVenta
				    @FechaVentaCursor,
					@VentaIdCursor,
					@ProductIdCursor,
					@CantidadMinima,
					@PesoVentaCursor,
					@PrecioRealVentaCursor,
					@PrecioIngresadoVentaCursor
				FETCH NEXT FROM MY_CURSOR
				
				INTO
				    @ClienteIdCursor,
					@ProductIdCursor ,
					@CantidadVentaCursor,
					@PesoVentaCursor ,
					@PrecioRealVentaCursor ,
					@PrecioIngresadoVentaCursor ,
					@AmortizacionCursor ,
					@DeudaActualizadaCursor,
					@UsuarioId,
			@UnidadMedida,
			@CantidadMinima
		END
	CLOSE MY_CURSOR
DEALLOCATE MY_CURSOR

	DECLARE @DeudaActual DECIMAL(18,3)

	SET @DeudaActual = (SELECT top 1(DeudaActualizada)
					 FROM Venta
					 WHERE ClienteId = @ClienteIdCursor
					 AND FechaVenta = @FechaVentaCursor
					 ORDER BY VentaId DESC)

					UPDATE Cliente SET DeudaActualizada = @DeudaActual
					WHERE ClienteId = @ClientId

EXEC distribucion_Venta_RefreshDeudas @ClientId