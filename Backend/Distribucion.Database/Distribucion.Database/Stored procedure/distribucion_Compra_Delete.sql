CREATE PROCEDURE [dbo].[distribucion_Compra_Delete]
@CompraId INT
AS

--Eliminar compra de tabla Compra
UPDATE dbo.CompraDetalle
SET  CompraEstado = 0
Where CompraId= @CompraId