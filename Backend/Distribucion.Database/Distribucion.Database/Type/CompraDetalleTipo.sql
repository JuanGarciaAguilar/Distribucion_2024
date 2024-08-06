CREATE TYPE [dbo].[CompraDetalleTipo] AS TABLE(
	[DetalleCompraId] [int] NULL,
	[ProveedorId] [int] NULL,
	[ProductId] [int] NULL,
	[CantidadCompra] [decimal](18, 3) NULL,
	[PesoCompra] [decimal](18, 3) NULL,
	[PrecioUnitario] [decimal](18, 3) NULL,
	[PrecioCompra] [decimal](18, 3) NULL,
	[TotalDeposito] [decimal](18, 3) NULL,
	[SaldoDeposito] [decimal](18, 3) NULL,
	[CostoFleteItemCompra] [decimal](18, 3) NULL,
	[DocumentoCompra] [varchar](20) NULL,
	[CantidadMinima] [decimal](18, 3) NULL,
	[UnidadMedida] [nvarchar](10) NULL,
	[CompraEstado] [int] NULL
)
GO

