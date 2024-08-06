using Dapper;
using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Data;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using Distribucion.Entidades.Business;
using Distribucion.Common;

namespace Distribucion.Repositorio
{
    public class GastoRepository : IGastoRepository
    {
        private readonly IDapperHelper dapperHelper;

        public GastoRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task GastoSemanalInsert(GastoEntity gasto)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(InsertGastoSemanal.distribucion_GastoSemanal_Insert, new
                {
                    @FechaInicio = gasto.FechaInicio,
                    @FechaFin = gasto.FechaFinal,
                    @GastoTotal = gasto.GastoTotal,
                    @GastoSemanalTabla = gasto.GastoSemanalTabla.AsTableValuedParameter("GastoSemanalDetalleTipo1", new[] { "Insumo", "Gasto","Comentario", "userId" })
                });
            }
            catch (Exception ex) {
                System.Diagnostics.Debug.WriteLine(ex.StackTrace);
            }
        }

        public async Task<List<GastoEntity>> GetGastoHastaHoy()
        {
            List<GastoBusinessEntity> packet = new List<GastoBusinessEntity>();
            packet = await dapperHelper.ExecuteSP_Multiple<GastoBusinessEntity>(Gasto.distribucion_GastoSemanal_GetUntilToday);
            List<GastoEntity> gastos = new List<GastoEntity>();

            foreach (int b in packet.Select(x => x.GastoSemanalId).Distinct().ToList())
            {
                if (packet.Exists(x => x.GastoSemanalId == b))
                {
                    GastoEntity gasto = new GastoEntity();
                    List<GastoDetalleEntity> detalles = new List<GastoDetalleEntity>();

                    foreach (GastoBusinessEntity g in packet.Where(item => item.GastoSemanalId == b))
                    {
                        if (gasto.FechaInicio == DateTime.Parse("0001-01-01"))
                        {
                            gasto.GastoSemanalId = g.GastoSemanalId;
                            gasto.FechaInicio = g.FechaInicio;
                            gasto.FechaFinal = g.FechaFinal;
                            gasto.GastoTotal = g.GastoTotal;
                        }
                        GastoDetalleEntity detalle = new GastoDetalleEntity
                        {
                            GastoSemanalDetalleId = g.GastoSemanalDetalleId,
                            GastoSemanalId = g.GastoSemanalId,
                            Insumo = g.Insumo,
                            Gasto = g.Gasto,
                            Comentario = g.Comentario
                        };
                        detalles.Add(detalle);
                    }
                    gasto.GastoSemanalTabla = detalles;
                    gastos.Add(gasto);
                }
            }
            return gastos;
        }

        public async Task<List<GastoEntity>> GetGastoHastaHoyFechas(string Finicio)
        {
            List<GastoBusinessEntity> packet = new List<GastoBusinessEntity>();
            packet = await dapperHelper.ExecuteSP_Multiple<GastoBusinessEntity>(Gasto.distribucion_GastoSemanal_GetUntilToday_Fechas, new
            {
                @fechainicio = Finicio
             }) ;
            List<GastoEntity> gastos = new List<GastoEntity>();

            foreach (int b in packet.Select(x => x.GastoSemanalId).Distinct().ToList())
            {
                if (packet.Exists(x => x.GastoSemanalId == b))
                {
                    GastoEntity gasto = new GastoEntity();
                    List<GastoDetalleEntity> detalles = new List<GastoDetalleEntity>();

                    foreach (GastoBusinessEntity g in packet.Where(item => item.GastoSemanalId == b))
                    {
                        if (gasto.FechaInicio == DateTime.Parse("0001-01-01"))
                        {
                            gasto.GastoSemanalId = g.GastoSemanalId;
                            gasto.FechaInicio = g.FechaInicio;
                            gasto.FechaFinal = g.FechaFinal;
                            gasto.GastoTotal = g.GastoTotal;
                        }
                        GastoDetalleEntity detalle = new GastoDetalleEntity
                        {
                            GastoSemanalDetalleId = g.GastoSemanalDetalleId,
                            GastoSemanalId = g.GastoSemanalId,
                            Insumo = g.Insumo,
                            Gasto = g.Gasto,
                            Comentario = g.Comentario
                        };
                        detalles.Add(detalle);
                    }
                    gasto.GastoSemanalTabla = detalles;
                    gastos.Add(gasto);
                }
            }
            return gastos;
        }

        public async Task<List<GastoEntity>> GetGastoAll()
        {
            List<GastoBusinessEntity> packet = new List<GastoBusinessEntity>();
            packet = await dapperHelper.ExecuteSP_Multiple<GastoBusinessEntity>(SpGetGastoSemanalAll.distribucion_GastoSemanal_GetAll);
            List<GastoEntity> gastos = new List<GastoEntity>();
            
            foreach(int b in packet.Select(x => x.GastoSemanalId).Distinct().ToList())
            {
                if (packet.Exists(x => x.GastoSemanalId == b))
                {
                    GastoEntity gasto = new GastoEntity();
                    List<GastoDetalleEntity> detalles = new List<GastoDetalleEntity>();

                    foreach (GastoBusinessEntity g in packet.Where(item => item.GastoSemanalId== b))
                    {
                        if (gasto.FechaInicio == DateTime.Parse("0001-01-01"))
                        {
                            gasto.GastoSemanalId = g.GastoSemanalId;
                            gasto.FechaInicio = g.FechaInicio;
                            gasto.FechaFinal = g.FechaFinal;
                            gasto.GastoTotal = g.GastoTotal;
                        }
                        GastoDetalleEntity detalle = new GastoDetalleEntity
                        {
                            GastoSemanalDetalleId = g.GastoSemanalDetalleId,
                            GastoSemanalId = g.GastoSemanalId,
                            Insumo = g.Insumo,
                            Gasto = g.Gasto,
                            Comentario = g.Comentario,
                            userId = g.userId
                        };
                        detalles.Add(detalle);
                    }
                    gasto.GastoSemanalTabla = detalles;
                    gastos.Add(gasto);
                }
            }
            return gastos;
        }

        public async Task<List<GastoDetalleEntity>> GetGastoById(int id)
        {
            var packet = await dapperHelper.ExecuteSP_Multiple<GastoDetalleEntity>(SpGetGastoDetalleByGastoId.distribucion_GastoSemanalDetalle_GetByGastoId, new
            {
                @GastoSemanalId = id
            });
            return packet;
        }

        public async Task UpdateGastoSemanal(GastoEntity gasto)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpUpdateGastoSemanal.distribucion_GastoSemanal_Update, new
                {
                    @GastoSemanalId = gasto.GastoSemanalId,
                    @FechaInicio = gasto.FechaInicio,
                    @FechaFinal = gasto.FechaFinal,
                    @GastoTotal = gasto.GastoTotal,
                    @GastoSemanalTabla = gasto.GastoSemanalTabla.AsTableValuedParameter("GastoSemanalDetalleTipo1", new[] { "Insumo", "Gasto","Comentario","userId" })
                });
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.StackTrace);
            }
        }

        public async Task DeleteGastoSemanal(int id)
        {
            await dapperHelper.ExecuteSPonly(SpDeleteGasto.distribucion_GastoSemanal_Delete, new
            {
                @GastoSemanalId = id
            });   
        }

        public async Task<List<ReporteGastoBusinessEntity>> GetGastoDetalleSemanal(string ini, string fin)
        {
            return await dapperHelper.ExecuteSP_Multiple<ReporteGastoBusinessEntity>(SpGetReporteGastosSemanales.distribucion_Reporte_GastosSemanales, new
            {
                @Ini = ini,
                @Fin = fin
            });
        }

        public async Task<string> GetGastoTotalPeriodo(DateTime ini, DateTime fin)
        {
            return await dapperHelper.ExecuteSP_Single<string>(Gasto.distribucion_Gasto_TotalPeriodo, new
            {
                @FechaInicio = ini,
                @FechaFin = fin
            });
        }
    }
}
