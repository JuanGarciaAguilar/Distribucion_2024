--Truncate Gasto Semanal Detalle
TRUNCATE TABLE [GastoSemanalDetalle]
SELECT * FROM [GastoSemanalDetalle]

--Truncate Gasto Semanal
ALTER TABLE [GastoSemanalDetalle] DROP CONSTRAINT [FK_GastoSemanalDetalle_GastosSemanal]
TRUNCATE TABLE [GastosSemanales]
ALTER TABLE [GastoSemanalDetalle] WITH CHECK ADD CONSTRAINT [FK_GastoSemanalDetalle_GastosSemanal] FOREIGN KEY([GastoSemanalId]) REFERENCES [GastosSemanales] ([GastoSemanalId])
SELECT * FROM [GastosSemanales]

--Truncate Venta
TRUNCATE TABLE [Venta]
SELECT * FROM [Venta]

--Truncate Compra Detalle
TRUNCATE TABLE [CompraDetalle]
SELECT * FROM [CompraDetalle]

--Truncate Compra
ALTER TABLE [CompraDetalle] DROP CONSTRAINT [FK_CompraDetalle_Compra]
TRUNCATE TABLE [Compra]
ALTER TABLE [CompraDetalle] WITH CHECK ADD CONSTRAINT [FK_CompraDetalle_Compra] FOREIGN KEY([CompraId]) REFERENCES [Compra] ([CompraId])
SELECT * FROM [Compra]

--Truncate Stock
TRUNCATE TABLE [Stock]
SELECT * FROM [Stock]

--Set DeudaActualizada Clientes = 0
UPDATE [Cliente] SET [DeudaActualizada] = 0