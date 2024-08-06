using Distribucion.Entidades;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Distribucion.Interfaces
{
    public interface IGastoDetalleRepository
    {
        Task<List<GastoDetalleEntity>> GetGastoDetalleById(int id);
    }
}
