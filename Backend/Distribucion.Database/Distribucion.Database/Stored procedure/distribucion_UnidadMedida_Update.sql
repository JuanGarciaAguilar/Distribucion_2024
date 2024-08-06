CREATE PROCEDURE [dbo].[distribucion_UnidadMedida_Update]
@UnidadMedidaID int,
@UnidadMedida varchar(20),
@UnidadDestino varchar(20)

AS

	update UnidadMedida set UnidadMedidad = @UnidadMedida, UnidadDestino=@UnidadDestino
	where  UnidadMedidaID = @UnidadMedidaID
