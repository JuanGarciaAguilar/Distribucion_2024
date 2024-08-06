using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using Distribucion.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Repositorio
{
    public class unidadmedidaRepository : IUnidadMedidaRepository
    {
        private readonly IDapperHelper dapperHelper;

        public unidadmedidaRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }
        public async Task<List<UnidadMedidaEntity>> GetUnidadMedidarAll()
        {
            return await dapperHelper.ExecuteSP_Multiple<UnidadMedidaEntity>(SpUnidadMedidaALL.GetAll);
        }

        public async Task Delete(int Idunidadmedida)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpUnidadMedidaALL.Delete, new
                {
                    @unidadMedidaID = Idunidadmedida
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }

       
        public async Task Insert(UnidadMedidaEntity entity)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpUnidadMedidaALL.Insert, new
                {
                    @UnidadMedidad = entity.unidadMedidad,
                    @UnidadDestino = entity.unidadDestino

                });
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.StackTrace);
            }
        }

        public async Task Update(UnidadMedidaEntity entity)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpUnidadMedidaALL.Update, new
                {
                    @UnidadMedidaID = entity.unidadMedidaID,
                    @UnidadMedida = entity.unidadMedidad,
                    @UnidadDestino = entity.unidadDestino
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
