CREATE PROCEDURE [dbo].[distribucion_Producto_Padre_GetAll]
AS
SELECT
	 ProductId,
	 ProductName,
	 UnidadMedidad,
	 ProductImage,
	 ProductParentId,
	 ProductLevel
FROM dbo.[Producto] WITH(NOLOCK)
WHERE ProductState= 1
AND ProductLevel = 0
ORDER BY ProductName ASC
GO

