CREATE PROCEDURE [dbo].[distribucion_Proveedor_Delete]
@ProveedorId INT
AS
UPDATE [dbo].[Proveedor]
SET 
    [IsDeleted] = 1
WHERE
	ProveedorId = @ProveedorId
GO

