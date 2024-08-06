CREATE PROCEDURE [dbo].[distribucion_Cliente_Insert]
@ClienteName nvarchar(100),
@ClienteAddress nvarchar(100),
@ClientePhone nvarchar(50),
@SectorId INT
AS
INSERT INTO Cliente (
        ClienteName,
        ClienteAddress,
        ClientePhone,
        DeudaActualizada,
        SectorId)
VALUES (
        @ClienteName,
        @ClienteAddress,
        @ClientePhone,
        0,
        @SectorId)
