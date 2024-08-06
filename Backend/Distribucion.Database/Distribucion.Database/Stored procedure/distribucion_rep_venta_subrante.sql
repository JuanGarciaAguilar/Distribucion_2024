CREATE procedure [dbo].[distribucion_rep_venta_subrante]
@ProductId int
as
select top 1 * from Stock  where ProductId= @ProductId
order by StockId desc
GO

