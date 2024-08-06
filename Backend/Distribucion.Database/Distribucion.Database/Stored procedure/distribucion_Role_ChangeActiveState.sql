CREATE PROCEDURE [dbo].[distribucion_Role_ChangeActiveState]
    @RoleID INT,
    @UpdateUser NVARCHAR(50)
AS
DECLARE
    @UpdateDate DATETIME = GETDATE();
UPDATE [dbo].[Role]
SET
	RoleState = 1,
	UpdateDate = @UpdateDate,
	UpdateUser = @UpdateUser
WHERE
	RoleID = @RoleId