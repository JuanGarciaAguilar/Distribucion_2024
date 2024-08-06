CREATE TYPE [dbo].[EquivalenciaDetalleTipo] AS TABLE(
	[EquivalenciaId] [int] NULL,
	[UnidadBase] [nvarchar](50) NULL,
	[UnidadDestino] [nvarchar](50) NULL,
	[CantidadObjetos] INT NULL,
    [FleteUnitario]   DECIMAL (18, 3) NULL
)
GO