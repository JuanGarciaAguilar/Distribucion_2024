CREATE TABLE [dbo].[Compra] (
    [CompraId]     INT             IDENTITY (1, 1) NOT NULL,
    [FechaCompra]  DATETIME        NOT NULL,
    [FechaEntrega] DATETIME        NOT NULL,
    [OrigenCompra] NVARCHAR (100)  NULL,
    [TotalCompra]  DECIMAL (18, 3) NOT NULL,
    [CostoFlete]   DECIMAL (18, 3) NULL,
    [UsuarioId]    NVARCHAR (100)  NULL,
    CONSTRAINT [PK_Compra] PRIMARY KEY CLUSTERED ([CompraId] ASC),
    CONSTRAINT [FK_UsuarioId_C] FOREIGN KEY ([UsuarioId]) REFERENCES [dbo].[Usuario] ([UserID])
);
GO
