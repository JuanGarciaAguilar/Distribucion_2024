CREATE PROCEDURE [dbo].[distribucion_Reporte_SaldoDeposito]
AS
SELECT
	CD.ProveedorId,
	P.ProveedorName,
	SUM(CD.SaldoDeposito) AS SaldoDeposito
FROM
	CompraDetalle CD WITH (NOLOCK)
JOIN
	Proveedor P
ON
	CD.ProveedorId = P.ProveedorId
GROUP BY
	CD.ProveedorId, P.ProveedorName
