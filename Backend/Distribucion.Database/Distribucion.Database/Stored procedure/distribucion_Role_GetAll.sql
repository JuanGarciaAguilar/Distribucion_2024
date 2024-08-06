CREATE PROCEDURE [dbo].[distribucion_Role_GetAll]
AS
SELECT
    RoleID,
	RoleDescription,
	RoleState
FROM [dbo].[Role] WITH(NOLOCK)