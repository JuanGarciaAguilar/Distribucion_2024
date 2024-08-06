CREATE PROCEDURE [dbo].[distribucion_Producto_DeleteHijo]
@ProductId INT
AS
IF ((SELECT ProductLevel FROM Producto WHERE ProductId = @ProductId)=1)
BEGIN
	update Producto set ProductState = 0 where ProductId = @ProductId
	UPDATE Equivalencia SET Estado = 0 WHERE ProductId = @ProductId
END
