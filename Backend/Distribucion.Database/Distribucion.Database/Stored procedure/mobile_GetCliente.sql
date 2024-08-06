CREATE PROCEDURE [dbo].[mobile_GetCliente] 
@SECTOR INT
AS
	SELECT [IdCliente]
		  ,[NombreCliente]
		  ,[Direccion]
		  ,[Telefono]
		  ,[Celular]
		  ,UltimoPrecio
		  , DeudaAcumulada = (	SELECT	SUM(PrecioTotal) - SUM(MontoPagado) 
								FROM	dbo.tblOperacion O WITH(NOLOCK) 
								WHERE	O.IdCliente = C.IdCliente)
		  ,Sector
	  FROM [dbo].[tblCliente] C WITH(NOLOCK)
	  WHERE Sector = @SECTOR
	  ORDER BY NombreCliente