CREATE PROCEDURE [dbo].[distribucion_User_Update]
    @UserID NVARCHAR (50),
    @UserFirstName NVARCHAR (100),
    @UserLastName NVARCHAR (100),
    @UserDNI NVARCHAR (11),
    @UserEmail NVARCHAR (100),
    @UserPhone NVARCHAR (50),
    @UpdateUser NVARCHAR (50)
AS
    DECLARE
        @UpdateDate DATETIME = GETDATE()
UPDATE [dbo].[User]
SET
    UserFirstName = @UserFirstName,
    UserLastName = @UserLastName,
    UserDNI = @UserDNI,
    UserEmail = @UserEmail,
    UserPhone = @UserPhone,
    UpdateDate = @UpdateDate,
    UpdateUser = @UpdateUser
WHERE
    UserID = @UserID