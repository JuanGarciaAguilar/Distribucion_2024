CREATE PROCEDURE [dbo].[distribucion_User_PasswordChange]
    @UserID NVARCHAR (50),
    @UserPassword NVARCHAR (200),    
    @UpdateUser NVARCHAR (50)
AS
    DECLARE
        @UpdateDate DATETIME = GETDATE()
UPDATE [User]
SET
    UserPassword = @UserPassword,    
    UpdateDate = @UpdateDate,
    UpdateUser = @UpdateUser
WHERE
    UserID = @UserID