using Distribucion.Entidades;
using Distribucion.Interfaces;
using Distribucion.Interfaces.Repositories;
using Distribucion.Interfaces.Services;
using Distribucion.Repositorio;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class UnidadMedidaService : IUnidadMedidaServices
    {
        private readonly IUnidadMedidaRepository UnidadMedidaRepository;

        public UnidadMedidaService(IUnidadMedidaRepository UnidadMedidaRepository)
        {
            this.UnidadMedidaRepository = UnidadMedidaRepository;
        }

        public async Task<List<UnidadMedidaEntity>> GetUnidadMedidaAll()
        {
            return await UnidadMedidaRepository.GetUnidadMedidarAll();
        }

        public async Task Delete(int IdUnidadMedida)
        {
            try
            {
                await UnidadMedidaRepository.Delete(IdUnidadMedida);
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
                await UnidadMedidaRepository.Insert(entity);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task Update(UnidadMedidaEntity entity)
        {
            try
            {
                await UnidadMedidaRepository.Update(entity);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
