CREATE PROCEDURE [dbo].[Distribucion_ValidarCliente]
    @ClienteName nvarchar(100),
    @SectorId int
AS

IF EXISTS(SELECT	TOP 1 1 [Exists]
FROM	dbo.[Cliente] WITH(NOLOCK)
WHERE ClienteName = @ClienteName
            AND SectorId = @SectorId)
BEGIN
	SELECT 1 [Exists]
END
ELSE
BEGIN
	SELECT 0 [Exists]
END