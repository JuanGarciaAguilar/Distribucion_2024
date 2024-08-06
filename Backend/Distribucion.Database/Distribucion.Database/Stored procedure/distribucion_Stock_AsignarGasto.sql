CREATE PROCEDURE [dbo].[distribucion_Stock_AsignarGasto]
@GastoTotal DECIMAL (18,3),
@FechaInicio DATETIME,
@FechaFin DATETIME
--SP para Asignar un gasto en las ventas correspondientes a un periodo de tiempo
AS

DECLARE @VentaTotalIngresada DECIMAL (18,3)
--Primero se captura la venta ingresada total de dicho periodo
SELECT
        @VentaTotalIngresada = SUM(PrecioIngresadoVenta)
FROM
        dbo.Stock WITH(NOLOCK)
WHERE
        VentaId IS NOT NULL AND
        FechaStock >= @FechaInicio AND
        FechaStock <= @FechaFin

--Ahora a todas las ventas (una por una) de dicho periodo se les asigna 
--el gasto proporcional a su venta
DECLARE @GastoOperacionAux DECIMAL (18,3)
Declare @Id INT
DECLARE MY_CURSOR CURSOR
        GLOBAL FORWARD_ONLY
FOR
SELECT
        GastoDiarioOperacion
FROM
    dbo.Stock WITH(NOLOCK)
WHERE
        VentaId IS NOT NULL AND
        FechaStock >= @FechaInicio AND
        FechaStock <= @FechaFin
ORDER BY
        FechaStock DESC
FOR UPDATE
OPEN MY_CURSOR
FETCH NEXT FROM 
    MY_CURSOR 
INTO
    @GastoOperacionAux
WHILE
    @@FETCH_STATUS = 0
BEGIN
        UPDATE dbo.Stock
        SET GastoDiarioOperacion = (PrecioIngresadoVenta/@VentaTotalIngresada) * @GastoTotal
        WHERE CURRENT OF MY_CURSOR
        FETCH NEXT FROM 
            MY_CURSOR 
        INTO
            @GastoOperacionAux
END
CLOSE MY_CURSOR
DEALLOCATE MY_CURSOR
