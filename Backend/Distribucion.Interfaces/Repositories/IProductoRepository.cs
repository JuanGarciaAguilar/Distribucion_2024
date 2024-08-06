using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface IProductoRepository
    {
        Task<List<ProductoEntity>> GetAllProducto();

        Task<List<ProductoEntity>> GetProductosPadre();

        Task InsertProducto(ProductoEntity p);

        Task InsertCategoria(ProductoEntity p);

        Task UpdateCategoria(ProductoEntity p);

        Task EliminarCategoria(int ProductId);

        Task EliminarProducto(int ProductId);

        Task EliminarEquivalencia(int IdEquivalencia);

        Task<List<ReporteGanaciaBusinessEntity>> GetReporteGanacia(DateTime ini, DateTime fin);
        Task UpdateProducto(ProductoEntity p);

        Task<List<EquivalenciaEntity>> GetListaEquivalencia();
    }
}
