CREATE PROCEDURE [dbo].[Distribucion_ObtenerEquivalencia]
AS
SELECT 
		EquivalenciaId,
		ProductId,
		UnidadBase,
		UnidadDestino,
		CantidadObjetos,
		Estado,
		FleteUnitario
FROM dbo.Equivalencia WITH(NOLOCK)
WHERE CantidadObjetos > 0
ORDER BY ProductId,EquivalenciaId ASC