CREATE PROCEDURE [dbo].[distribucion_Cliente_GetById]
@ClienteId int
AS
SELECT
	ClienteId,
	ClienteName,
	ClienteAddress,
	ClientePhone,
    DeudaActualizada,
    SectorId
FROM	dbo.Cliente WITH(NOLOCK)
WHERE ClienteId = @ClienteId