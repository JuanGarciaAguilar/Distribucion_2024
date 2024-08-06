CREATE PROCEDURE [dbo].[distribucion_Venta_Reserva]
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
	@CantidadMinima decimal(18,3)

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
		CantidadMinima
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
			@CantidadMinima
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
				IsReserva)
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
				1)
			SELECT
			    @VentaIdCursor = SCOPE_IDENTITY()
				
				
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

