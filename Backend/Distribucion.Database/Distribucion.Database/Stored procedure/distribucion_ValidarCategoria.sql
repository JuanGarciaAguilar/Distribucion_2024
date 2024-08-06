CREATE PROCEDURE [dbo].[Distribucion_ValidarCategoria]
    @ProductName nvarchar(100)
AS

IF EXISTS(SELECT	TOP 1 1 [Exists]
FROM	dbo.[Producto] WITH(NOLOCK)
WHERE ProductName = @ProductName
            AND ProductLevel = 0 AND ProductParentId= 0)
BEGIN
	SELECT 1 [Exists]
END
ELSE
BEGIN
	SELECT 0 [Exists]
END