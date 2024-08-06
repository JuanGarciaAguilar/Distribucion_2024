CREATE PROCEDURE [dbo].[distribucion_Role_GetActive]
AS
SELECT
    RoleID,
	RoleDescription,
	RoleState
FROM [dbo].[Role] WITH(NOLOCK)
WHERE
	RoleState = 1