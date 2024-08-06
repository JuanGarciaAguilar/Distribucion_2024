CREATE TYPE [dbo].[ReporteVentaTipo] AS TABLE(
	ProductParentID INT,
	[ProductId] [INT] NULL,
	[Tipo] [VARCHAR](20) NULL,
	[Fecha] [DATETIME] NULL,
	[Venta] [DECIMAL](18, 3) NULL
)
GO
