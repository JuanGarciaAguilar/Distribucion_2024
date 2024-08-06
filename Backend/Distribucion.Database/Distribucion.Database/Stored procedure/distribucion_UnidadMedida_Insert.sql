
CREATE PROCEDURE [dbo].[distribucion_UnidadMedida_Insert]
@UnidadMedidad varchar(20)

AS

INSERT INTO UnidadMedida

           (UnidadMedidad)
     VALUES
           (@UnidadMedidad)
