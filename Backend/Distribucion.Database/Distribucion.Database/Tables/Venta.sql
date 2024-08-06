CREATE TABLE [dbo].[Venta](
	[VentaId] [int] IDENTITY(1,1) NOT NULL,
	[FechaVenta] [datetime] NOT NULL,
	[ClienteId] [int] NOT NULL,
	[ProductId] [int] NOT NULL,
	[CantidadVenta] [decimal](18, 3) NOT NULL,
	[PesoVenta] [decimal](18, 3) NULL,
	[PrecioRealVenta] [decimal](18, 3) NOT NULL,
	[PrecioIngresadoVenta] [decimal](18, 3) NOT NULL,
	[Amortizacion] [decimal](18, 3) NULL,
	[DeudaActualizada] [decimal](18, 3) NULL,
	[UsuarioId] [nvarchar](100) NULL,
	[VentaState] [bit] default 1,
	[IsReserva] [bit] NULL DEFAULT 0,
	[FechaReserva] [DateTime] NULL DEFAULT GETDATE(),
	[UnidadMedida] [nvarchar](10) NULL,
    [CantidadMinima] [decimal](18, 3) NULL,
 CONSTRAINT [PK_Venta] PRIMARY KEY CLUSTERED 
(
	[VentaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Venta]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioId] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Usuario] ([UserID])
GO

ALTER TABLE [dbo].[Venta] CHECK CONSTRAINT [FK_UsuarioId]
GO

ALTER TABLE [dbo].[Venta]  WITH CHECK ADD  CONSTRAINT [FK_Venta_Cliente] FOREIGN KEY([ClienteId])
REFERENCES [dbo].[Cliente] ([ClienteId])
GO

ALTER TABLE [dbo].[Venta] CHECK CONSTRAINT [FK_Venta_Cliente]
GO

ALTER TABLE [dbo].[Venta]  WITH CHECK ADD  CONSTRAINT [FK_Venta_Producto] FOREIGN KEY([ProductId])
REFERENCES [dbo].[Producto] ([ProductId])
GO

ALTER TABLE [dbo].[Venta] CHECK CONSTRAINT [FK_Venta_Producto]

GO
