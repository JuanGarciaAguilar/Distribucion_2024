using Distribucion.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface IOperacionRepository
    {
        Task<List<OperacionEntity>> GetAllOperaciones(int cliente, DateTime fechaDesde, DateTime fechaHasta);

        Task<List<OperacionDiariaEntity>> GetOperacionesByDia(int sector, DateTime dateFind);
    }
}
