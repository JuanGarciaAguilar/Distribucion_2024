CREATE PROCEDURE [dbo].[distribucion_Venta_Update] 
@VentaId int,
@ClienteId int,
@CantidadVenta int,
@UnidaddeMedida  varchar(10),
@PrecioIngresadoVenta nvarchar(200),
@Amortizacion decimal(18,2),
@observacion varchar(100)
AS

declare @amortizacionLast as decimal = (select Amortizacion from Venta where VentaId=@VentaId)
declare @amortizacionactual as decimal=  @Amortizacion + @amortizacionLast
declare @stockactual as int = (select CantidadActualStock  from Stock where VentaId=@VentaId)
declare @cantidadVentaactual as int = (select CantidadVenta from Venta where VentaId=@VentaId)

UPDATE Venta

SET
    CantidadVenta = @CantidadVenta,
    PrecioIngresadoVenta = @PrecioIngresadoVenta,
	Amortizacion = @amortizacionactual,
	DeudaActualizada = @PrecioIngresadoVenta - @amortizacionactual,
	UnidadMedida=@UnidaddeMedida,
	Observacion = @observacion

WHERE VentaId = @VentaId


update Cliente
set
DeudaActualizada= @PrecioIngresadoVenta - @amortizacionactual
where ClienteId=@ClienteId

----- actualizando stock

update Stock
set
CantidadActualStock= @cantidadVentaactual + @stockactual
where VentaId=@VentaId

----- actualizando nuevo stock
declare @stockactualizado as int = (select CantidadActualStock  from Stock where VentaId=@VentaId)
update Stock
set
CantidadActualStock= @stockactualizado - @CantidadVenta
where VentaId=@VentaId