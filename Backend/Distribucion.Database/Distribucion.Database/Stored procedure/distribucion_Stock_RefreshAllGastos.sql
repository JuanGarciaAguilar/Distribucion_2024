CREATE PROCEDURE [dbo].[distribucion_Stock_RefreshAllGastos]

AS

DECLARE 
        @GastoTotalC DECIMAL(18,3),
        @FechaInicioC DATETIME,
        @FechaFinC DATETIME
DECLARE MY_CURSOR1 CURSOR
        LOCAL STATIC READ_ONLY FORWARD_ONLY
FOR
SELECT
        GastoTotal,
        FechaInicio,
        FechaFinal
FROM
        dbo.GastosSemanales
OPEN MY_CURSOR1
FETCH NEXT FROM 
        MY_CURSOR1
INTO
        @GastoTotalC,
        @FechaInicioC,
        @FechaFinC
WHILE
        @@FETCH_STATUS = 0
BEGIN
        EXEC distribucion_Stock_AsignarGasto
                @GastoTotalC,
                @FechaInicioC, 
                @FechaFinC
        FETCH NEXT FROM 
                MY_CURSOR1
        INTO
                @GastoTotalC,
                @FechaInicioC,
                @FechaFinC
END
CLOSE MY_CURSOR1
DEALLOCATE MY_CURSOR1