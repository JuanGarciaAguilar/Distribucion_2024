CREATE PROCEDURE [dbo].[distribucion_User_ChangeActiveState]
    @UserID NVARCHAR(50),
    @UpdateUser NVARCHAR(50)
AS
DECLARE
    @UpdateDate DATETIME = GETDATE();
UPDATE [dbo].[User]
SET
	UserState = 1,
	UpdateDate = @UpdateDate,
	UpdateUser = @UpdateUser
WHERE
	UserID = @UserID