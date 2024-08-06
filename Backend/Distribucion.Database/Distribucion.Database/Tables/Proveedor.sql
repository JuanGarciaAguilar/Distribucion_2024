CREATE TABLE [dbo].[Proveedor](
	[ProveedorId] [int] IDENTITY(1,1) NOT NULL,
	[ProveedorName] [nvarchar](100) NULL,
	[ProveedorPhone] [nvarchar](50) NULL,
	[ProveedorEmail] [nvarchar](50) NULL,
	[ProveedorWebSite] [nvarchar](50) NULL,
	[ProveedorAddress] [nvarchar](100) NULL,
	[IsDeleted] BIT NULL DEFAULT(0),
	[CreationDate] DATETIME NULL DEFAULT(GETDATE())
 CONSTRAINT [PK_Proveedor] PRIMARY KEY CLUSTERED 
(
	[ProveedorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO