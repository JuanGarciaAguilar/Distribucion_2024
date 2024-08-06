using Distribucion.Common;
using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Repositorio
{
    public class CompraRepository : ICompraRepository
    {
        private readonly IDapperHelper dapperHelper;

        public CompraRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task CompraInsert(CompraEntity compra)
        {
            try
            {
                List<EquivalenciaEntity> equivalencialist = new List<EquivalenciaEntity>();
                equivalencialist = await dapperHelper.ExecuteSP_Multiple<EquivalenciaEntity>(SpGetCompraAll.distribucion_ObtenerEquivalencia);

                CompraEntity comprafinal = new CompraEntity();
                List<CompraDetalleEntity> detallesfinal = new List<CompraDetalleEntity>();

                foreach (int b in equivalencialist.Select(x => x.ProductId).Distinct().ToList())
                {
                    if (equivalencialist.Exists(x => x.ProductId == b))
                    {
                        CompraDetalleEntity detallescompra = new CompraDetalleEntity();

                    foreach (CompraDetalleEntity d in compra.CompraDetalleTabla.Where(x => x.ProductId == b))
                    {
                        CompraDetalleEntity detalles = new CompraDetalleEntity();

                        foreach (EquivalenciaEntity g in equivalencialist.Where(item => item.ProductId == d.ProductId))
                        {
                            if (d.UnidadMedida == g.UnidadBase) {

                                if (comprafinal.FechaCompra == DateTime.Parse("0001-01-01"))
                                {
                                    comprafinal.CompraId = compra.CompraId;
                                    comprafinal.UsuarioId = compra.UsuarioId;
                                    comprafinal.FechaCompra = compra.FechaCompra;
                                    comprafinal.FechaEntrega = compra.FechaEntrega;
                                    comprafinal.OrigenCompra = compra.OrigenCompra;
                                    comprafinal.TotalCompra = compra.TotalCompra;
                                    comprafinal.CostoFlete = compra.CostoFlete;
                                    comprafinal.Observacion = compra.Observacion;
                                }

                                CompraDetalleEntity dat = new CompraDetalleEntity();
                                dat.DetalleCompraId = d.DetalleCompraId;
                                dat.CompraId = d.CompraId;
                                dat.ProductId = d.ProductId;
                                dat.CantidadCompra = d.CantidadCompra;
                                dat.ProveedorId = d.ProveedorId;
                                dat.PesoCompra = d.PesoCompra;
                                dat.PrecioUnitario = d.PrecioUnitario;
                                dat.PrecioCompra = d.PrecioCompra;
                                dat.TotalDeposito = d.TotalDeposito;
                                dat.SaldoDeposito = d.SaldoDeposito;
                                dat.CostoFleteItemCompra = d.CostoFleteItemCompra;
                                //CantidadBuenEstado = g.CantidadBuenEstado,
                                //CantidadMalEstado = g.CantidadMalEstado,
                                dat.DocumentoCompra = d.DocumentoCompra;
                                dat.CantidadMinima = g.CantidadObjetos * d.CantidadCompra;
                                dat.UnidadMedida = d.UnidadMedida;
                                dat.CompraEstado = d.CompraEstado;
                               dat.NumeroDocumento = d.NumeroDocumento;

                                detalles = dat;
                            }

                        }
                            detallescompra = detalles;
                            detallesfinal.Add(detallescompra);
                        }
                    
                    }
                }
                comprafinal.CompraDetalleTabla = detallesfinal;

                //comprafinal.CompraDetalleTabla.ForEach(x =>
                //{
                //    x.CostoFleteItemCompra = (x.PrecioCompra / compra.TotalCompra) * compra.CostoFlete;
                //});


                await dapperHelper.ExecuteSPonly(SpInsertCompra.distribucion_Compra_Insert, new
                {
                    @FechaCompra = comprafinal.FechaCompra,
                    @FechaEntrega = comprafinal.FechaEntrega,
                    @OrigenCompra = comprafinal.OrigenCompra,
                    @TotalCompra = comprafinal.TotalCompra,
                    @CostoFlete = comprafinal.CostoFlete,
                    @UsuarioID = comprafinal.UsuarioId,
                    @Observacion = comprafinal.Observacion,
                    @CompraDetalleTabla = comprafinal.CompraDetalleTabla.AsTableValuedParameter("CompraDetalleTipo1", new[] 
                    { "DetalleCompraId","ProveedorId", "ProductId","CantidadCompra","PesoCompra", "PrecioUnitario", 
                        "PrecioCompra","TotalDeposito","SaldoDeposito","CostoFleteItemCompra","DocumentoCompra","CantidadMinima", 
                        "UnidadMedida", "CompraEstado", "NumeroDocumento" })
                });
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.StackTrace);
            }
        }

        public async Task DeleteProductoCompra(int cdid)
        {
            await dapperHelper.ExecuteSPonly(SpDeleteCompra.distribucion_Compra_Producto_Delete, new
            {
                @CompraDetalleId= cdid
            });
        }

        public async Task DeleteCompra(int id)
        {
            await dapperHelper.ExecuteSPonly(SpDeleteCompra.distribucion_Compra_Delete, new
            {
                @CompraId = id
            });
        }

        public async Task<List<CompraEntity>> GetCompraAll()
        {
            List<CompraBusinessEntity> packet = new List<CompraBusinessEntity>();
            packet = await dapperHelper.ExecuteSP_Multiple<CompraBusinessEntity>(SpGetCompraAll.distribucion_Compra_GetAll);
            List<CompraEntity> compras = new List<CompraEntity>();

            foreach (int b in packet.Select(x => x.CompraId).Distinct().ToList())
            {
                if (packet.Exists(x => x.CompraId == b))
                {
                    CompraEntity compra = new CompraEntity();
                    List<CompraDetalleEntity> detalles = new List<CompraDetalleEntity>();

                    foreach (CompraBusinessEntity g in packet.Where(item => item.CompraId == b))
                    {
                        if (compra.FechaCompra == DateTime.Parse("0001-01-01"))
                        {
                            compra.CompraId = g.CompraId;
                            compra.FechaCompra = g.FechaCompra;
                            //if (g.FechaEntrega.ToLongTimeString() != "12:00:00 a. m." && g.CompraEstado == 1)
                            //{
                            //    compra.FechaEntrega = g.FechaEntrega.AddHours(-5);
                            //}
                            //else
                            //{
                            //    compra.FechaEntrega = g.FechaEntrega;
                            //}
                            compra.FechaEntrega = g.FechaEntrega;
                            compra.OrigenCompra = g.OrigenCompra;
                            compra.TotalCompra = g.TotalCompra;
                            compra.CostoFlete = g.CostoFlete;
                            compra.ProveedorName = g.ProveedorName;
                            compra.Observacion = g.Observacion;
                        }
                        CompraDetalleEntity detalle = new CompraDetalleEntity
                        {
                            DetalleCompraId = g.DetalleCompraId,
                            CompraId = g.CompraId,
                            ProductId = g.ProductId,
                            ProveedorId = g.ProveedorId,
                            CantidadCompra = g.CantidadCompra,
                            PesoCompra = g.PesoCompra,
                            PrecioUnitario = g.PrecioUnitario,
                            PrecioCompra = g.PrecioCompra,
                            TotalDeposito = g.TotalDeposito,
                            SaldoDeposito = g.SaldoDeposito,
                            CostoFleteItemCompra = g.CostoFleteItemCompra,
                            //CantidadBuenEstado = g.CantidadBuenEstado,
                            //CantidadMalEstado = g.CantidadMalEstado,
                            DocumentoCompra = g.DocumentoCompra,
                            UnidadMedida = g.UnidadMedida,
                            CantidadMinima = g.CantidadMinima,
                            CompraEstado = g.CompraEstado,
                            NumeroDocumento = g.NumeroDocumento
                        };
                        detalles.Add(detalle);
                    }
                    compra.CompraDetalleTabla = detalles;
                    compras.Add(compra);
                }
            }
            return compras;
        }

     
        //---------------------------------------------------------------------------------------------------------------------
        public async Task<List<CompraRepBusinessEntity>> GetCompraReporte(DateTime fInicio, DateTime fFin, string nProveedor)
        {
            try
            {
                List<CompraRepBusinessEntity> reporteCompras = new List<CompraRepBusinessEntity>();
                reporteCompras = await dapperHelper.ExecuteSP_Multiple<CompraRepBusinessEntity>(SpGetCompraReporte.distribucion_Reporte_GetCompraDetalle, new
                {
                    @FechaInicio = fInicio,
                    @FechaFin = fFin,
                    @ProveedorNombre = nProveedor
                });
                foreach (CompraRepBusinessEntity compra in reporteCompras)
                {
                    if (compra.FechaEntrega.ToLongTimeString() != "12:00:00 a. m.")
                    {
                        compra.FechaEntrega = compra.FechaEntrega.AddHours(-5);
                        }
                    }
                    return reporteCompras;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        //---------------------------------------------------------------------------------------------------------------------

        public async Task<SaldoActualBusinessEntity> GetCompraSaldoAnterior(int idProducto, int idProveedor)
        {
            try
            {
                return await dapperHelper.ExecuteSP_Single<SaldoActualBusinessEntity>(SpGetCompraSaldoAnterior.distribucion_CompraDetalle_GetSaldoAnterior, new
                {
                    @ProductId = idProducto,
                    @ProveedorId = idProveedor
                });
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> GetCompraSaldoAnterior2(int idProducto, int idProveedor)
        {
            return await dapperHelper.ExecuteSPoneValue(SpGetCompraSaldoAnterior.distribucion_CompraDetalle_GetSaldoAnterior, new
            {
                @ProductId = idProducto,
                @ProveedorId = idProveedor
            });
        }

        public async Task UpdateCompra(CompraEntity compra)
        {
            try
            {
                List<EquivalenciaEntity> equivalencialist = new List<EquivalenciaEntity>();
                equivalencialist = await dapperHelper.ExecuteSP_Multiple<EquivalenciaEntity>(SpGetCompraAll.distribucion_ObtenerEquivalencia);

                CompraEntity comprafinal = new CompraEntity();
                List<CompraDetalleEntity> detallesfinal = new List<CompraDetalleEntity>();

                foreach (int b in equivalencialist.Select(x => x.ProductId).Distinct().ToList())
                {
                    if (equivalencialist.Exists(x => x.ProductId == b))
                    {
                        CompraDetalleEntity detallescompra = new CompraDetalleEntity();

                        foreach (CompraDetalleEntity d in compra.CompraDetalleTabla.Where(x => x.ProductId == b))
                        {
                            CompraDetalleEntity detalles = new CompraDetalleEntity();

                            foreach (EquivalenciaEntity g in equivalencialist.Where(item => item.ProductId == d.ProductId))
                            {
                                if (d.UnidadMedida == g.UnidadBase)
                                {

                                    if (comprafinal.FechaCompra == DateTime.Parse("0001-01-01"))
                                    {
                                        comprafinal.CompraId = compra.CompraId;
                                        comprafinal.UsuarioId = compra.UsuarioId;
                                        comprafinal.FechaCompra = compra.FechaCompra;
                                        comprafinal.FechaEntrega = compra.FechaEntrega;
                                        comprafinal.OrigenCompra = compra.OrigenCompra;
                                        comprafinal.TotalCompra = compra.TotalCompra;
                                        comprafinal.CostoFlete = compra.CostoFlete;
                                        comprafinal.Observacion = compra.Observacion;
                                    }

                                    CompraDetalleEntity dat = new CompraDetalleEntity();
                                    dat.DetalleCompraId = d.DetalleCompraId;
                                    dat.CompraId = d.CompraId;
                                    dat.ProductId = d.ProductId;
                                    dat.CantidadCompra = d.CantidadCompra;
                                    dat.ProveedorId = d.ProveedorId;
                                    dat.PesoCompra = d.PesoCompra;
                                    dat.PrecioUnitario = d.PrecioUnitario;
                                    dat.PrecioCompra = d.PrecioCompra;
                                    dat.TotalDeposito = d.TotalDeposito;
                                    dat.SaldoDeposito = d.SaldoDeposito;
                                    dat.CostoFleteItemCompra = d.CostoFleteItemCompra;
                                    //CantidadBuenEstado = g.CantidadBuenEstado,
                                    //CantidadMalEstado = g.CantidadMalEstado,
                                    dat.DocumentoCompra = d.DocumentoCompra;
                                    dat.CantidadMinima = g.CantidadObjetos * d.CantidadCompra;
                                    dat.UnidadMedida = d.UnidadMedida;
                                    dat.CompraEstado = d.CompraEstado;
                                    detalles = dat;
                                }

                            }
                            detallescompra = detalles;
                            detallesfinal.Add(detallescompra);
                        }

                    }
                }
                comprafinal.CompraDetalleTabla = detallesfinal;

                //comprafinal.CompraDetalleTabla.ForEach(x =>
                //{
                //    x.CostoFleteItemCompra = (x.PrecioCompra / compra.TotalCompra) * compra.CostoFlete;
                //});


                await dapperHelper.ExecuteSPonly(SpUpdateCompra.distribucion_Compra_Update, new
                {
                    @CompraId = comprafinal.CompraId,
                    @FechaCompra = comprafinal.FechaCompra,
                    @FechaEntrega = comprafinal.FechaEntrega,
                    @OrigenCompra = comprafinal.OrigenCompra,
                    @TotalCompra = comprafinal.TotalCompra,
                    @CostoFlete = comprafinal.CostoFlete,
                    @Observacion = comprafinal.Observacion,
                    @CompraDetalleTabla = comprafinal.CompraDetalleTabla.AsTableValuedParameter("CompraDetalleTipo", new[] { "DetalleCompraId", "ProveedorId", "ProductId", "CantidadCompra", "PesoCompra", "PrecioUnitario", "PrecioCompra", "TotalDeposito", "SaldoDeposito", "CostoFleteItemCompra", "DocumentoCompra", "CantidadMinima", "UnidadMedida", "CompraEstado" })
                });
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.StackTrace);
            }

        }

        public async Task ConfirmarCompra(CompraEntity compra)
        {
            try
            {
                List<EquivalenciaEntity> equivalencialist = new List<EquivalenciaEntity>();
                equivalencialist = await dapperHelper.ExecuteSP_Multiple<EquivalenciaEntity>(SpGetCompraAll.distribucion_ObtenerEquivalencia);

                CompraEntity comprafinal = new CompraEntity();
                List<CompraDetalleEntity> detallesfinal = new List<CompraDetalleEntity>();

                foreach (int b in equivalencialist.Select(x => x.ProductId).Distinct().ToList())
                {
                    if (equivalencialist.Exists(x => x.ProductId == b))
                    {
                        CompraDetalleEntity detallescompra = new CompraDetalleEntity();

                        foreach (CompraDetalleEntity d in compra.CompraDetalleTabla.Where(x => x.ProductId == b))
                        {
                            CompraDetalleEntity detalles = new CompraDetalleEntity();

                            foreach (EquivalenciaEntity g in equivalencialist.Where(item => item.ProductId == d.ProductId))
                            {
                                if (d.UnidadMedida == g.UnidadBase)
                                {

                                    if (comprafinal.FechaCompra == DateTime.Parse("0001-01-01"))
                                    {
                                        comprafinal.CompraId = compra.CompraId;
                                        comprafinal.UsuarioId = compra.UsuarioId;
                                        comprafinal.FechaCompra = compra.FechaCompra;
                                        comprafinal.FechaEntrega = compra.FechaEntrega;
                                        comprafinal.OrigenCompra = compra.OrigenCompra;
                                        comprafinal.TotalCompra = compra.TotalCompra;
                                        comprafinal.CostoFlete = compra.CostoFlete;
                                    }

                                    CompraDetalleEntity dat = new CompraDetalleEntity();
                                    dat.DetalleCompraId = d.DetalleCompraId;
                                    dat.CompraId = d.CompraId;
                                    dat.ProductId = d.ProductId;
                                    dat.CantidadCompra = d.CantidadCompra;
                                    dat.ProveedorId = d.ProveedorId;
                                    dat.PesoCompra = d.PesoCompra;
                                    dat.PrecioUnitario = d.PrecioUnitario;
                                    dat.PrecioCompra = d.PrecioCompra;
                                    dat.TotalDeposito = d.TotalDeposito;
                                    dat.SaldoDeposito = d.SaldoDeposito;
                                    dat.CostoFleteItemCompra = d.CostoFleteItemCompra;
                                    //CantidadBuenEstado = g.CantidadBuenEstado,
                                    //CantidadMalEstado = g.CantidadMalEstado,
                                    dat.DocumentoCompra = d.DocumentoCompra;
                                    dat.CantidadMinima = g.CantidadObjetos * d.CantidadCompra;
                                    dat.UnidadMedida = d.UnidadMedida;
                                    dat.CompraEstado = d.CompraEstado;
                                    detalles = dat;
                                }

                            }
                            detallescompra = detalles;
                            detallesfinal.Add(detallescompra);
                        }

                    }
                }
                comprafinal.CompraDetalleTabla = detallesfinal;

                await dapperHelper.ExecuteSPonly(SpUpdateCompra.distribucion_Compra_Confirmar, new
                {
                    @CompraId = comprafinal.CompraId,
                    @FechaCompra = comprafinal.FechaCompra,
                    @TotalCompra = comprafinal.TotalCompra,
                    @CompraDetalleTabla = comprafinal.CompraDetalleTabla.AsTableValuedParameter("CompraDetalleTipo",
                    new[] { "DetalleCompraId", "ProveedorId", "ProductId", "CantidadCompra", "PesoCompra", "PrecioUnitario", 
                        "PrecioCompra", "TotalDeposito", "SaldoDeposito", "CostoFleteItemCompra", "DocumentoCompra", 
                        "CantidadMinima", "UnidadMedida", "CompraEstado" })
                });
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.StackTrace);
            }

        }
        public async Task<List<CompraDetalleEntity>> GetCompraDetalleById(int id)
        {
            return await dapperHelper.ExecuteSP_Multiple<CompraDetalleEntity>(SpGetCompraDetalleByCompraId.distribucion_CompraDetalle_GetByCompraId, new
            {
                @CompraId = id
            });
        }

      

        public async Task<List<CompraEntity>> GetCompraById(int id)
        {
            return await dapperHelper.ExecuteSP_Multiple<CompraEntity>(SpGetCompraAll.distribucion_GetByCompraId, new
            {
                @CompraId = id
            });
        }

        public async Task UpdateFechas(CompraEntity compra)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpUpdateCompra.distribucion_Compra_Update_Fechas, new
                {
                    @fechacompra = compra.FechaCompra,
                    @fechaentrega = compra.FechaEntrega,
                    @origencompra = compra.OrigenCompra,
                    @CompraId = compra.CompraId
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        //Task<List<ParentRepBusinessEntity>> ICompraRepository.GetCompraReporte()
        //{
        //    throw new NotImplementedException();
        //}
    }
}
