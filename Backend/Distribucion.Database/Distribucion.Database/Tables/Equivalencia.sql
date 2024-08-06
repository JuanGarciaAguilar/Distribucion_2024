CREATE TABLE [dbo].[Equivalencia] (
    [EquivalenciaId]  INT           IDENTITY (1, 1) NOT NULL,
    [ProductId]       INT           NULL,
    [UnidadBase]      NVARCHAR (50) NULL,
    [UnidadDestino]   NVARCHAR (50) NULL,
    [CantidadObjetos] INT           NULL,
    [Estado]          BIT           NULL,
	[FleteUnitario]   DECIMAL(18,3) NULL,
    PRIMARY KEY CLUSTERED ([EquivalenciaId] ASC),
    FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Producto] ([ProductId])
);
GO