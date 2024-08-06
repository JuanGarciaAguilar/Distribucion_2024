using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface ICompraRepository
    {
        Task CompraInsert(CompraEntity compra);

        Task<List<CompraEntity>> GetCompraAll();

        Task<List<CompraEntity>> GetCompraById(int id);

        Task UpdateCompra(CompraEntity compra);
        Task UpdateFechas(CompraEntity compra);

        Task ConfirmarCompra(CompraEntity compra);

        Task DeleteCompra(int id);
        Task DeleteProductoCompra(int cdid);

        Task<SaldoActualBusinessEntity> GetCompraSaldoAnterior(int idProducto, int idProveedor);

        Task<int> GetCompraSaldoAnterior2(int idProducto, int idProveedor);

        Task<List<CompraRepBusinessEntity>> GetCompraReporte(DateTime fInicio, DateTime fFin, string nProveedor);

    }
}
