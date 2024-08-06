CREATE PROCEDURE [dbo].[distribucion_Cliente_Delete]
@ClienteId INT
AS
DELETE  FROM Cliente
WHERE   ClienteId = @ClienteId