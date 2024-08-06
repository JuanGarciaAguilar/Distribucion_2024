CREATE TABLE [dbo].[Stock](
	[StockId] [int] IDENTITY(1,1) NOT NULL,
	[FechaStock] [datetime] NOT NULL,
	[DetalleCompraId] [int] NULL,
	[ProductId] [int] NOT NULL,
	[CantidadIngresada] [decimal](18, 3) NULL,
	[PesoCompra] [decimal](18, 3) NULL,
	[PrecioCompra] [decimal](18, 3) NULL,
	[CostoUnitarioCompra] [decimal](18, 3) NULL,
	[FleteUnidadCompra] [decimal](18, 3) NULL,
	[CostoUnitarioTotalCompra] [decimal](18, 3) NULL,
	[PrecioTotalCompra] [decimal](18, 3) NULL,
	[VentaId] [int] NULL,
	[CantidadVenta] [decimal](18, 3) NULL,
	[PesoVenta] [decimal](18, 3) NULL,
	[PrecioRealVenta] [decimal](18, 3) NULL,
	[PrecioIngresadoVenta] [decimal](18, 3) NULL,
	[CantidadActualStock] [decimal](18, 3) NOT NULL,
	[GastoDiarioOperacion] [decimal](18, 3) NULL,
	[DocumentoCompra] [nvarchar](20) NULL,
 CONSTRAINT [PK_Stock] PRIMARY KEY CLUSTERED 
(
	[StockId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Stock]  WITH CHECK ADD  CONSTRAINT [FK_Stock_Producto] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Producto] ([ProductId])
GO

ALTER TABLE [dbo].[Stock] CHECK CONSTRAINT [FK_Stock_Producto]
GO