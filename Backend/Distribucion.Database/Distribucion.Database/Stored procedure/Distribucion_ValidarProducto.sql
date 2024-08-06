CREATE PROCEDURE [dbo].[Distribucion_ValidarProducto]
	@CategoriaId INT,
    @ProductName nvarchar(100)	
AS

IF EXISTS(SELECT	TOP 1 1 [Exists]
FROM	dbo.[Producto] WITH(NOLOCK)
WHERE ProductName = @ProductName
            AND ProductLevel = 1 AND ProductParentId= @CategoriaId)
BEGIN
	SELECT 1 [Exists]
END
ELSE
BEGIN
	SELECT 0 [Exists]
END