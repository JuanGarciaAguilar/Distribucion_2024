CREATE TYPE [dbo].[ventaDetalleTipo] AS TABLE(
	[ClienteId] [int] NULL,
	[ProductId] [int] NULL,
	[CantidadVenta] [decimal](18, 3) NULL,
	[PesoVenta] [decimal](18, 3) NULL,
	[PrecioRealVenta] [decimal](18, 3) NULL,
	[PrecioIngresadoVenta] [decimal](18, 3) NULL,
	[Amortizacion] [decimal](18, 3) NULL,
	[DeudaActualizada] [decimal](18, 3) NULL,
	[UsuarioId] [nvarchar](100) NULL,
	[UnidadMedida] [nvarchar](10) NULL,
    [CantidadMinima] [decimal](18, 3) NULL
)
GO