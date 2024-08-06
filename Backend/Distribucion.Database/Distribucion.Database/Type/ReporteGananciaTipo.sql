CREATE TYPE [dbo].[ReporteGananciaTipo] AS TABLE(
	[ProductId] [int] NULL,
	[ProductName] [varchar](20) NULL,
	[ProductParentId] [int] NULL,
	[ProductParentName] [varchar](20) NULL,
	[CompraCantidad] [decimal](18, 3) NULL,
	[CompraPrecio] [decimal](18, 3) NULL,
	[CompraTotal] [decimal](18, 3) NULL,
	[VentaCantidad] [decimal](18, 3) NULL,
	[VentaPrecio] [decimal](18, 3) NULL,
	[VentaTotal] [decimal](18, 3) NULL,
	[GananciaParcial] [decimal](18, 3) NULL,
	[Flete] [decimal](18, 3) NULL,
	[GananciaTotal] [decimal](18, 3) NULL
)
GO