CREATE PROCEDURE [dbo].[distribucion_Reporte_GetCompraDetalle]
@FechaInicio DATETIME,
@FechaFin DATETIME,
@OrigenCompra NVARCHAR(100),
@ProveedorNombre NVARCHAR(100)
AS


	IF (@ProveedorNombre IS NULL OR @ProveedorNombre = 'undefined')
	BEGIN
			SELECT
				d.ProductName,		
				c.ProveedorName,
				b.ProductName,
				b.ProductParentId,
				a.CantidadCompra,
				a.UnidadMedida,
				a.PesoCompra,
				a.PrecioUnitario,
				a.PrecioCompra,
				a.TotalDeposito,
				a.SaldoDeposito,
				a.CostoFleteItemCompra,
				a.CantidadBuenEstado,
				a.CantidadMalEstado,
				comp.UsuarioId,
				comp.FechaCompra,
				comp.FechaEntrega,
				comp.OrigenCompra,
				a.CompraEstado,
				a.DocumentoCompra,
				CASE WHEN comp.OrigenCompra = 1 THEN 'Trujillo' ELSE 'Talara' END OrigenCompraNombre
		FROM	dbo.CompraDetalle a WITH(NOLOCK)
		JOIN	Compra comp ON comp.CompraId = a.CompraId
		JOIN	dbo.Producto b ON a.ProductId = b.ProductId
		JOIN	dbo.Proveedor c	ON a.ProveedorId = c.ProveedorId
		JOIN (
				SELECT
						ProductId,
						ProductName
				FROM	dbo.Producto WITH(NOLOCK)
				WHERE	ProductLevel = 0 ) d
		ON		b.ProductParentId = d.ProductId
		WHERE	comp.FechaCompra >= @FechaInicio AND comp.FechaCompra <= @FechaFin AND a.CompraEstado = 1
	END
	ELSE
	BEGIN
		SELECT
				d.ProductName,		
				c.ProveedorName,
				b.ProductName,
				b.ProductParentId,
				a.CantidadCompra,
				a.UnidadMedida,
				a.PesoCompra,
				a.PrecioUnitario,
				a.PrecioCompra,
				a.TotalDeposito,
				a.SaldoDeposito,
				a.CostoFleteItemCompra,
				a.CantidadBuenEstado,
				a.CantidadMalEstado,
				comp.UsuarioId,
				comp.FechaCompra,
				comp.FechaEntrega,
				comp.OrigenCompra,
				a.CompraEstado,
				a.DocumentoCompra,
				CASE WHEN comp.OrigenCompra = 1 THEN 'Trujillo' ELSE 'Talara' END OrigenCompraNombre
		FROM	dbo.CompraDetalle a WITH(NOLOCK)
		JOIN	Compra comp	ON comp.CompraId = a.CompraId
		JOIN	dbo.Producto b ON a.ProductId = b.ProductId
		JOIN	dbo.Proveedor c	ON	a.ProveedorId = c.ProveedorId
		JOIN (
				SELECT
						ProductId,
						ProductName
				FROM	dbo.Producto WITH(NOLOCK)
				WHERE	ProductLevel = 0 ) d
		ON		b.ProductParentId = d.ProductId
		WHERE	comp.FechaCompra >= @FechaInicio AND comp.FechaCompra <= @FechaFin AND ProveedorName = @ProveedorNombre AND a.CompraEstado = 1
	END
GO