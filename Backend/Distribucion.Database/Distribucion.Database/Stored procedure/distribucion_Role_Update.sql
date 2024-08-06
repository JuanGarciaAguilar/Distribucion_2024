CREATE PROCEDURE [dbo].[distribucion_Role_Update]
    @RoleID INT,
	@RoleDescription NVARCHAR(200),
    @UpdateUser NVARCHAR(50)
AS
DECLARE
    @UpdateDate DATETIME = GETDATE();
UPDATE [dbo].[Role]
SET
	RoleDescription = @RoleDescription,
	UpdateDate = @UpdateDate,
	UpdateUser = @UpdateUser
WHERE
	RoleID = @RoleId