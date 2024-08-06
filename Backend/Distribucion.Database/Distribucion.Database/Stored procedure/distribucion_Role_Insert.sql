CREATE PROCEDURE [dbo].[distribucion_Role_Insert]
    @RoleDescription NVARCHAR(200),
    @CreationUser NVARCHAR(50)
AS
DECLARE
    @CreationDate DATETIME = GETDATE();
INSERT INTO [dbo].[Role](
	RoleDescription,
	CreationDate,
	CreationUser,
	UpdateDate,
	UpdateUser)
VALUES(
	@RoleDescription,
    @CreationDate,
    @CreationUser,
    @CreationDate,
    @CreationUser)