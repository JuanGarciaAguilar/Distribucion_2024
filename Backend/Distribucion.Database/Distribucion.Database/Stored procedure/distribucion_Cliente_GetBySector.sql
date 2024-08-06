CREATE PROCEDURE [dbo].[distribucion_Cliente_GetBySector]
@sectorid INT
AS
SELECT
	ClienteId,
	ClienteName,
	ClienteAddress,
	ClientePhone,
    SectorId,
	DeudaActualizada
FROM  dbo.Cliente WITH(NOLOCK)
WHERE SectorId = @sectorid
ORDER BY ClienteName ASC