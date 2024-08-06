--[mobile_GetReporteDetallado] 3, '07/02/2018'  
CREATE PROCEDURE [dbo].[mobile_GetReporteDetallado]  
  
@Sector int,  
@FechaReporte DATETIME  
  
  
AS  
IF @Sector = 3  
BEGIN  
SELECT IdOperacion,   
  NombreCliente,   
  Unidades,   
  PesoTotal,   
  PrecioPorKilo,   
  ROUND(PrecioTotal, 1) PrecioTotal,   
  ROUND(MontoPagado, 1) MontoPagado,  
  DeudaAnterior = 0,  
  SaldoAcumulado = 0,  
  O.IdCliente,  
  DATEADD(hh,-5,[FechaOperacion]) AS FechaOperacion,  
  DeudaAcumulada = 0  
INTO #Temporal  
FROM dbo.tbloperacion o  
JOIN dbo.tblcliente c on o.idcliente = c.idcliente  
WHERE CAST(DATEADD(hh,-5,[FechaOperacion]) AS DATE) = CAST(@FechaReporte AS DATE)  
ORDER BY [FechaOperacion] DESC 

UPDATE T
SET
	DeudaAnterior = (ISNULL((select SUM([PrecioTotal]) from tblOperacion where idcliente = T.IdCliente AND FechaOperacion < @FechaReporte), 0) 
				  - ISNULL((select SUM([MontoPagado]) from tblOperacion where idcliente = T.IdCliente AND FechaOperacion < @FechaReporte),0) )

FROM  #Temporal T
  
SELECT IdOperacion,   
  NombreCliente,   
  Unidades,   
  PesoTotal,   
  PrecioPorKilo,   
  PrecioTotal,   
  MontoPagado,  
  DeudaAnterior,
  SaldoAcumulado = PrecioTotal + DeudaAnterior,  
  FechaOperacion,  
  DeudaAcumulada = (ISNULL((select SUM([PrecioTotal]) from tblOperacion where idcliente = T.IdCliente), 0) - ISNULL((select SUM([MontoPagado]) from tblOperacion where idcliente = T.IdCliente),0) ) 
FROM #Temporal T  
ORDER BY FechaOperacion ASC  
  
DROP TABLE #Temporal  
  
END  
  
ELSE  
BEGIN  
SELECT IdOperacion,   
  NombreCliente,   
  Unidades,   
  PesoTotal,   
  PrecioPorKilo,   
  ROUND(PrecioTotal, 1) PrecioTotal,   
  ROUND(MontoPagado, 1) MontoPagado,  
  DeudaAnterior = 0,  
  SaldoAcumulado = 0,  
  O.IdCliente,  
  DATEADD(hh,-5,[FechaOperacion]) AS FechaOperacion,  
  DeudaAcumulada = 0  
INTO #Temporal2  
FROM dbo.tbloperacion o  
JOIN dbo.tblcliente c on o.idcliente = c.idcliente  
WHERE c.Sector = @Sector  
  AND CAST(DATEADD(hh,-5,[FechaOperacion]) AS DATE) = CAST(@FechaReporte AS DATE)  
ORDER BY [FechaOperacion] DESC  
  
UPDATE T
SET
	DeudaAnterior = (ISNULL((select SUM([PrecioTotal]) from tblOperacion where idcliente = T.IdCliente AND FechaOperacion < @FechaReporte), 0) 
				  - ISNULL((select SUM([MontoPagado]) from tblOperacion where idcliente = T.IdCliente AND FechaOperacion < @FechaReporte),0) )

FROM  #Temporal2 T

SELECT IdOperacion,   
  NombreCliente,   
  Unidades,   
  PesoTotal,   
  PrecioPorKilo,   
  PrecioTotal,   
  MontoPagado,  
  DeudaAnterior,
  SaldoAcumulado = MontoPagado + DeudaAnterior,  
  FechaOperacion,  
  DeudaAcumulada = (ISNULL((select SUM([PrecioTotal]) from tblOperacion where idcliente = T.IdCliente), 0) - ISNULL((select SUM([MontoPagado]) from tblOperacion where idcliente = T.IdCliente),0) ) 
FROM #Temporal2 T  
ORDER BY FechaOperacion ASC  
  
DROP TABLE #Temporal2  
  
END