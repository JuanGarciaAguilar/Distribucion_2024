CREATE PROCEDURE [dbo].[distribucion_Sector_Update]
@SectorId int,
@SectorName NVARCHAR(50)
AS

update [dbo].[Sector] set
	
	SectorName=@SectorName
	where
	SectorId = @SectorId


