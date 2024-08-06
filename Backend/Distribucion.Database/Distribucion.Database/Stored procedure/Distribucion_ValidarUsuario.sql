CREATE PROCEDURE [dbo].[Distribucion_ValidarUsuario]
    @UserID NVARCHAR(100),
    @Email NVARCHAR(100),
    @Phone VARCHAR(50)
AS

SELECT TOP 1
	CASE
		WHEN (SELECT TOP 1 1 [Exists] FROM	dbo.[Usuario] WITH(NOLOCK) WHERE UserID = @UserID) = 1  THEN 1
		WHEN (SELECT TOP 1 1 [Exists] FROM	dbo.[Usuario] WITH(NOLOCK) WHERE Email = @Email)=1 THEN 2
		WHEN (SELECT TOP 1 1 [Exists] FROM	dbo.[Usuario] WITH(NOLOCK) WHERE Phone = @Phone)=1 THEN 3
		ELSE 0
	END
FROM dbo.[Usuario] WITH(NOLOCK)
