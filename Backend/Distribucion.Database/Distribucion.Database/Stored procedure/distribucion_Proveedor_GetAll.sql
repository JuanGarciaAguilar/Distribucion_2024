CREATE PROCEDURE [dbo].[distribucion_Proveedor_GetAll]
AS
SELECT  ProveedorId,
        ProveedorName,
        ProveedorPhone,
        ProveedorEmail,
        ProveedorWebSite,
        ProveedorAddress
FROM	[dbo].[Proveedor] WITH(NOLOCK)
WHERE	IsDeleted = 0
