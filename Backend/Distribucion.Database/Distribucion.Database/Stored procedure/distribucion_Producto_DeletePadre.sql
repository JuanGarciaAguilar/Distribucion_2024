CREATE PROCEDURE [dbo].[distribucion_Producto_DeletePadre]
@ProductId INT
AS
--Se eliminan todos los hijos del padre
IF ((SELECT ProductLevel FROM Producto WHERE ProductId = @ProductId)=0)
BEGIN
	update Producto set ProductState = 0 where ProductId = @ProductId
	UPDATE Producto SET ProductState = 0 WHERE ProductParentId = @ProductId
END