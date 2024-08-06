CREATE TYPE [dbo].[GastoSemanalDetalleType] AS TABLE(
	[GastoSemanalDetalleId] [int] NULL,
	[Insumo] [nvarchar](100) NULL,
	[Gasto] [decimal](18, 3) NULL
)
GO


