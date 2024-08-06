CREATE PROCEDURE [dbo].[distribucion_User_Delete]
    @UserID NVARCHAR (50),
    @UpdateUser NVARCHAR (50)
AS
DECLARE
    @UpdateDate DATETIME = GETDATE()
UPDATE [dbo].[User]
SET
    UserState = 0,
    UpdateDate = @UpdateDate,    
    UpdateUser = @UpdateUser
WHERE
    UserID = @UserID

EXEC distribucion_UserRole_DeleteUser
    @UserID,
    @UpdateUser