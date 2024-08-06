CREATE PROCEDURE [dbo].[distribucion_Cliente_Update]
    @ClienteId INT,
    @ClienteName NVARCHAR(100),
    @ClienteAddress NVARCHAR(100),
    @ClientePhone NVARCHAR(50),
    @SectorId INT
AS
UPDATE Cliente
SET
    ClienteName = @ClienteName,
    ClienteAddress = @ClienteAddress,
    ClientePhone = @ClientePhone,
    SectorId = @SectorId
WHERE ClienteId = @ClienteId