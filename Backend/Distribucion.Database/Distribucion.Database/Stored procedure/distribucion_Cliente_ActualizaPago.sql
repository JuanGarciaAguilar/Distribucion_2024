CREATE PROCEDURE [dbo].[distribucion_Cliente_ActualizaPago]
@IDCliente INT,
@Monto DECIMAL(18,3)
AS
Declare  @IDNONP INT
 select @IDNONP = ProductId from Producto WHERE ProductName = 'NONProduct'
 DECLARE @DeudaActualizada DECIMAL(18,3)
 SET @DeudaActualizada = ( SELECT top 1(DeudaActualizada)
							 FROM Venta
							 WHERE ClienteId = @IDCliente
							 AND VentaState = 1 AND IsReserva = 0
							 ORDER BY VentaId desc
						  )
 INSERT INTO Venta (
 FechaVenta, 
 ClienteId,
 ProductId,
 Amortizacion,
 CantidadVenta,
 PrecioRealVenta,
 PrecioIngresadoVenta,
 DeudaActualizada,
 Observacion
 ) 
 values (GETUTCDATE(),@IDCliente,@IDNONP, @Monto,0,0,0,(@DeudaActualizada - @Monto),@Observacion)
 
	UPDATE Cliente SET DeudaActualizada = @DeudaActualizada-@Monto WHERE ClienteId = @IDCliente
	
EXEC distribucion_Venta_RefreshDeudas_Last10 @IDCliente