CREATE TABLE [dbo].[GastoSemanalDetalle](
	[GastoSemanalDetalleId] [int] IDENTITY(1,1) NOT NULL,
	[GastoSemanalId] [int] NULL,
	[Insumo] [nvarchar](50) NULL,
	[Gasto] [decimal](18, 3) NULL,
	[Comentario] [nvarchar](300) NULL,
 CONSTRAINT [PK_GastoSemanalDetalle] PRIMARY KEY CLUSTERED 
(
	[GastoSemanalDetalleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[GastoSemanalDetalle]  WITH CHECK ADD  CONSTRAINT [FK_GastoSemanalDetalle_GastosSemanal] FOREIGN KEY([GastoSemanalId])
REFERENCES [dbo].[GastosSemanales] ([GastoSemanalId])
GO

ALTER TABLE [dbo].[GastoSemanalDetalle] CHECK CONSTRAINT [FK_GastoSemanalDetalle_GastosSemanal]
GO