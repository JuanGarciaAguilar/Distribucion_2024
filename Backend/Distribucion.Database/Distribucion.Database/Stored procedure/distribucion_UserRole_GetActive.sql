CREATE PROCEDURE [dbo].[distribucion_UserRole_GetActive]
AS
SELECT
    UserRoleID,
    UserID,
    RoleID,
    UserRoleState 
FROM [dbo].[UserRole] WITH(NOLOCK)
WHERE
	UserRoleState = 1