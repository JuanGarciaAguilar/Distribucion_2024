CREATE PROCEDURE [dbo].[distribucion_Cliente_GetDeudaByClient]
@ClientID INT
AS
SELECT DeudaActualizada
FROM Cliente 
WHERE ClienteId = @ClientID