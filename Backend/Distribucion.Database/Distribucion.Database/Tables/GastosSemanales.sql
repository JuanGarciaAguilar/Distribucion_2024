CREATE TABLE [dbo].[GastosSemanales](
	[GastoSemanalId] [int] IDENTITY(1,1) NOT NULL,
	[FechaInicio] [datetime] NOT NULL,
	[FechaFinal] [datetime] NOT NULL,
	[GastoTotal] [decimal](18, 3) NOT NULL,
 CONSTRAINT [PK_GastosSemanales] PRIMARY KEY CLUSTERED 
(
	[GastoSemanalId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

