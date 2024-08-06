CREATE PROCEDURE [dbo].[Distribucion_Usuario_GetByRole]
    @UserId nvarchar(100),
    @RoleId int
AS

DECLARE @IsValid BIT
    IF EXISTS( SELECT TOP 1 1 
        FROM dbo.UserRole WITH(NOLOCK)
        WHERE UserId = @UserId
            AND RoleId = @RoleId)

        BEGIN
            SET @IsValid = 1
        END
	ELSE
	    BEGIN
		    SET @IsValid = 0
		END

SELECT @IsValid AS IsValid