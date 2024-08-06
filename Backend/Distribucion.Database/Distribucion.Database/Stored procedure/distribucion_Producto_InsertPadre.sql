CREATE PROCEDURE [dbo].[distribucion_Producto_InsertPadre]
@ProductName nvarchar(100),
@ProductImage nvarchar(200)
AS
DECLARE @ProductoId INT
INSERT INTO Producto (
        ProductName,
        ProductImage,
        ProductParentId,
        ProductLevel,
		PorcentajeGanancia)
VALUES (
        @ProductName,
        @ProductImage,
        0,
        0,
		0.300)
SELECT @ProductoId = SCOPE_IDENTITY()

INSERT INTO Equivalencia(
		ProductId,
		UnidadBase,
		UnidadDestino,
		CantidadObjetos
		)
VALUES(
		@ProductoId,
		'Categoria',
		0,
		0
)