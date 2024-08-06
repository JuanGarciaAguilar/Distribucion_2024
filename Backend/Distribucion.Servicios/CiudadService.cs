using Distribucion.Entidades;
using Distribucion.Interfaces.Repositories;
using Distribucion.Interfaces.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class CiudadService : ICiudadServices
    {
        private readonly ICiudadRepository CiudadRepository;

        public CiudadService(ICiudadRepository CiudadRepository)
        {
            this.CiudadRepository = CiudadRepository;
        }

        public async Task<List<CiudadEntity>> GetNewCiudades()
        {
            return await CiudadRepository.GetNewCiudades();
        }
        public async Task InsertCiudad(CiudadEntity entity)
        {
            try
            {
                await CiudadRepository.InsertCiudad(entity);
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        public async Task UpdateCiudad(CiudadEntity entity)
        {
            try
            {
                await CiudadRepository.UpdateCiudad(entity);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

    }
}
