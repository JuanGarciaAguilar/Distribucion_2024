CREATE TABLE [dbo].[CompraDetalle](
	[DetalleCompraId] [int] IDENTITY(1,1) NOT NULL,
	[CompraId] [int] NOT NULL,
	[ProveedorId] [int] NOT NULL,
	[ProductId] [int] NOT NULL,
	[CantidadCompra] [decimal](18, 3) NOT NULL,
	[PesoCompra] [decimal](18, 3) NOT NULL,
	[PrecioCompra] [decimal](18, 3) NOT NULL,
	[TotalDeposito] [decimal](18, 3) NOT NULL,
	[SaldoDeposito] [decimal](18, 3) NOT NULL,
	[CostoFleteItemCompra] DECIMAL(18, 3) NULL,
	[CantidadBuenEstado] [decimal](18, 3) NULL,
	[CantidadMalEstado] [decimal](18, 3) NULL,
	[DocumentoCompra]  NVARCHAR (20)  NULL,
	[UnidadMedida]  NVARCHAR (10)  NULL,
	[CantidadMinima] [decimal](18, 3) NULL,
	[CompraEstado] [int] NULL,
	[PrecioUnitario] [decimal](8,3) NULL,
 CONSTRAINT [PK_CompraDetalle] PRIMARY KEY CLUSTERED 
(
	[DetalleCompraId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[CompraDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CompraDetalle_Compra] FOREIGN KEY([CompraId])
REFERENCES [dbo].[Compra] ([CompraId])
GO

ALTER TABLE [dbo].[CompraDetalle] CHECK CONSTRAINT [FK_CompraDetalle_Compra]
GO

ALTER TABLE [dbo].[CompraDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CompraDetalle_Producto] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Producto] ([ProductId])
GO

ALTER TABLE [dbo].[CompraDetalle] CHECK CONSTRAINT [FK_CompraDetalle_Producto]
GO

ALTER TABLE [dbo].[CompraDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CompraDetalle_Proveedor] FOREIGN KEY([ProveedorId])
REFERENCES [dbo].[Proveedor] ([ProveedorId])
GO

ALTER TABLE [dbo].[CompraDetalle] CHECK CONSTRAINT [FK_CompraDetalle_Proveedor]
GO
