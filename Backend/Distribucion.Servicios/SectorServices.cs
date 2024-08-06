using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class SectorServices : ISectorServices
    {
        private readonly ISectorRepository sectorRepository;

        public SectorServices(ISectorRepository sectorRepository)
        {
            this.sectorRepository = sectorRepository;
        }

        public async Task Delete(int IdSector)
        {
            try
            {
                await sectorRepository.Delete(IdSector);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<List<SectorEntity>> GetSectorAll()
        {
            return await sectorRepository.GetSectorAll();
        }

        public async Task Insert(SectorEntity entity)
        {
            try
            {
                await sectorRepository.Insert(entity);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task Update(SectorEntity entity)
        {
            try
            {
                await sectorRepository.Update(entity);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
