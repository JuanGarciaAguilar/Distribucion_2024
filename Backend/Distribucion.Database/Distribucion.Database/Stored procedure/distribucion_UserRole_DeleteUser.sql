CREATE PROCEDURE [dbo].[distribucion_UserRole_DeleteUser]
    @UserID NVARCHAR (50),
    @UpdateUser NVARCHAR (50)
AS
DECLARE
    @UpdateDate DATETIME = GETDATE()
UPDATE [dbo].[UserRole]
SET
    UserRoleState = 0,
    UpdateDate = @UpdateDate,    
    UpdateUser = @UpdateUser
WHERE
    UserID = @UserID