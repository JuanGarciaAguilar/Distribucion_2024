using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class CompraServices : ICompraServices
    {
        private readonly ICompraRepository compraRepository;

        public CompraServices(ICompraRepository compraRepository)
        {
            this.compraRepository = compraRepository;
        }

        public async Task CompraInsert(CompraEntity compra)
        {
            await compraRepository.CompraInsert(compra);
        }

        public async Task DeleteCompra(int id)
        {
            await compraRepository.DeleteCompra(id);
        }

        public async Task DeleteProductoCompra(int cdid)
        {
            await compraRepository.DeleteProductoCompra(cdid);
        }

        public async Task<List<CompraEntity>> GetCompraAll()
        {
            return await compraRepository.GetCompraAll();
        }

        //public async Task<List<CompraDetalleEntity>> GetCompraById(int id)
        ////  {
        //     return await compraRepository.GetCompraById(id);
        // }

        public async Task<List<CompraEntity>> GetCompraById(int id)
        {
            return await compraRepository.GetCompraById(id);
        }

        public async Task<List<CompraRepBusinessEntity>> GetCompraReporte(DateTime fInicio, DateTime fFin, string nProveedor)
        {
            try
            {
                return await compraRepository.GetCompraReporte(fInicio, fFin, nProveedor);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<SaldoActualBusinessEntity> GetCompraSaldoAnterior(int idProducto, int idProveedor)
        {
            return await compraRepository.GetCompraSaldoAnterior(idProducto, idProveedor);
        }

        public async Task<int> GetCompraSaldoAnterior2(int idProducto, int idProveedor)
        {
            return await compraRepository.GetCompraSaldoAnterior2(idProducto,idProveedor);
        }

        public async Task UpdateCompra(CompraEntity compra)
        {
            await compraRepository.UpdateCompra(compra);
        }

        public async Task UpdateFechas(CompraEntity compra)
        {
            await compraRepository.UpdateFechas(compra);
        }
        public async Task ConfirmarCompra(CompraEntity compra)
        {
            await compraRepository.ConfirmarCompra(compra);
        }

      
    }
}
