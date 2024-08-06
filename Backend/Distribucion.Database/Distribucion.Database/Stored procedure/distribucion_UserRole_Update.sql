CREATE PROCEDURE [dbo].[distribucion_UserRole_Update]
    @UserRoleID INT,
	@UserID NVARCHAR (50),
    @RoleID INT,
    @UpdateUser NVARCHAR (50)
AS
    DECLARE
        @UpdateDate DATETIME = GETDATE()
UPDATE [dbo].[UserRole]
SET
    UserID = @UserFirstName,
    RoleID = @RoleID,
    UpdateDate = @UpdateDate,
    UpdateUser = @UpdateUser
WHERE
    UserRoleID = @UserRoleID