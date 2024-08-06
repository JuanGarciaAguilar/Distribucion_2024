using Distribucion.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface ICompraDetalleRepository
    {
        Task<List<CompraDetalleEntity>> GetCompraDetalleById(int id);
        Task<List<CompraDetalleEntity>> GetCompraById(int id);
        Task<List<CompraEquivalenciaEntity>> distribucion_Compra_GetMax(int id, string unidadmedida);
        Task UpdateDetalleCompra(CompraDetalleEntity compraDetalle);
        Task InsertDetalleCompra(CompraDetalleEntity compraDetalle);
        Task DeleteDetalleCompra(int id);

        Task InsertCostos(CostoEntity costos);
    }
}
