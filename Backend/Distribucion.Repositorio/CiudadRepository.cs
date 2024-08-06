using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using Distribucion.Interfaces.Repositories;
using Distribucion.Repositorio.DapperHelper;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Repositorio
{
    public class CiudadRepository : ICiudadRepository
    {
        private readonly IDapperHelper dapperHelper;

        public CiudadRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }
        public async Task<List<CiudadEntity>> GetNewCiudades()
        {
            return await dapperHelper.ExecuteSP_Multiple<CiudadEntity>(Proveedor.GetNewCiudades);
        }
        public async Task InsertCiudad(CiudadEntity entity)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(Proveedor.InsertCiudades, new
                {
                    @CiudadName = entity.CiudadName

                });
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.StackTrace);
            }
        }
        public async Task UpdateCiudad(CiudadEntity entity)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(Proveedor.UpdateCiudades, new
                {
                    @CiudadName = entity.CiudadName,
                    @CiudadId = entity.CiudadId

                });
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.StackTrace);
            }
        }



    }
}
