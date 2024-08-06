CREATE PROCEDURE [dbo].[distribucion_Equivalencia_Delete]
@EquivalenciaId INT
AS
BEGIN
	UPDATE Equivalencia SET Estado = 0 WHERE EquivalenciaId = @EquivalenciaId
END
