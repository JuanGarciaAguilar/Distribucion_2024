CREATE PROCEDURE [dbo].[distribucion_Proveedor_Insert]
@ProveedorName nvarchar(100),
@ProveedorPhone nvarchar(50),
@ProveedorEmail nvarchar(50),
@ProveedorAddress NVARCHAR(50)

AS
INSERT INTO [dbo].[Proveedor]
           ([ProveedorName]
           ,[ProveedorPhone]
           ,[ProveedorEmail]
           ,[ProveedorAddress])
     VALUES
           (@ProveedorName,
           @ProveedorPhone,
           @ProveedorEmail,
           @ProveedorAddress)
GO