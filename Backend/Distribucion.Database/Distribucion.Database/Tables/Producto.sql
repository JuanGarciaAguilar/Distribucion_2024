CREATE TABLE [dbo].[Producto](
	[ProductId] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](50) NOT NULL,
	[UnidadMedidad] [nvarchar](10) NULL,
	[ProductImage] [nvarchar](200) NULL,
	[ProductParentId] [int] NULL,
	[ProductLevel] [smallint] NOT NULL,
	[ProductState] [bit] NULL,
	[PorcentajeGanancia] [decimal](18, 3) NULL,
 CONSTRAINT [PK_Producto] PRIMARY KEY CLUSTERED 
(
	[ProductId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Producto] ADD  DEFAULT ((1)) FOR [ProductState]
GO
