CREATE PROCEDURE [dbo].[distribucion_UserRole_ChangeActiveState]
    @UserRoleID INT,
    @UpdateUser NVARCHAR(50)
AS
DECLARE
    @UpdateDate DATETIME = GETDATE();
UPDATE [dbo].[UserRole]
SET
	RoleState = 1,
	UpdateDate = @UpdateDate,
	UpdateUser = @UpdateUser
WHERE
	UserRoleID = @UserRoleID