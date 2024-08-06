CREATE PROCEDURE [dbo].[distribucion_Producto_UpdatePadre]
@ProductId INT,
@ProductName nvarchar(50),
@ProductImage nvarchar(200)
AS
UPDATE Producto
SET
    ProductName = @ProductName,
    ProductImage = @ProductImage
WHERE ProductId = @ProductId