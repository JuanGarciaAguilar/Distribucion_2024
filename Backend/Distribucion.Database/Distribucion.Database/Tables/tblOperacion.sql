CREATE TABLE [dbo].[tblOperacion](
	[IdOperacion] [int] IDENTITY(1,1) NOT NULL,
	[FechaOperacion] [datetime] NOT NULL,
	[IdCliente] [int] NOT NULL,
	[Unidades] [int] NOT NULL,
	[PesoTotal] [numeric](18, 3) NOT NULL,
	[PrecioPorKilo] [numeric](18, 2) NOT NULL,
	[PrecioTotal] [numeric](18, 3) NOT NULL,
	[MontoPagado] [numeric](18, 3) NULL,
	[FechaPago] [datetime] NULL,
	[SeImprimio] [bit] NOT NULL,
	[IdCompraDiaria] [int] NOT NULL,
	[IdOperacionRef] [int] NULL,
	[MontoEmpleado] [numeric](18, 4) NULL,
 CONSTRAINT [PK_tblOperacion] PRIMARY KEY CLUSTERED 
(
	[IdOperacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO