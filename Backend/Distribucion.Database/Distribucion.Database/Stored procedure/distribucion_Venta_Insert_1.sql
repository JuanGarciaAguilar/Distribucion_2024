IF EXISTS (SELECT * FROM sys.objects WHERE object_id=
OBJECT_ID(N'[dbo].[distribucion_Venta_Insert]') AND type in (N'P', N'PC'))
	DROP PROCEDURE [dbo].[distribucion_Venta_Insert]
GO
/******************************
** File: distribucion_Cliente_GetAll.sql 
** Name: distribucion_Cliente_GetAll
** Desc: Select all products and their categories
** Auth: Leonardo Burgos
** Date: 14-03-2018
*******************************/
CREATE PROCEDURE [dbo].[distribucion_Venta_Insert]
@Cliente INT,
@Producto INT,
@Cantidad INT,
@Peso DECIMAL(18,3),
@PrecioReal DECIMAL(18,3),
@PrecioIngresado DECIMAL(18,3)
AS
INSERT INTO Venta (
	FechaVenta,
	ClienteId,
	ProductId,
	CantidadVenta,
	PesoVenta,
	PrecioRealVenta,
	PrecioIngresadoVenta
	)
VALUES(
	getdate(),
	@Cliente,
	@Producto,
	@Cantidad,
	@Peso,
	@PrecioReal,
	@PrecioIngresado
	)