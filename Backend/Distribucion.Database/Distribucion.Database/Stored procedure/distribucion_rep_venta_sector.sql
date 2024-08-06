CREATE procedure [dbo].[distribucion_rep_venta_sector]
@ProductId int
AS

SELECT
	TOP 1 s.CantidadActualStock,
		s.StockId, 
		sc.SectorName 
FROM		Stock s WITH(NOLOCK)
INNER JOIN	Venta v WITH(NOLOCK) on s.ProductId = v.ProductId 
INNER JOIN  Cliente c WITH(NOLOCK) on v.ClienteId = c.ClienteId
INNER JOIN Sector sc WITH(NOLOCK) on c.SectorId = sc.SectorId
WHERE s.ProductId = @ProductId
ORDER BY s.StockId DESC
GO