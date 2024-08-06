CREATE PROCEDURE [dbo].[distribucion_Sector_GetAll]
AS
SELECT 
	SectorId,
	SectorName
FROM [dbo].[Sector] ORDER BY SectorId ASC