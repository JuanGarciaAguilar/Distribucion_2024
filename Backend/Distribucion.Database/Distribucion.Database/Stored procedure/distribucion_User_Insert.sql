CREATE PROCEDURE [dbo].[distribucion_User_Insert]
    @UserID NVARCHAR (50),
    @UserPassword NVARCHAR (200),
    @UserFirstName NVARCHAR (100),
    @UserLastName NVARCHAR (100),
    @UserDNI NVARCHAR (11),
    @UserEmail NVARCHAR (100),
    @UserPhone NVARCHAR (50),
	@RoleID INT,
    @CreationUser NVARCHAR (50),
AS
DECLARE
    @CreationDate DATETIME = GETDATE();
INSERT INTO [dbo].[User](
    UserID,
    UserPassword,
    UserFirstName,
    UserLastName,
    UserDNI,
    UserEmail,
    UserPhone,
    CreationDate,
    CreationUser,
    UpdateDate,
    UpdateUser)
VALUES(
    @UserID,
    @UserPassword,
    @UserFirstName,
    @UserLastName,
    @UserDNI,
    @UserEmail,
    @UserPhone,
    @CreationDate,
    @CreationUser,
    @CreationDate,
    @CreationUser)
EXEC dbo.distriucion_UserRole_Insert
	@UserID,
	@RoleID,
	@CreationUser