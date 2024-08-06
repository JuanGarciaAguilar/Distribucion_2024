CREATE PROCEDURE [dbo].[distribucion_Reporte_Cierre_Diario_Cabecera]
AS
DECLARE @Width DECIMAL(18,3) = 12.00 /14.00 --Styling 12.00px
DECLARE @ProductLevel INT = 1

(
SELECT
	NULL AS Id,
	NULL AS ProductParentId,
	'Cliente' AS HeaderGroup,
	'Cliente' AS Title,
	'clienteName' AS Field,
	130 * @Width AS Width
UNION

	SELECT DISTINCT
		0 AS Id,
		0,
		PP.ProductName,
		P.ProductName AS Title,
		'unidades' AS Field,
		100 * 1 AS Width
	FROM
		[dbo].[Producto] P WITH (NOLOCK)
	JOIN
		[dbo].[Producto] PP ON PP.ProductId = P.ProductParentId
	WHERE
		P.ProductLevel = 1
		AND P.ProductState = 1
		AND P.ProductName = 'Huevo'
	UNION

--SELECT
--	0,
--	0,
--	PP.ProductName,
--	P.ProductName,
--	'precioIngresadoVenta',
--	100 * @Width
--FROM
--	[dbo].[Producto] P WITH (NOLOCK)
--JOIN
--	[dbo].[Producto] PP ON PP.ProductId = P.ProductParentId
--WHERE
--	P.ProductLevel = @ProductLevel
--	AND P.ProductState = 1
--	AND P.ProductName = 'Huevo'
--UNION

	SELECT
		P.ProductId AS Id,
		P.ProductParentId,
		PP.ProductName,
		P.ProductName AS Title,
		'unidades' AS Field,
		100 * @Width AS Width
	FROM
		[dbo].[Producto] P WITH (NOLOCK)
	JOIN
		[dbo].[Producto] PP ON PP.ProductId = P.ProductParentId
	WHERE
		P.ProductLevel = @ProductLevel
		AND P.ProductState = 1
		AND P.ProductName <> 'Huevo'
	UNION

--SELECT
--	P.ProductId,
--	P.ProductParentId,
--	PP.ProductName,
--	P.ProductName,
--	'precioIngresadoVenta',
--	100 * @Width
--FROM
--	[dbo].[Producto] P WITH (NOLOCK)
--JOIN
--	[dbo].[Producto] PP ON PP.ProductId = P.ProductParentId
--WHERE
--	P.ProductLevel = @ProductLevel
--	AND P.ProductState = 1
--	AND P.ProductName <> 'Huevo'
--UNION

	SELECT
		(SELECT TOP 1 ProductId FROM [dbo].[Producto] ORDER BY ProductId DESC) + 1,
		(SELECT TOP 1 ProductParentId FROM [dbo].[Producto] ORDER BY ProductParentId DESC) + 1,
		'Saldo Anterior',
		'Saldo Anterior',
		'deudaActualizada',
		100 * @Width
	UNION

SELECT
	(SELECT TOP 1 ProductId FROM [dbo].[Producto] ORDER BY ProductId DESC) + 2,
	(SELECT TOP 1 ProductParentId FROM [dbo].[Producto] ORDER BY ProductParentId DESC) + 2,
	'Total',
	'Total',
	'total',
	100 * @Width
UNION

	SELECT
		(SELECT TOP 1 ProductId FROM [dbo].[Producto] ORDER BY ProductId DESC) + 3,
		(SELECT TOP 1 ProductParentId FROM [dbo].[Producto] ORDER BY ProductParentId DESC) + 3,
		'Amortizacion',
		'Amortizacion',
		'amortizacion',
		110 * @Width
	UNION

SELECT
	(SELECT TOP 1 ProductId FROM [dbo].[Producto] ORDER BY ProductId DESC) + 4,
	(SELECT TOP 1 ProductParentId FROM [dbo].[Producto] ORDER BY ProductParentId DESC) + 4,
	'Saldo',
	'Saldo',
	'saldo',
	100 * @Width
)
ORDER BY
	ProductParentId ASC, Title ASC