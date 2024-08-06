using Distribucion.Common.StoredProcedures;
using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Repositorio
{
    public class SectorRepository : ISectorRepository
    {
        private readonly IDapperHelper dapperHelper;

        public SectorRepository(IDapperHelper dapperHelper)
        {
            this.dapperHelper = dapperHelper;
        }

        public async Task<List<SectorEntity>> GetSectorAll()
        {
            return await dapperHelper.ExecuteSP_Multiple<SectorEntity>(SpGetSectorAll.distribucion_Sector_GetAll);
        }
        public async Task Insert(SectorEntity entity)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpGetSectorAll.Insert, new
                {
                    @SectorName = entity.SectorName
                });
            }
            catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e.StackTrace);
            }

        }

        public async Task Update(SectorEntity entity)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpGetSectorAll.Update, new
                {
                    @SectorId = entity.SectorId,
                    @SectorName = entity.SectorName
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public async Task Delete(int IdSector)
        {
            try
            {
                await dapperHelper.ExecuteSPonly(SpGetSectorAll.Delete, new
                {
                    @SectorId = IdSector
                });
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
