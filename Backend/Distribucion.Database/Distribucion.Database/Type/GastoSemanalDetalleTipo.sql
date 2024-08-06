CREATE TYPE [dbo].[GastoSemanalDetalleTipo] AS TABLE(
	[Insumo] [nvarchar](100) NULL,
	[Gasto] [decimal](18, 3) NULL,
	Comentario NVARCHAR(300)
)
GO
