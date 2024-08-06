using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class ProductoServices : IProductoServices
    {
        private readonly IProductoRepository productoRepository;

        public ProductoServices(IProductoRepository productoRepository)
        {
            this.productoRepository = productoRepository;
        }

        public async Task EliminaProducto(int ProductoId)
        {
            try
            {
                await productoRepository.EliminarProducto(ProductoId);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task EliminarCategoria(int ProductId)
        {
            try
            {
                await productoRepository.EliminarCategoria(ProductId);
            }
            catch (Exception e)
            {
                throw e;
            }
            
        }

        public async Task<List<ProductoEntity>> GetAllProductos()
        {
            try
            {
                return await productoRepository.GetAllProducto();
            }
            catch (Exception e)
            {
                throw e;
            }
           
        }



        public async Task<List<ProductoEntity>> GetProductosPadre()
        {
            try
            {
                return await productoRepository.GetProductosPadre();
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public async Task InsertCategoria(ProductoEntity p)
        {
            try
            {
                await productoRepository.InsertCategoria(p);
            }
            catch (Exception e)
            {

                throw e;
            }
           
        }

        public async Task InsertProducto(ProductoEntity p)
        {
            try
            {
                await productoRepository.InsertProducto(p);
            }
            catch (Exception e)
            {
                throw e;
            }
            
        }

        public async Task UpdateCategoria(ProductoEntity p)
        {
            try
            {
                await productoRepository.UpdateCategoria(p);
            }
            catch (Exception e)
            {
                throw e;
            }
            
        }

        public async Task<List<ReporteGanaciaBusinessEntity>> GetReporteGanacia(DateTime ini, DateTime fin)
        {
            try
            {
                return await productoRepository.GetReporteGanacia(ini, fin);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task UpdateProducto(ProductoEntity p)
        {
            try
            {
                await productoRepository.UpdateProducto(p);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<EquivalenciaEntity>> GetListaEquivalencia()
        {
            try
            {
                return await productoRepository.GetListaEquivalencia();
            }
            catch (Exception e)
            {
                throw e;
            }

        }
        public async Task EliminarEquivalencia(int IdEquivalencia)
        {
            try
            {
                await productoRepository.EliminarEquivalencia(IdEquivalencia);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
