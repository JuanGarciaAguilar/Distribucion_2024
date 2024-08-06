CREATE PROCEDURE [dbo].[distribucion_Sector_Delete]
@SectorId int
AS

delete from [dbo].[Sector] 
	where
	SectorId = @SectorId


