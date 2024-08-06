CREATE PROCEDURE [dbo].[distribucion_UserRole_GetByRole]
	@RoleID INT
AS
SELECT
	U.UserID,
	U.FirstName,
	U.LastName,
	R.RoleDescription,
	UR.UserRoleStatus
FROM [dbo].[UserRole] UR
	LEFT JOIN [dbo].[User] U ON U.UserID = UR.UserID
	LEFT JOIN [dbo].[Role] R ON R.RoleID = UR.RoleID
WHERE
	R.RoleID = @RoleID