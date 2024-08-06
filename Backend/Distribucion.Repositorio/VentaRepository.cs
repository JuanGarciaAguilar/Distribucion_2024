using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Entidades.Business;
using Distribucion.Entidades.Business.ReporteVentas;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Repositorio
{
    public class VentaRepository : IVentaRepository
    {
        private readonly IDapperHelper dapperHelper;

        public VentaRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task EliminaVenta(int VentaId)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(Venta.distribucion_Venta_EliminacionVenta,new { @VentaId = VentaId });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task EliminaVentaAll(int VentaId)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(Venta.distribucion_Venta_delete_All, new { @VentaId = VentaId });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<List<ProdPadreBusinessEntity>> GetReporteVentas(string fIni, string fFin, int productid)
        {
            try
            {
                return await dapperHelper.ExecuteSP_Multiple<ProdPadreBusinessEntity>(Venta.distribucion_Reporte_Ventas, new
                {
                    @FechaInicio = fIni,
                    @FechaFin = fFin,
                    @ProductId = productid
                });
            }
            catch (Exception e)
            {
                throw e;
            }

        }
        public async Task<List<ProdPadreBusinessEntity>> GetReportePagos(DateTime fIni, DateTime fFin, int productid)
        {
            try
            {
                return await dapperHelper.ExecuteSP_Multiple<ProdPadreBusinessEntity>(Venta.distribucion_Reporte_Pagos, new
                {
                    @FechaInicio = fIni,
                    @FechaFin = fFin,
                    @ProductId = productid
                });
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public async Task<List<ReporteCierreDiarioEntity>> GetReporteCierreDiario(DateTime fIni, int cSector)
        {
            try
            {
                return await dapperHelper.ExecuteSP_Multiple<ReporteCierreDiarioEntity>(Venta.distribucion_Reporte_Cierre_Diario, new
                {
                    @FechaInicio = fIni,
                    @SectorId = cSector
                });
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public async Task<List<ReporteCierreDiarioCabeceraEntity>> GetReporteCierreDiarioCabecera()
        {
            try
            {
                return await dapperHelper.ExecuteSP_Multiple<ReporteCierreDiarioCabeceraEntity>(Venta.distribucion_Reporte_Cierre_Diario_Cabecera);
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        public async Task<string> GetVentaDeudaAnterior(int idCliente, int idProducto)
        {
            string deuda = await dapperHelper.ExecuteSP_Single<string>(SpGetVentaDeudaAnterior.distribucion_Venta_GetDeudaActualizada, new
            {
                @ProductId = idProducto,
                @ClienteId = idCliente
            });
            return deuda;
        }

        public async Task<int> GetVentaDeudaTotalByCliente(int idCliente)
        {
            return await dapperHelper.ExecuteSPoneValue(SpGetVentaDeudaTotalByCliente.distribucion_Venta_GetDeudaTotalByCliente, new
            {
                @ClientId = idCliente
            });
        }

        public async Task<List<ProdPadreBusinessEntity>> GetVentasAll()
        {
            return await dapperHelper.ExecuteSP_Multiple<ProdPadreBusinessEntity>(SpGetVentaAll.distribucion_Venta_GetAll);
        }

        public async Task<List<ProdPadreBusinessEntity>> GetReservaAll()
        {
            var data = await dapperHelper.ExecuteSP_Multiple<ProdPadreBusinessEntity>(SpGetVentaAll.Reservas_GetAll);
            
            return data;
        }
        public async Task<List<ProdPadreBusinessEntity>> GetReservaAllByFecha(string fecha)
        {
            return await dapperHelper.ExecuteSP_Multiple<ProdPadreBusinessEntity>(SpGetVentaAll.Reservas_GetAll_byFecha, new
            {
                @FechaReserva = fecha
            });
        }

        //public async Task<List<ProdPadreBusinessEntity>> GetReservaAll(string fecha)
        //{
        //    return await dapperHelper.ExecuteSP_Multiple<ProdPadreBusinessEntity>(SpGetVentaAll.Reservas_GetAll, new
        //    {
        //        @FechaReserva = fecha
        //    });
        //}
        public async Task<List<ProdPadreBusinessEntity>> ListaReservaCantidadDay(string fecha)
        {
            return await dapperHelper.ExecuteSP_Multiple<ProdPadreBusinessEntity>(SpGetVentaAll.ListaReservaCantidadDay, new { @FechaReserva = fecha });
        }

        public async Task<List<VentaBusinessEntity>> GetVentasByCliente(int ClienteId)
        {
            List<VentaBusinessEntity> ventasB = new List<VentaBusinessEntity>();           
            List<VentaEntity> ventas = await dapperHelper.ExecuteSP_Multiple<VentaEntity>(SpGetVentaAll.distribucion_Venta_GetByCliente,
               new { @ClienteId = ClienteId });
            List<ProductoEntity> prod = await dapperHelper.ExecuteSP_Multiple<ProductoEntity>(Producto.distribucion_Producto_GetAll);
            foreach(VentaEntity v in ventas)
            {
                VentaBusinessEntity venta = new VentaBusinessEntity();
                venta.ClienteId = v.ClienteId;
                venta.CantidadVenta = v.CantidadVenta;
                venta.UnidadMedida = v.UnidadMedida;
                venta.VentaId = v.VentaId;
                venta.PrecioRealVenta = v.PrecioRealVenta;
                venta.PrecioIngresadoVenta = v.PrecioIngresadoVenta;
                venta.PesoVenta = v.PesoVenta;
                venta.FechaReserva = v.FechaReserva;
                venta.FechaVenta = v.FechaVenta;
                venta.Amortizacion = v.Amortizacion;
                venta.DeudaActualizada = v.DeudaActualizada;
                venta.IsReserva = v.IsReserva;
                venta.Observacion = v.Observacion;
                venta.ProductName = v.ProductName;
                venta.UsuarioId = v.UsuarioId;
                foreach (ProductoEntity p in prod)
                {
                    ProductoEntity producto = new ProductoEntity();
                    if (v.ProductId == p.ProductId)
                    {
                        producto.ProductId = p.ProductId;
                        producto.ProductName = p.ProductName;
                        venta.ProductId = producto;
                        break;
                    }
                }
                ventasB.Add(venta);
            }
            return ventasB;
        }

        public async Task<List<VentaBusinessEntity>> GetVentasAnuladasByCliente(int ClienteId)
        {
            List<VentaBusinessEntity> ventasB = new List<VentaBusinessEntity>();
            List<VentaEntity> ventas = await dapperHelper.ExecuteSP_Multiple<VentaEntity>(SpGetVentaAll.distribucion_Venta_Anuladas_GetByCliente,
               new { @ClienteId = ClienteId });
            List<ProductoEntity> prod = await dapperHelper.ExecuteSP_Multiple<ProductoEntity>(Producto.distribucion_Producto_GetAll);
            foreach (VentaEntity v in ventas)
            {
                VentaBusinessEntity venta = new VentaBusinessEntity();
                venta.ClienteId = v.ClienteId;
                venta.CantidadVenta = v.CantidadVenta;
                venta.UnidadMedida = v.UnidadMedida;
                venta.VentaId = v.VentaId;
                venta.PrecioRealVenta = v.PrecioRealVenta;
                venta.PrecioIngresadoVenta = v.PrecioIngresadoVenta;
                venta.PesoVenta = v.PesoVenta;
                venta.FechaReserva = v.FechaReserva;
                venta.FechaVenta = v.FechaVenta;
                venta.Amortizacion = v.Amortizacion;
                venta.DeudaActualizada = v.DeudaActualizada;
                venta.IsReserva = v.IsReserva;
                venta.Observacion = v.Observacion;
                venta.ProductName = v.ProductName;
                venta.UsuarioId = v.UsuarioId;
                foreach (ProductoEntity p in prod)
                {
                    ProductoEntity producto = new ProductoEntity();
                    if (v.ProductId == p.ProductId)
                    {
                        producto.ProductId = p.ProductId;
                        producto.ProductName = p.ProductName;
                        venta.ProductId = producto;
                        break;
                    }
                }
                ventasB.Add(venta);
            }
            return ventasB;
        }

        public async Task<List<VentaBusinessEntity>> GetReservasByCliente(int ClienteId)
        {
            List<VentaBusinessEntity> ventasB = new List<VentaBusinessEntity>();
            List<VentaEntity> ventas = await dapperHelper.ExecuteSP_Multiple<VentaEntity>(SpGetVentaAll.distribucion_Reserva_GetByCliente,
               new { @ClienteId = ClienteId });
            List<ProductoEntity> prod = await dapperHelper.ExecuteSP_Multiple<ProductoEntity>(Producto.distribucion_Producto_GetAll);
            foreach (VentaEntity v in ventas)
            {
                VentaBusinessEntity venta = new VentaBusinessEntity();
                venta.ClienteId = v.ClienteId;
                venta.CantidadVenta = v.CantidadVenta;
                venta.UnidadMedida = v.UnidadMedida;
                venta.VentaId = v.VentaId;
                venta.PrecioRealVenta = v.PrecioRealVenta;
                venta.PrecioIngresadoVenta = v.PrecioIngresadoVenta;
                venta.PesoVenta = v.PesoVenta;
                venta.FechaReserva = v.FechaReserva;
                venta.FechaVenta = v.FechaVenta;
                venta.Amortizacion = v.Amortizacion;
                venta.DeudaActualizada = v.DeudaActualizada;
                venta.IsReserva = v.IsReserva;
                venta.Observacion = v.Observacion;
                venta.ProductName = v.ProductName;
                foreach (ProductoEntity p in prod)
                {
                    ProductoEntity producto = new ProductoEntity();
                    if (v.ProductId == p.ProductId)
                    {
                        producto.ProductId = p.ProductId;
                        producto.ProductName = p.ProductName;
                        venta.ProductId = producto;
                        break;
                    }
                }
                ventasB.Add(venta);
            }
            return ventasB;
        }
        public async Task<List<VentaBusinessEntity>> GetPagosByCliente(int ClienteId)
        {
            List<VentaBusinessEntity> ventasB = new List<VentaBusinessEntity>();
            List<VentaEntity> ventas = await dapperHelper.ExecuteSP_Multiple<VentaEntity>(SpGetVentaAll.distribucion_Deuda_GetByCliente,
               new { @ClienteId = ClienteId });
            List<ProductoEntity> prod = await dapperHelper.ExecuteSP_Multiple<ProductoEntity>(Producto.distribucion_Producto_GetAll);
            foreach (VentaEntity v in ventas)
            {
                VentaBusinessEntity venta = new VentaBusinessEntity();
                venta.ClienteId = v.ClienteId;
                venta.CantidadVenta = v.CantidadVenta;
                venta.UnidadMedida = v.UnidadMedida;
                venta.VentaId = v.VentaId;
                venta.PrecioRealVenta = v.PrecioRealVenta;
                venta.PrecioIngresadoVenta = v.PrecioIngresadoVenta;
                venta.PesoVenta = v.PesoVenta;
                venta.FechaVenta = v.FechaVenta;
                venta.Amortizacion = v.Amortizacion;
                venta.DeudaActualizada = v.DeudaActualizada;
                venta.IsReserva = v.IsReserva;
                venta.FechaReserva = v.FechaReserva;
                venta.Observacion = v.Observacion;

                foreach (ProductoEntity p in prod)
                {
                    ProductoEntity producto = new ProductoEntity();
                    if (v.ProductId == p.ProductId)
                    {
                        producto.ProductId = p.ProductId;
                        producto.ProductName = p.ProductName;
                        venta.ProductId = producto;
                        break;
                    }
                }
                ventasB.Add(venta);
            }
            return ventasB;
        }

        public async Task InsertVenta(VentaEntity venta)
        {
            try
            {
                DateTime FechaVenta = Convert.ToDateTime(venta.FechaVenta);
                await dapperHelper.ExecuteSPonly(SpGetVentaAll.Insert, new
                {
                   
                    @FechaVenta = FechaVenta,
                    @ClienteId = venta.ClienteId,
                    @ProductId = venta.ProductId,
                    @CantidadVenta = venta.CantidadVenta,
                    @PesoVenta = venta.PesoVenta,
                    @PrecioRealVenta = venta.PrecioRealVenta,
                    @PrecioIngresadoVenta = venta.PrecioIngresadoVenta,
                    @Amortizacion = venta.Amortizacion,
                    @DeudaActualizada = venta.DeudaActualizada,
                    @UsuarioId = venta.UsuarioId,
                    @UnidadMedida = venta.UnidadMedida,
                    @CantidadMinima = venta.CantidadMinima,
                    @Observacion = venta. Observacion,

                });
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.StackTrace);
            }
        }


        public async Task InsertVentaAnulada(VentaEntity venta)
        {
            try
            {

                await dapperHelper.ExecuteSPonly(SpGetVentaAll.InsertAnulados, new
                {

                    @FechaVenta = venta.FechaVenta,
                    @ClienteId = venta.ClienteId,
                    @ProductId = venta.ProductId,
                    @CantidadVenta = venta.CantidadVenta,
                    @PesoVenta = venta.PesoVenta,
                    @PrecioRealVenta = venta.PrecioRealVenta,
                    @PrecioIngresadoVenta = venta.PrecioIngresadoVenta,
                    @Amortizacion = venta.Amortizacion,
                    @DeudaActualizada = venta.DeudaActualizada,
                    @UsuarioId = venta.UsuarioId,
                    @UnidadMedida = venta.UnidadMedida,
                    @CantidadMinima = venta.CantidadMinima,
                    @Observacion = venta.Observacion,

                });
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.StackTrace);
            }
        }

        //public async Task InsertVenta(List<VentaEntity> venta)
        //{
        //    try
        //    {
        //        List<EquivalenciaEntity> equivalencialist = new List<EquivalenciaEntity>();
        //        equivalencialist = await dapperHelper.ExecuteSP_Multiple<EquivalenciaEntity>(SpGetCompraAll.distribucion_ObtenerEquivalencia);

        //        List<VentaEntity> ventafinal = new List<VentaEntity>();

        //        foreach (int b in venta.Select(x => x.ProductId).Distinct().ToList())
        //        {
        //            if (equivalencialist.Exists(x => x.ProductId == b))
        //            {
        //                VentaEntity detallescompra = new VentaEntity();

        //                foreach (VentaEntity d in venta.Where(x => x.ProductId == b))
        //                {
        //                    VentaEntity detalles = new VentaEntity();
        //                    foreach (EquivalenciaEntity g in equivalencialist.Where(item => item.ProductId == d.ProductId))
        //                    {
        //                        if (d.UnidadMedida == g.UnidadBase)
        //                        {
        //                            VentaEntity dat = new VentaEntity();
        //                            dat.ClienteId = d.ClienteId;
        //                            dat.ProductId = d.ProductId;
        //                            dat.CantidadVenta = d.CantidadVenta;
        //                            dat.UnidadMedida = d.UnidadMedida;
        //                            dat.PesoVenta = d.PesoVenta;
        //                            dat.PrecioRealVenta = d.PrecioRealVenta;
        //                            dat.PrecioIngresadoVenta = d.PrecioIngresadoVenta;
        //                            dat.Amortizacion = d.Amortizacion;
        //                            dat.DeudaActualizada = d.DeudaActualizada;
        //                            dat.UsuarioId = d.UsuarioId;
        //                            dat.CantidadMinima = d.CantidadVenta * g.CantidadObjetos;
        //                            dat.Observacion = d.Observacion;
        //                            detalles = dat;
        //                        }
        //                    }
        //                    detallescompra = detalles;
        //                    ventafinal.Add(detallescompra);
        //                }
        //            }
        //        }
        //        await dapperHelper.ExecuteSPonly(SpGetVentaAll.Insert, new
        //        {
        //            @ventadetalle = ventafinal.AsTableValuedParameter("ventasDetalleTipo",
        //        new[] { "ClienteId", "ProductId", "CantidadVenta",
        //                "PesoVenta", "PrecioRealVenta", "PrecioIngresadoVenta", "Amortizacion",
        //                "DeudaActualizada","UsuarioId", "UnidadMedida", "CantidadMinima","Observacion"}),
        //            @ClientId = ventafinal[0].ClienteId
        //        });
        //    }
        //    catch (Exception e)
        //    {

        //        throw e;
        //    }
        //}

        public async Task UpdateVenta(VentaEntity venta)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpGetVentaAll.Update, new
                {

                    @VentaId = venta.VentaId,
                    @ProdID = venta.ProductId,
                    @ClienteId = venta.ClienteId,
                    @CantidadVenta = venta.CantidadVenta,
                    @PrecioIngresadoVenta = venta.PrecioIngresadoVenta,
                    @Amortizacion = venta.Amortizacion,
                    @UnidaddeMedida = venta.UnidadMedida,
                    @observacion = venta.Observacion,
                    @CantidadConvertida= venta.PesoVenta,
                
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task RegistrarReserva(List<VentaEntity> venta)
        {
            try
            {

                //foreach (var d in venta)
                //{
                //    await dapperHelper.ExecuteSPonly(SpGetVentaAll.InsertReserva, new
                //    {
                //        @ClientId = d.ClienteId,
                //        @ProductId = d.ProductId,
                //        @CantidadVenta = d.CantidadVenta,
                //        @PesoVenta = d.PesoVenta,
                //        @PrecioRealVenta = d.PrecioRealVenta,
                //        @PrecioIngresadoVenta = d.PrecioIngresadoVenta,
                //        @Amortizacion = d.Amortizacion,
                //        @DeudaActualizada = d.DeudaActualizada,
                //        @UsuarioId = d.UsuarioId,
                //        @UnidadMedida = d.UnidadMedida,
                //        @CantidadMinima = d.CantidadVenta,
                //        @FechaVenta = d.FechaReserva,
                //        @Observacion = d.Observacion,
                //    });
                //}


                List<EquivalenciaEntity> equivalencialist = new List<EquivalenciaEntity>();
                DateTime FechaReserva = Convert.ToDateTime(venta[0].FechaReserva);
                equivalencialist = await dapperHelper.ExecuteSP_Multiple<EquivalenciaEntity>(SpGetCompraAll.distribucion_ObtenerEquivalencia);

                foreach (int b in venta.Select(x => x.ProductId).Distinct().ToList())
                {
                    if (equivalencialist.Exists(x => x.ProductId == b))
                    {
                        VentaEntity detallescompra = new VentaEntity();

                        foreach (VentaEntity d in venta.Where(x => x.ProductId == b))
                        {
                            VentaEntity detalles = new VentaEntity();
                            foreach (EquivalenciaEntity g in equivalencialist.Where(item => item.ProductId == d.ProductId))
                            {
                                if (d.UnidadMedida == g.UnidadBase)
                                {
                                    await dapperHelper.ExecuteSPonly(SpGetVentaAll.InsertReserva, new
                                    {
                                        @ClientId = d.ClienteId,
                                        @ProductId = d.ProductId,
                                        @CantidadVenta = d.CantidadVenta,
                                        @PesoVenta = d.PesoVenta,
                                        @PrecioRealVenta = d.PrecioRealVenta,
                                        @PrecioIngresadoVenta = d.PrecioIngresadoVenta,
                                        @Amortizacion = d.Amortizacion,
                                        @DeudaActualizada = d.DeudaActualizada,
                                        @UsuarioId = d.UsuarioId,
                                        @UnidadMedida = d.UnidadMedida,
                                        @CantidadMinima = d.CantidadVenta * g.CantidadObjetos,
                                        @FechaVenta = Convert.ToDateTime(d.FechaReserva),
                                        //@FechaVenta = d.FechaReserva,
                                        @Observacion = d.Observacion,
                                    });
                                }
                            }
                           
                        }
                    }
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }

      
        public async Task<List<VentaEntity>> GetVentasById(int ventaid)
        {
            return await dapperHelper.ExecuteSP_Multiple<VentaEntity>(SpGetVentaAll.distribucion_Venta_By_Id, new
            {
                @VentaId = ventaid
            });
        }

        public async Task<List<dynamic>> Venta_GetByClienteFecha(string fIni, string fFin, int clienteid)
        {
            try 
            {
                DateTime inicio = Convert.ToDateTime(fIni);
                DateTime fin = Convert.ToDateTime(fFin);
                return await dapperHelper.ExecuteSP_Multiple<dynamic>(Venta.distribucion_Venta_GetByClienteFecha, new
                {
                    @FechaInicio = inicio,
                    @FechaFin = fin,
                    @ClienteId = clienteid
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
