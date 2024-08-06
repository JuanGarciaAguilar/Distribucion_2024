CREATE PROCEDURE [dbo].[distribucion_Producto_GetAll]
AS
SELECT
	 ProductId,
	 ProductName,
	 UnidadMedidad,
	 ProductImage,
	 ProductParentId,
	 ProductLevel
FROM	dbo.Producto WITH(NOLOCK)
WHERE ProductState= 1
ORDER BY ProductParentId ASC, ProductName ASC