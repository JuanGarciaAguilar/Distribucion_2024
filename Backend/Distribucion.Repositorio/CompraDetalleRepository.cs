using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Distribucion.Repositorio
{
    public class CompraDetalleRepository : ICompraDetalleRepository
    {
        private readonly IDapperHelper dapperHelper;

        public CompraDetalleRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }
       
        public async Task DeleteDetalleCompra(int id)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpGetCompraDetalleByCompraId.distribucion_CompraDetalle_Delete, new
                {
                    @DetalleCompraId = id
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<CompraDetalleEntity>> GetCompraById(int id)
        {
            return await dapperHelper.ExecuteSP_Multiple<CompraDetalleEntity>(SpGetCompraDetalleByCompraId.distribucion_CompraDetalle_GetByCompraId, new
            {
                @CompraId = id
            });
        }

        public async Task<List<CompraEquivalenciaEntity>> distribucion_Compra_GetMax(int id, string unidadmedida)
        {
            return await dapperHelper.ExecuteSP_Multiple<CompraEquivalenciaEntity>(SpGetCompraDetalleByCompraId.distribucion_Compra_GetMax, new
            {
                @productoId = id,
                @UnidadMedida = unidadmedida

            });
        }

        public Task<List<CompraDetalleEntity>> GetCompraDetalleById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task UpdateDetalleCompra(CompraDetalleEntity compraDetalle)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpGetCompraDetalleByCompraId.distribucion_CompraDetalle_Update, new
                {

                    @DetalleCompraId = compraDetalle.DetalleCompraId,
                    @Productoid = compraDetalle.ProductId,
                    @Proveedorid = compraDetalle.ProveedorId,
                    @CompraId = compraDetalle.CompraId,
                    @CantidadCompra = compraDetalle.CantidadCompra,
                    @UnidadMedida = compraDetalle.UnidadMedida,
                    @PrecioUnitario = compraDetalle.PrecioUnitario,
                    @PrecioCompra = compraDetalle.PrecioCompra,
                    @TotalDeposito = compraDetalle.TotalDeposito,
                    @SaldoDeposito = compraDetalle.SaldoDeposito,
                    @CostoFleteItemCompra = compraDetalle.CostoFleteItemCompra,
                    @DocumentoCompra = compraDetalle.DocumentoCompra,
                    @CostoFlete = compraDetalle.PesoCompra,
                    @NumeroDocumento = compraDetalle.NumeroDocumento
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
      

        public async Task InsertDetalleCompra(CompraDetalleEntity compraDetalle)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpGetCompraDetalleByCompraId.distribucion_CompraDetalle_Insert, new
                {


                    @ProductId = compraDetalle.ProductId,
                    @Proveedorid = compraDetalle.ProveedorId,
                    @CompraId = compraDetalle.CompraId,
                    @CantidadCompra = compraDetalle.CantidadCompra,
                    @UnidadMedida = compraDetalle.UnidadMedida,
                    @PrecioUnitario = compraDetalle.PrecioUnitario,
                    @PrecioCompra = compraDetalle.PrecioCompra,
                    @TotalDeposito = compraDetalle.TotalDeposito,
                    @SaldoDeposito = compraDetalle.SaldoDeposito,
                    @CostoFleteItemCompra = compraDetalle.CostoFleteItemCompra,
                    @DocumentoCompra = compraDetalle.DocumentoCompra,
                    @NumeroDocumento = compraDetalle.NumeroDocumento
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task InsertCostos(CostoEntity costos)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpGetCompraDetalleByCompraId.distribucion_Costos, new
                {


                    @ProductId = costos.ProductId,
                    @FechaCompra = costos.FechaCompra,
                    @TotalPrecioCompra = costos.TotalPrecioCompra,
                    @TotalFleteCompra = costos.TotalFleteCompra,
                    @TotalCantidadCompra = costos.TotalCantidadCompra,
                    @Stock = costos.Stock,
                    @Costo = costos.Costo,
                    @ValorTotal = costos.ValorTotal,
                    @equivalenciamayor = costos.equivalenciamayor
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
