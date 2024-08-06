CREATE PROCEDURE [dbo].[distribucion_Role_Delete]
	@RoleID INT,
	@UpdateUser NVARCHAR(50)
AS
DECLARE
	 @UpdateDate DATETIME = GETDATE();
UPDATE [dbo].[Role] 
SET
    RoleState  = 0,
	UpdateDate = @UpdateDate,
	UpdateUser = @UpdateUser
WHERE RoleID = @RoleID

EXEC distribucion_UserRole_DeleteRole
    @RoleID,
    @UpdateUser