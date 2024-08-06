CREATE PROCEDURE [dbo].[distribucion_Usuario_Delete]
@UserID NVARCHAR(100)
AS

UPDATE Usuario 
SET
    UserState = 0 
WHERE UserID = @UserID