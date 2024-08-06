CREATE PROCEDURE [dbo].[distribucion_Producto_InsertHijo]
@ProductName NVARCHAR(50),
@ProductImage NVARCHAR(200),
@ProductParentId INT
AS

INSERT INTO Producto (
        ProductName,
        ProductImage,
        ProductParentId,
        ProductLevel,
		PorcentajeGanancia)
VALUES (
        @ProductName,
        NULL,
        @ProductParentId,
        1,
		0.300)

--@ProductName nvarchar(100),
--@ProductImage nvarchar(200),
--@ProductParentId INT,
--@EquivalenciaDetalleTabla EquivalenciaDetalleTipo READONLY
--AS
--DECLARE @ProductoId INT
--INSERT INTO Producto (
--        ProductName,
--        ProductImage,
--        ProductParentId,
--        ProductLevel)
--VALUES (
--        @ProductName,
--        @ProductImage,
--        @ProductParentId,
--        1)
--SELECT @ProductoId = SCOPE_IDENTITY()

--INSERT INTO Equivalencia(
--    ProductId, 
--    UnidadBase, 
--    UnidadDestino,
--    CantidadObjetos)
--SELECT 
--    @ProductoId,
--    UnidadBase,
--    'Unidades',
--    CantidadObjetos
--FROM 
--    @EquivalenciaDetalleTabla