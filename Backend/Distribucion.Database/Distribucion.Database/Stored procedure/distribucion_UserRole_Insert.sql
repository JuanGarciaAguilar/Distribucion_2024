CREATE PROCEDURE [dbo].[distriucion_UserRole_Insert]
    @UserID NVARCHAR (50),
    @RoleID INT,
    @CreationUser NVARCHAR (50)
AS
DECLARE
    @CreationDate DATETIME = GETDATE();
INSERT INTO [dbo].[UserRole](
    UserID,
    RoleID,
    CreationDate,
    CreationUser,
    UpdateDate,
    UpdateUser)
VALUES(
    @UserID,
    @RoleID,
    @CreationDate,
    @CreationUser,
    @CreationDate,
    @CreationUser)