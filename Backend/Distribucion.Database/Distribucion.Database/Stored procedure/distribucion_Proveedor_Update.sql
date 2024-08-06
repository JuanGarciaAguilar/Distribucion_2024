CREATE PROCEDURE [dbo].[distribucion_Proveedor_Update]
@ProveedorId INT,
@ProveedorName NVARCHAR(100),
@ProveedorPhone NVARCHAR(50),
@ProveedorEmail NVARCHAR(50),
@ProveedorAddress NVARCHAR(50)

AS
UPDATE [dbo].[Proveedor]
SET 
    [ProveedorName] = @ProveedorName,
    [ProveedorPhone] = @ProveedorPhone,
    [ProveedorEmail] = @ProveedorEmail,
    [ProveedorAddress] = @ProveedorAddress
WHERE
	ProveedorId = @ProveedorId
GO
