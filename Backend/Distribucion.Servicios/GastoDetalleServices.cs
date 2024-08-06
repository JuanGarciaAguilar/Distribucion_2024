using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class GastoDetalleServices : IGastoDetalleServices
    {
        private readonly IGastoDetalleRepository gastoDetalleRepository;

        public GastoDetalleServices(IGastoDetalleRepository gastoDetalleRepository)
        {
            this.gastoDetalleRepository = gastoDetalleRepository;
        }

        public async Task<List<GastoDetalleEntity>> GetGastoDetalleById(int id)
        {
            return await gastoDetalleRepository.GetGastoDetalleById(id);
        }
    }
}
