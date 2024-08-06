CREATE PROCEDURE [dbo].[distribucion_Cliente_GetAll]

AS

SELECT
	ClienteId,
	ClienteName,
	ClienteAddress,
	ClientePhone,
    DeudaActualizada,
	SectorId
FROM	dbo.Cliente WITH(NOLOCK)
ORDER BY ClienteName ASC