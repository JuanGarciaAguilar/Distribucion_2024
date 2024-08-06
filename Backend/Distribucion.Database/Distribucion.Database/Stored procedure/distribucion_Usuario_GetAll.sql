CREATE PROCEDURE [dbo].[distribucion_Usuario_GetAll]
AS
SELECT
	UserId,
	FullName,
	Email,
	Phone,
	tipo,
	RoleDescription 
FROM Usuario WITH(NOLOCK)

WHERE UserState = 1
GO