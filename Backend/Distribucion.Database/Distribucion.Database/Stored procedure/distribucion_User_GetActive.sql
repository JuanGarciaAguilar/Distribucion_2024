CREATE PROCEDURE [dbo].[distribucion_User_GetAll]
AS
SELECT
    UserId,
    UserFirstName,
    UserLastName,
    UserDNI,
    UserEmail,
    UserPhone,
    UserState
FROM
    [dbo].[User] WITH (NOLOCK)
WHERE
    UserState = 1