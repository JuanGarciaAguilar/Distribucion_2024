CREATE PROCEDURE [dbo].[distribucion_UserRole_GetAll]
AS
SELECT
    UserRoleID,
    UserID,
    RoleID,
    UserRoleState    
FROM
    [dbo].[UserRole] WITH (NOLOCK)