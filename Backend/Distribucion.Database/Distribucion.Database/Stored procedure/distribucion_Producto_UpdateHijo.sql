CREATE PROCEDURE [dbo].[distribucion_Producto_UpdateHijo]
@ProductId INT,
@ProductName NVARCHAR(50),
@ProductImage NVARCHAR(200),
@EquivalenciaDetalleTabla EquivalenciaDetalleTipo READONLY
AS
UPDATE Producto
SET
    ProductName = @ProductName,
    ProductImage = @ProductImage
WHERE ProductId = @ProductId


MERGE INTO dbo.Equivalencia E  
USING @EquivalenciaDetalleTabla EDT  
    ON E.EquivalenciaId = EDT.EquivalenciaId AND E.ProductId =  @ProductId  
    WHEN MATCHED   
     THEN  
       UPDATE SET   
   UnidadBase = EDT.UnidadBase,   
   UnidadDestino = EDT.UnidadDestino,
   CantidadObjetos = EDT.CantidadObjetos,  
   FleteUnitario = EDT.FleteUnitario  
    WHEN NOT MATCHED THEN  
 INSERT   
 VALUES (  
   @ProductId,  
   EDT.UnidadBase,  
   EDT.UnidadDestino,  
   EDT.CantidadObjetos,  
   1,  
   EDT.FleteUnitario,
   GETDATE()
 );