using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Repositorio
{
    public class ProductoRepository : IProductoRepository
    {
        private readonly IDapperHelper dapperHelper;
        public ProductoRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }
       
        public async Task EliminarCategoria(int ProductId)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(Producto.distribucion_Producto_DeletePadre, new
                {
                    @ProductId = ProductId
                });
            }
            catch (Exception e) 
            {
                throw e;
            }
            
        }

        public async Task EliminarProducto(int ProductId)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(Producto.distribucion_Producto_DeleteHijo, new
                {
                    @ProductId = ProductId
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<ProductoEntity>> GetAllProducto()
        {
            try
            {
                var dataProductos = await dapperHelper.ExecuteSP_Multiple<ProductoEntity>(Producto.distribucion_Producto_GetAll);
                List<ProductoEntity> productos = (List<ProductoEntity>)dataProductos;


                return productos;
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
                var dataProductos = await dapperHelper.ExecuteSP_Multiple<ProductoEntity>(Producto.distribucion_Producto_Padre_GetAll);
                List<ProductoEntity> productos = (List<ProductoEntity>)dataProductos;
                return productos;
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
                var dataEquivalencia = await dapperHelper.ExecuteSP_Multiple<EquivalenciaEntity>(SpGetCompraAll.distribucion_ObtenerEquivalencia);
                List<EquivalenciaEntity> equivalencias = (List<EquivalenciaEntity>)dataEquivalencia;
                return equivalencias;
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
                string productovalidado = await dapperHelper.ExecuteSP_Single<string>(Producto.VALIDACIONCAT, new
                {
                    @ProductName = p.ProductName
                });

                int productExist = Convert.ToInt32(productovalidado);

                if (productExist != 0)
                {
                    var ex = new ArgumentException("Duplicado");
                    throw ex;
                }
                else
                {
                    try
                    {

                        await dapperHelper.ExecuteSPonly(Producto.distribucion_Producto_InsertPadre, new
                        {
                            @ProductName = p.ProductName,
                            @ProductImage = " "
                        });
                    }
                    catch (Exception e)
                    {

                        throw e;
                    }
                }
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
                string productovalidado = await dapperHelper.ExecuteSP_Single<string>(Producto.VALIDACION, new
                {
                    @CategoriaId = p.ProductParentId,
                    @ProductName = p.ProductName
                });

                int productExist = Convert.ToInt32(productovalidado);
                if (productExist != 0)
                {
                    var ex = new ArgumentException("Duplicado");
                    throw ex;
                }
                else
                {
                    try
                    {
                        await dapperHelper.ExecuteSPonly(Producto.distribucion_Producto_InsertHijo, new
                        {
                            @ProductParentId = p.ProductParentId,
                            @ProductName = p.ProductName,
                            @ProductImage = " "
                        });
                        }
                        catch (Exception e)
                        {

                            throw e;
                        }
                    }
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

                await dapperHelper.ExecuteSPonly(Producto.distribucion_Producto_UpdatePadre, new
                {
                    @ProductId = p.ProductId,
                    @ProductName = p.ProductName,
                    @ProductImage = " "
                });
            }
            catch (Exception e)
            {

                throw e;
            }
         
        }
        

        public async Task<List<ReporteGanaciaBusinessEntity>> GetReporteGanacia(DateTime fechaInicio, DateTime fechaFin)
        {
            try
            {
                List<ReporteGanaciaBusinessEntity> reporteData = await dapperHelper.ExecuteSP_Multiple<ReporteGanaciaBusinessEntity>(SpGetReporteGanancia.distribucion_Reporte_GananciaByProducto, new
                {
                    @FechaInicio = fechaInicio,
                    @FechaFin = fechaFin
                });
                return reporteData;
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
                await dapperHelper.ExecuteSPonly(Producto.distribucion_Producto_UpdateHijo, new
                {
                    @ProductId = p.ProductId,
                    @ProductName = p.ProductName,
                    @ProductImage = "",
                    @EquivalenciaDetalleTabla = p.EquivalenciaDetalleTabla.AsTableValuedParameter("EquivalenciaDetalleTipo", new[] { "EquivalenciaId","UnidadBase", "UnidadDestino", "CantidadObjetos", "FleteUnitario" })

                });
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
                await dapperHelper.ExecuteSPonly(Producto.distribucion_Equivalencia_Delete, new
                {
                    @EquivalenciaId = IdEquivalencia
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
