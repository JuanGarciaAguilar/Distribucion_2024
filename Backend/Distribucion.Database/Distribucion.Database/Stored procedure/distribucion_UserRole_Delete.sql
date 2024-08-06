CREATE PROCEDURE [dbo].[distribucion_UserRole_Delete]
    @UserRoleID INT,
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
    UserRoleID = @UserRoleID