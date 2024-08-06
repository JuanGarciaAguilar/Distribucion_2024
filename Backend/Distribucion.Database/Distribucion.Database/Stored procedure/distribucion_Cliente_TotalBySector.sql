CREATE PROCEDURE [dbo].[distribucion_Cliente_TotalBySector]
AS
SELECT 
       -- s.SectorName as Sector,
        SUM(DeudaActualizada) as DeudaTotal
FROM
        Cliente c WITH(NOLOCK)
INNER JOIN
        Sector s
ON
        c.SectorId = s.SectorId
GROUP BY
        s.SectorId
