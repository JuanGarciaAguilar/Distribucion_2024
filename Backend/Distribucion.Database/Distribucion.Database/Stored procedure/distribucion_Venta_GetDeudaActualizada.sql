CREATE PROCEDURE [dbo].[distribucion_Venta_GetDeudaActualizada]
@ProductId INT,
@ClienteId INT

AS

SELECT
        TOP 1 
        DeudaActualizada
FROM
        Venta
WHERE
        ClienteId = @ClienteId
		AND VentaState = 1
		AND IsReserva = 0
ORDER BY
        VentaId DESC