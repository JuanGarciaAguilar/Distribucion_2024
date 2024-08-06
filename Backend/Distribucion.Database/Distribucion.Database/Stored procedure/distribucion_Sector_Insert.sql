
CREATE PROCEDURE [dbo].[distribucion_Sector_Insert]
@SectorName NVARCHAR(50)
AS

INSERT INTO [dbo].[Sector]
	(
	SectorName
	)
VALUES
	(
	@SectorName
    )
