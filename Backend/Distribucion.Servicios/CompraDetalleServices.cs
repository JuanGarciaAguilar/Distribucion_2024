using Distribucion.Entidades;
using Distribucion.Interfaces;
using Distribucion.Repositorio;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class CompraDetalleServices : ICompraDetalleServices
    {
        private readonly ICompraDetalleRepository CompraDetalleRepository;

        public CompraDetalleServices(ICompraDetalleRepository CompraDetalleRepository)
        {
            this.CompraDetalleRepository = CompraDetalleRepository;
        }

      

        public async Task DeleteDetalleCompra(int id)
        {
            try
            {
                await CompraDetalleRepository.DeleteDetalleCompra(id);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<List<CompraDetalleEntity>> GetCompraById(int id)
        {
            return await CompraDetalleRepository.GetCompraById(id);
        }

        public async Task<List<CompraEquivalenciaEntity>> distribucion_Compra_GetMax(int id, string unidadmedida)
        {
            return await CompraDetalleRepository.distribucion_Compra_GetMax(id, unidadmedida);
        }


        public async Task InsertDetalleCompra(CompraDetalleEntity compraDetalle)
        {
            try
            {
                await CompraDetalleRepository.InsertDetalleCompra(compraDetalle);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task UpdateDetalleCompra(CompraDetalleEntity compraDetalle)
        {
            try
            {
                await CompraDetalleRepository.UpdateDetalleCompra(compraDetalle);
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
                await CompraDetalleRepository.InsertCostos(costos);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //public async Task<List<CompraDetalleEntity>> GetCompraDetalleById(int id)
        //{
        //    return await compraDetalleServices.GetCompraDetalleById(id);
        //}
    }
}
