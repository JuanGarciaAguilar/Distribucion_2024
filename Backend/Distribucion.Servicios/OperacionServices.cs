using Distribucion.Entidades;
using Distribucion.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Servicios
{
    public class OperacionServices : IOperacionServices
    {
        private readonly IOperacionRepository operacionRepository;

        public OperacionServices(IOperacionRepository operacionRepository)
        {
            this.operacionRepository = operacionRepository;
        }

        public async Task<List<OperacionEntity>> GetAllOperaciones(int cliente, DateTime fechaDesde, DateTime fechaHasta)
        {
            return await operacionRepository.GetAllOperaciones(cliente, fechaDesde, fechaHasta);
        }

        public async Task<List<OperacionDiariaEntity>> GetOperacionesByDia(int sector, DateTime dateFind)
        {
            return await operacionRepository.GetOperacionesByDia(sector, dateFind);
        }
    }
}
